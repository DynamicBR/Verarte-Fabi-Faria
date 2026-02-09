from fastapi import APIRouter, UploadFile, File
from PIL import Image
from uuid import uuid4
import os

router = APIRouter()


@router.post("/upload")
async def upload_image(file: UploadFile = File(...)) -> dict:
    # Garante que a pasta existe
    os.makedirs("static/images", exist_ok=True)

    filename = f"{uuid4()}.jpg"
    file_location = f"static/images/{filename}"

    try:
        img = Image.open(file.file)
        img = img.convert("RGB")
        img.save(file_location, quality=80, optimize=True)
    except Exception as e:
        return {"error": str(e)}

    return {"url": f"http://127.0.0.1:8000/{file_location}"}
