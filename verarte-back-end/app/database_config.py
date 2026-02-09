import os
from dotenv import load_dotenv
from app.config import settings

load_dotenv()

TORTOISE_ORM = {
    "connections": {"default": settings.DATABASE_URL},
    "apps": {
        "models": {
            "models": [
                "app.products.model_product",
                "app.users.admin.model_admin",
                "app.users.buyer.model_buyer",
                "aerich.models",
            ],
            "default_connection": "default",
        },
    },
}
