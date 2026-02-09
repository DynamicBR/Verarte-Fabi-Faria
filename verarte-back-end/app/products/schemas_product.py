from pydantic import BaseModel
from decimal import Decimal
from typing import Optional


class ProductCreate(BaseModel):
    title: str
    description: Optional[str] = None
    price: Decimal
    image_url: Optional[str] = None


class ProductResponse(ProductCreate):
    id: int

    class Config:
        from_attributes = True
