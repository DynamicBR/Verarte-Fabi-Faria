from fastapi import APIRouter, HTTPException, BackgroundTasks
from datetime import datetime, timedelta, timezone
import secrets  # Para gerar números aleatórios seguros

from app.users.auth.schemas_auth import (
    LoginRequest,
    LoginResponse,
    VerifyCodeRequest,
    TokenResponse,
)
from app.users.admin.model_admin import Admin
from app.users.buyer.model_buyer import Buyer
from app.users.auth.hash_passwords import verify_password
from app.users.auth.jwt_handler import create_access_token
from app.users.auth.email_resend import send_verification_code

router = APIRouter()


# Função auxiliar para gerar código numérico de 6 dígitos
def generate_otp():
    return "".join([str(secrets.randbelow(10)) for _ in range(6)])


# ROTA 1: LOGIN (Senha -> Código)
@router.post("/login", response_model=LoginResponse)
async def login_step_1(credentials: LoginRequest, background_tasks: BackgroundTasks):
    user = None
    role = None

    # 1. Procura no Admin
    admin = await Admin.get_or_none(email=credentials.email)
    if admin and verify_password(credentials.password, admin.password_hash):
        user = admin
        role = "admin"

    # 2. Se não achou, procura no Buyer
    if not user:
        buyer = await Buyer.get_or_none(email=credentials.email)
        if buyer and verify_password(credentials.password, buyer.password_hash):
            user = buyer
            role = "buyer"

    if not user:
        raise HTTPException(status_code=401, detail="Email ou senha incorretos")

    # 3. Gera o código e a validade (10 minutos a partir de agora)
    otp = generate_otp()
    # Usa timezone.utc para garantir que o servidor não confunda fusos horários
    expiration = datetime.now(timezone.utc) + timedelta(minutes=10)

    # 4. Salva no banco (Atualiza o usuário)
    user.verification_code = otp
    user.code_expires_at = expiration
    await user.save()

    # 5. Envia o email em segundo plano
    background_tasks.add_task(send_verification_code, user.email, otp)

    return {
        "message": "Código de verificação enviado para seu e-mail",
        "email": user.email,
    }


# ROTA 2: VERIFICAÇÃO (Código -> Token)
@router.post("/verify", response_model=TokenResponse)
async def verify_step_2(data: VerifyCodeRequest):
    user = None
    role = None

    # Busca o usuário pelo email
    admin = await Admin.get_or_none(email=data.email)
    if admin:
        user = admin
        role = "admin"
    else:
        buyer = await Buyer.get_or_none(email=data.email)
        if buyer:
            user = buyer
            role = "buyer"

    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    # 1. Verifica se o código bate
    if user.verification_code != data.code:
        raise HTTPException(status_code=400, detail="Código inválido")

    # 2. Verifica se o código expirou
    # Importante: O banco retorna datetime com fuso, precisamos comparar bananas com bananas
    if user.code_expires_at < datetime.now(timezone.utc):
        raise HTTPException(
            status_code=400, detail="Código expirado. Faça login novamente."
        )

    # 3. Limpa o código do banco (para não ser usado de novo)
    user.verification_code = None
    user.code_expires_at = None
    await user.save()

    # 4. Gera o Token Final (Acesso Liberado!)
    access_token = create_access_token(data={"sub": str(user.id), "role": role})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": role,
        "user_name": user.name,
    }
