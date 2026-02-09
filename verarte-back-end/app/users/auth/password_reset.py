from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta, timezone
import secrets

from app.users.admin.model_admin import Admin
from app.users.buyer.model_buyer import Buyer
from app.users.auth.hash_passwords import get_password_hash
from app.users.auth.email_resend import (
    send_verification_code,
)  # Vamos reutilizar o envio de código

router = APIRouter()


# --- SCHEMAS ---
class ForgotRequest(BaseModel):
    email: EmailStr


class ResetRequest(BaseModel):
    email: EmailStr
    code: str
    new_password: str


# --- LÓGICA ---


def generate_otp():
    return "".join([str(secrets.randbelow(10)) for _ in range(6)])


@router.post("/forgot-password")
async def forgot_password(data: ForgotRequest, background_tasks: BackgroundTasks):
    user = None

    # Procura no Admin ou Buyer
    admin = await Admin.get_or_none(email=data.email)
    if admin:
        user = admin

    if not user:
        buyer = await Buyer.get_or_none(email=data.email)
        if buyer:
            user = buyer

    # SEGURANÇA: Se não achar o email, fingimos que enviamos para não revelar quem é cliente.
    # Mas no log a gente avisa.
    if not user:
        print(f"[SECURITY] Tentativa de reset para email inexistente: {data.email}")
        return {"message": "Se o e-mail existir, você receberá um código."}

    # Gera código e validade (Reaproveitamos os campos que criamos para o 2FA!)
    otp = generate_otp()
    expiration = datetime.now(timezone.utc) + timedelta(minutes=15)

    user.verification_code = otp
    user.code_expires_at = expiration
    await user.save()

    # Envia o e-mail
    background_tasks.add_task(send_verification_code, user.email, otp)

    return {"message": "Código de recuperação enviado."}


@router.post("/reset-password")
async def reset_password(data: ResetRequest):
    user = None

    # Busca usuário
    admin = await Admin.get_or_none(email=data.email)
    if admin:
        user = admin
    else:
        buyer = await Buyer.get_or_none(email=data.email)
        if buyer:
            user = buyer

    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    # Validações
    if user.verification_code != data.code:
        raise HTTPException(status_code=400, detail="Código inválido")

    if not user.code_expires_at or user.code_expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="Código expirado")

    # A MÁGICA: Troca a senha
    user.password_hash = get_password_hash(data.new_password)

    # Limpa o código para não ser usado de novo
    user.verification_code = None
    user.code_expires_at = None

    await user.save()

    return {"message": "Senha alterada com sucesso! Faça login com a nova senha."}
