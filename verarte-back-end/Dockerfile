# 1. Usar uma imagem base oficial do Python leve
FROM python:3.12-slim

# 2. Instalar o 'uv'
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

# 3. Definir o diretório de trabalho
WORKDIR /app

# 4. Copiar os arquivos de dependência
# IMPORTANTE: Você precisa ter o arquivo 'uv.lock' na pasta do seu projeto.
# Se não tiver, rode 'uv lock' no seu terminal antes de construir a imagem.
COPY pyproject.toml uv.lock ./

# 5. Instalar as dependências (CORRIGIDO)
# Primeiro geramos um requirements.txt a partir do lockfile, depois instalamos no sistema.
RUN uv export --format requirements-txt > requirements.txt && \
    uv pip install --system --no-cache -r requirements.txt

# 6. Copiar o restante do código
COPY . .

# 7. Expor a porta
EXPOSE 8000

# 8. Comando Final
CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", "-w", "4", "--bind", "0.0.0.0:8000", "app.main:app"]
