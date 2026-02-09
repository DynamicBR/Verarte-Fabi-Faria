import resend
import os
from dotenv import load_dotenv

load_dotenv()

resend.api_key = os.getenv("RESEND_API_KEY")


async def send_welcome_email(to_email: str, name: str):
    if not resend.api_key or "re_" not in resend.api_key:
        print(f"[MOCK] Enviando email fake para {to_email} (Sem chave Resend)")
        return

    try:
        # O Resend envia emails assíncronos
        r = resend.Emails.send(
            {
                "from": "Verarte <onboarding@resend.dev>",  # Use o domínio do Resend para testes
                "to": to_email,
                "subject": "Bem-vindo à Verarte!",
                "html": f"""
            <h1>Olá, {name}!</h1>
            <p>Seu cadastro foi realizado com sucesso.</p>
            <p>Estamos felizes em ter você conosco.</p>
            """,
            }
        )
        return r
    except Exception as e:
        print(f"Erro ao enviar email: {e}")


async def send_verification_code(to_email: str, code: str):
    if not resend.api_key or "re_" not in resend.api_key:
        print(f"[MOCK] Código de verificação para {to_email}: {code}")
        return

    try:
        r = resend.Emails.send(
            {
                "from": "Verarte Security <auth@resend.dev>",  # Use o domínio de teste ou o seu
                "to": to_email,
                "subject": "Seu código de acesso Verarte",
                "html": f"""
            <div style="font-family: sans-serif; text-align: center;">
                <h2>Olá!</h2>
                <p>Seu código de verificação é:</p>
                <h1 style="letter-spacing: 5px; color: #333;">{code}</h1>
                <p>Este código expira em 10 minutos.</p>
                <p>Se não foi você que solicitou, ignore este e-mail.</p>
            </div>
            """,
            }
        )
        return r
    except Exception as e:
        print(f"Erro ao enviar código: {e}")
