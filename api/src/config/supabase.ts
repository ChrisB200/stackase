import { createClient } from "@supabase/supabase-js";
import env from "./constants";
import { DB } from "../types/db";

const supabase = createClient<DB>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

export { supabase };
