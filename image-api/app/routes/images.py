from celery import chain
from flask import Blueprint, jsonify, request
from PIL import Image

from ..config.supabase import vx
from ..tasks import compress_image, generate_embedding, model, upload_panel_img
from ..utils.exceptions import AppError

images_bp = Blueprint("images", __name__)


@images_bp.post("/")
def upload_image():
    key = request.json.get("key")

    if not key:
        raise AppError("No key was provided", 400)

    # ffmpeg
    workflow = chain(
        compress_image.s(key), upload_panel_img.s(), generate_embedding.s()
    )
    result = workflow()

    return jsonify(result.id), 200


@images_bp.get("/search")
def search():
    file = request.files.get("image")

    images = vx.get_or_create_collection(name="panels")
    img = Image.open(file.stream).convert("RGB")

    emb = model.encode(img)

    results = images.query(data=emb, limit=1)
    urls = [f"{result}.png" for result in results]

    return jsonify(urls), 200
