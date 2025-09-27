from io import BytesIO

from celery import chain
from flask import Blueprint, jsonify, request, send_file
from PIL import Image
from sentence_transformers import SentenceTransformer

from ..config.supabase import supabase, vx
from ..tasks import compress_image, generate_embedding, upload_panel_img
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
    stack_id = request.json.get("stackId")
    picture_id = request.json.get("pictureId")
    model = SentenceTransformer("clip-ViT-B-32")

    images = vx.get_or_create_collection(name="image_vectors", dimension=512)
    path = f"{stack_id}/{picture_id}.jpg"
    response = supabase.storage.from_("panels").download(path)
    img = Image.open(BytesIO(response)).convert("RGB")

    emb = model.encode(img)

    results = images.query(data=emb)

    # Get the ID from the result
    picture_id = results[0]  # or however your vector DB returns it
    stack_id = stack_id  # already available from request

    # Construct Supabase storage path
    path = f"{stack_id}/{picture_id}.jpg"

    # Get the best match id -> reconstruct path (or get from metadata if stored)
    print(results)
    best_id = results[0]
    best_path = f"{stack_id}/{best_id}.jpg"
    best_image_bytes = supabase.storage.from_("panels").download(best_path)

    # Return image as HTTP response
    return send_file(BytesIO(best_image_bytes), mimetype="image/jpeg")
