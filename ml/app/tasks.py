import os
import subprocess

from celery import shared_task
from sentence_transformers import SentenceTransformer

from .config.supabase import (download_bytes, download_image, get_file_name,
                              get_supabase_client, get_vecs_client)

model = SentenceTransformer("clip-ViT-B-32")


# TODO: Add error checking and rollbacks
@shared_task
def compress_image(key: str):
    img = download_bytes("panels", key)
    name = get_file_name(key)
    path = f"{name}.png"

    process = subprocess.Popen(
        [
            "ffmpeg",
            "-i",
            "pipe:0",
            "-vf",
            "format=rgba",
            "-compression_level",
            "9",
            path,
        ],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )

    stdout, stderr = process.communicate(input=img)

    print("ffmpeg return code:", process.returncode)
    print("stderr:", stderr.decode())

    if process.returncode != 0:
        print("ffmpeg error " + stderr.decode())

        if os.path.exists(path):
            os.remove(path)

        raise RuntimeError(
            f"ffmpeg failed with code {process.returncode}: {stderr.decode()}"
        )

    return {"path": path, "key": key}


@shared_task
def upload_panel_img(value: dict):
    supabase = get_supabase_client()
    path = value.get("path")
    key = value.get("key")

    try:
        with open(path, "rb") as file:
            supabase.storage.from_("panels").upload(
                path, file, file_options={"content-type": "image/png"}
            )
    except Exception as e:
        print(str(e))
        raise RuntimeError(f"failed to upload {key}")
    finally:
        # cleanup
        if os.path.exists(path):
            os.remove(path)
        supabase.storage.from_("panels").remove([key])

    return path


@shared_task()
def generate_embedding(path: str):
    vx = get_vecs_client()
    img = download_image("panels", path)
    images = vx.get_or_create_collection(name="panels", dimension=512)
    emb1 = model.encode(img)
    images.upsert(records=[(path.split(".png")[0], emb1, {"type": "png"})])

    return "success"
