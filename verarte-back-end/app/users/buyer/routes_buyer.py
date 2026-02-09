from fastapi import APIRouter, HTTPException
from app.users.buyer.model_buyer import Buyer
from app.users.buyer.schemas_buyer import BuyerCreate, BuyerResponse
from app.users.auth.hash_passwords import get_password_hash

router = APIRouter()


@router.post("/register", response_model=BuyerResponse)
async def register_buyer(buyer: BuyerCreate):
    buyer_exists = await Buyer.filter(email=buyer.email).exists()
    if buyer_exists:
        raise HTTPException(status_code=400, detail="Email já está cadastrado")

    hashed_password = get_password_hash(buyer.password)

    new_buyer = await Buyer.create(
        name=buyer.name,
        email=buyer.email,
        password_hash=hashed_password,
        phone=buyer.phone,
        address=buyer.address,
    )
    return new_buyer
