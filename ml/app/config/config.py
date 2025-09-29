# from redis import Redis

from .constants import SECRET_KEY


class ApplicationConfig:
    SECRET_KEY = SECRET_KEY
    CELERY_BROKER_URL = "redis://:password@127.0.0.1:6379/0"
    CELERY_RESULT_BACKEND = "redis://:password@127.0.0.1:6379/0"
