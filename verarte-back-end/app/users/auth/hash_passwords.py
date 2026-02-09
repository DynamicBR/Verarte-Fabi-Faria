from pwdlib import PasswordHash

password_hash = PasswordHash.recommended()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifica se a senha digitada bate com o hash do banco"""
    return password_hash.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """Transforma a senha '123456' em um hash seguro"""
    return password_hash.hash(password)
