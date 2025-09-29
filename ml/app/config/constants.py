import logging
import os

from dotenv import load_dotenv

logger = logging.getLogger(__name__)

load_dotenv(verbose=True, override=True)


def get_env(key, fallback=None):
    env_variable = os.getenv(key)
    if env_variable:
        return env_variable

    if not fallback:
        raise KeyError(f"Missing environment variable: {key}")

    logger.debug(f"Using fallback environment variable for key: {key}")

    return fallback


PORT = get_env("PORT")
SECRET_KEY = get_env("SECRET_KEY")

DB_USERNAME = get_env("DB_USERNAME")
DB_PASSWORD = get_env("DB_PASSWORD")
DB_HOST = get_env("DB_HOST")
DB_DATABASE = get_env("DB_DATABASE")
DB_PORT = get_env("DB_PORT", 5432)
DB_URL = f"postgresql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_DATABASE}"

# ----- SUPABASE -----
SUPABASE_API_URL = get_env("SUPABASE_API_URL")
SUPABASE_SERVICE_KEY = get_env("SUPABASE_SERVICE_KEY")
