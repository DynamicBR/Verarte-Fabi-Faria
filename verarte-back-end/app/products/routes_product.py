from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.products.model_product import Product
from app.products.schemas_product import ProductCreate, ProductResponse
from app.users.auth.dependencies_auth import get_currrent_admin

# Criamos o roteador específico para produtos
router = APIRouter()


@router.post(
    "/", response_model=ProductResponse, dependencies=[Depends(get_currrent_admin)]
)
async def create_product(product: ProductCreate):
    # .model_dump() é a versão nova do .dict() no Pydantic v2
    new_product = await Product.create(**product.model_dump())
    return new_product


@router.get("/", response_model=List[ProductResponse])
async def list_products():
    return await Product.all()


@router.delete("/{product_id}")
async def delete_product(product_id: int):
    product = await Product.get_or_none(id=product_id)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")

    await product.delete()
    return {"message": "Deleted successfully"}
