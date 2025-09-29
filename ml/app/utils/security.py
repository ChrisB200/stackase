from datetime import datetime, timedelta
from functools import wraps

import jwt
from flask import request

from ..config.constants import SECRET_KEY
from ..utils.exceptions import AppError


def create_token(expiry=3600):
    payload = {"exp": datetime.utcnow() + timedelta(seconds=3600)}
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token


def decode_token(token: str):
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return decoded
    except Exception as e:
        print(e)
        raise AppError("UNAUTHORISED", 400)


def authenticated(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            raise AppError("Missing or invalid Authorization header", 401)

        token = auth_header.split(" ", 1)[1].strip()
        if not token:
            raise AppError("Unauthorised access", 401)

        try:
            decode_token(token)
        except Exception as e:
            print(str(e))
            raise AppError("Unauthorised access", 401)

        return f(*args, **kwargs)

    return wrapper
