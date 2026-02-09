from fastapi import APIRouter, HTTPException
from app.users.admin.model_admin import Admin
from app.users.admin.schemas_admin import AdminCreate, AdminResponse
from app.users.auth.hash_passwords import get_password_hash

router = APIRouter()


@router.post("/", response_model=AdminResponse)
async def create_admin(admin: AdminCreate):
    admin_exist = await Admin.filter(email=admin.email).exists()
    if admin_exist:
        raise HTTPException(status_code=400, detail="Email já está cadastrado")

    hashed_password = get_password_hash(admin.password)

    new_admin = await Admin.create(
        name=admin.name, email=admin.email, password_hashed=hashed_password
    )
    return new_admin
