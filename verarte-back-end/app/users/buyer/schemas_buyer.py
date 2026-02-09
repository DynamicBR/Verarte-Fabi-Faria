from pydantic import BaseModel, EmailStr
from typing import Optional


class BuyerCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    phone: str
    address: Optional[str] = None


class BuyerResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    phone: str
    address: Optional[str] = None

    class Config:
        from_attributes = True
