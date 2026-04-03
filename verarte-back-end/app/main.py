import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from tortoise.contrib.fastapi import register_tortoise
from app.database_config import TORTOISE_ORM

from app.products import routes_product

from app import utils
from app.users.admin import routes_admin
from app.users.buyer import routes_buyer
from app.users.auth import password_reset, login_routes

app = FastAPI(title="Verarte API")

# --- Configurações ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedir("static", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")


app.include_router(routes_product.router, prefix="/products", tags=["Products"])
app.include_router(utils.router, tags=["Utils"])

app.include_router(routes_admin.router, prefix="/admins", tags=["Admins"])
app.include_router(routes_buyer.router, prefix="/buyers", tags=["Buyers"])

app.include_router(login_routes.router, prefix="/auth", tags=["Auth"])
app.include_router(password_reset.router, prefix="/auth", tags=["Auth"])

register_tortoise(
    app,
    config=TORTOISE_ORM,
    generate_schemas=False,
    add_exception_handlers=True,
)
