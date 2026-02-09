from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Defina as variáveis e seus tipos.
    # O Pydantic vai ler do .env automaticamente ou dar erro se faltar.

    # App
    APP_NAME: str = "Verarte API"
    DEBUG: bool = False

    # Database
    DATABASE_URL: str  # Obrigatório (sem valor default)

    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # Resend (Email)
    RESEND_API_KEY: str | None = None  # Opcional (pode ser None)

    # Configurações do .env
    model_config = SettingsConfigDict(env_file=".env", env_ignore_empty=True)


# Instância única para ser importada no projeto todo
settings = Settings()
