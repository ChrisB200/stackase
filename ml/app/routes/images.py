from celery import chain
from flask import Blueprint, jsonify, request
from PIL import Image

from ..config.supabase import download_image, get_vecs_client
from ..tasks import compress_image, generate_embedding, model, upload_panel_img
from ..utils.exceptions import AppError
from ..utils.security import authenticated

images_bp = Blueprint("images", __name__)


@images_bp.post("/")
@authenticated
def upload_image():
    key = request.json.get("key")

    if not key:
        raise AppError("No key was provided", 400)

    # ffmpeg
    workflow = chain(
        compress_image.s(key), upload_panel_img.s(), generate_embedding.s()
    )
    try:
        result = workflow()
    except Exception as e:
        return jsonify(error="INTERNAL SERVER ERROR"), 500

    return jsonify(result.id), 200


@images_bp.get("/search")
def search():
    vx = get_vecs_client()
    file = request.files.get("image")

    images = vx.get_or_create_collection(name="panels", dimension=512)
    img = Image.open(file.stream).convert("RGB")

    emb = model.encode(img)

    results = images.query(data=emb)
    urls = [f"{result}.png" for result in results]

    return jsonify(urls), 200


@images_bp.get("/search/id")
def search_id():
    vx = get_vecs_client()
    id = request.json.get("id")

    response = download_image("panels", f"{id}.png")

    images = vx.get_or_create_collection(name="panels", dimension=512)

    emb = model.encode(response)

    results = images.query(data=emb)
    return jsonify(results), 200
