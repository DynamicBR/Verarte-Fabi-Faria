🎨 Verarte - Plataforma de E-commerce Artesanal

Sistema completo de e-commerce para ateliês de artesanato, focado em simplicidade, segurança e conexão entre artesão e cliente. O projeto utiliza uma arquitetura moderna separando Backend (API REST) e Frontend (SPA).

🛠️ Tecnologias Utilizadas
## Backend
  Linguagem: Python 3.12+
    
  Framework: FastAPI (Alta performance e validação automática)

  Banco de Dados: PostgreSQL

  ORM: TortoiseORM (Async) + Aerich (Migrações)

  Docker + Gunicorn

## Frontend

  Framework: React (Vite)

  Linguagem: TypeScript

  Estilização: TailwindCSS

  Ícones: Lucide React

    
## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

  Python 3.12+

  Node.js 18+

  PostgreSQL

  Docker (Opcional, para rodar em container)

  Gerenciador de pacotes uv(Recomendado) ou pip.

# 🚀 Guia de Instalação (Passo a Passo)
## 1. Configuração do Banco de Dados

Certifique-se de que o serviço do PostgreSQL está rodando e crie um banco vazio:
SQL

CREATE DATABASE verarte;

## 2. Configurando o Backend

  Acesse a pasta do backend:

    cd verarte-back-end

Crie um arquivo .env na raiz do backend baseado no exemplo abaixo:
Ini, TOML

# .env
`DATABASE_URL=postgres://seu_usuario:sua_senha@localhost:5432/verarte
SECRET_KEY=sua_chave_super_secreta_aqui
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
RESEND_API_KEY=re_123456789... (Sua chave do Resend para envio de emails)`

Instale as dependências (usando uv ou pip):

`uv sync`
# OU
`pip install -r requirements.txt`

Configure as Migrações (Aerich) e crie as tabelas:

`aerich init -t app.database_config.TORTOISE_ORM`
`aerich init-db`

Rode o servidor de desenvolvimento:

`uv run python start_server.py`

A API estará disponível em: `http://localhost:8000` Documentação Swagger: `http://localhost:8000/docs`

## 3. Configurando o Frontend

Abra um novo terminal e acesse a pasta do frontend:

`cd verarte-front-end`

Instale as dependências:

`npm install`

Rode o projeto:

    `npm run dev`

    `O site estará disponível em: http://localhost:5173`

🐳 Rodando com Docker (Produção)

Para rodar o backend como se estivesse em um servidor real (usando Gunicorn):

  Certifique-se de que o arquivo .env está configurado corretamente (se usar Linux, localhost no .env precisa ser ajustado ou usar modo host).

  Use o script utilitário (se disponível) ou Docker Compose:

`python run_docker.py`

# 🔑 Acesso e Primeiros Passos
## Criando o Primeiro Administrador

Como o sistema é protegido, você precisará criar o primeiro usuário via API ou Banco de Dados, ou utilizar a rota de cadastro pública (se habilitada para testes).

  Acesse `http://localhost:5173/register` e crie uma conta.

  Por padrão, contas criadas por lá são Clientes (Buyers).

  Para transformar em Admin, acesse o banco de dados e mude a tabela (apenas em desenvolvimento) ou use um script de seed.

Fluxo de Login (2FA)

O sistema utiliza autenticação em duas etapas:

  Login: Digite Email e Senha.

  Email: Você receberá um código de 6 dígitos via Resend (verifique o console do backend se não tiver chave de API configurada).

  Validação: Insira o código para receber o Token de acesso.

Recuperação de Senha

Acesse /forgot-password, insira o email e siga o fluxo de redefinição com código OTP.
