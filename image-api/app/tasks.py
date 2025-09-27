from io import BytesIO

from celery import shared_task
from PIL import Image

from .config.models import model
from .config.supabase import supabase, vx


@shared_task()
def generate_embedding(stack_id, picture_id):
    path = f"{stack_id}/{picture_id}.jpg"
    response = supabase.storage.from_("panels").download(path)
    img = Image.open(BytesIO(response)).convert("RGB")
    images = vx.get_or_create_collection(name="image_vectors", dimension=512)

    emb1 = model.encode(img)

    images.upsert(records=[(picture_id, emb1, {"type": "jpeg"})])

    images.create_index()
