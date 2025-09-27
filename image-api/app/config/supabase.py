from io import BytesIO

import vecs
from PIL import Image
from supabase import create_client

from .constants import DB_URL, SUPABASE_API_URL, SUPABASE_SERVICE_KEY

supabase = create_client(SUPABASE_API_URL, SUPABASE_SERVICE_KEY)
vx = vecs.create_client(DB_URL)


def get_file_name(key: str):
    split = key.split("/")
    filename = split[-1].split(".")[0]
    return filename


# TODO: Need to add error checking
def download_image(bucket: str, key: str):
    response = supabase.storage.from_("panels").download(key)
    img = Image.open(BytesIO(response)).convert("RGB")
    return img


def download_bytes(bucket: str, key: str):
    img = download_image(bucket, key)
    buf = BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)
    img_bytes = buf.read()
    return img_bytes
