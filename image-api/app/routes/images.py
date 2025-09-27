from io import BytesIO

from flask import Blueprint, jsonify, request, send_file
from PIL import Image

from ..config.models import model
from ..config.supabase import supabase, vx
from ..tasks import generate_embedding

images_bp = Blueprint("images", __name__)


@images_bp.post("/embed")
def embedding():
    stack_id = request.json.get("stackId")
    picture_id = request.json.get("pictureId")

    result = generate_embedding.delay(stack_id, picture_id)

    return jsonify(result_id=result.id), 200


@images_bp.get("/search")
def search():
    stack_id = request.json.get("stackId")
    picture_id = request.json.get("pictureId")

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
