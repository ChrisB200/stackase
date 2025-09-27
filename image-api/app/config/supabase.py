import vecs
from supabase import create_client

from .constants import DB_URL, SUPABASE_API_URL, SUPABASE_SERVICE_KEY

supabase = create_client(SUPABASE_API_URL, SUPABASE_SERVICE_KEY)
vx = vecs.create_client(DB_URL)
