from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from app.users.auth.jwt_handler import decode_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


async def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    Verifica se o token é válido e recupera os dados do usuário (ID e Role).
    """
    payload = decode_access_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido ou expirado",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return payload


async def get_currrent_admin(payload: dict = Depends(get_current_user)):
    """
    Funciona como um porteiro VIP: Só deixa passar se o role for 'admin'.
    """
    role = payload.get("role")
    if role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso restrito a administradores",
        )
    return payload
