import { db } from "../config/database";
import { supabase } from "../config/supabase";
import AppError from "./appError";

export async function rollbackStorage(bucket: string, key: string) {
  const { error } = await supabase.storage.from(bucket).remove([key]);
  if (error) throw new AppError(error.message, 500, "STORAGE_ERROR");
  return "success";
}

export async function rollbackInsert(table: string, id: string | number) {
  const result = await db
    .deleteFrom(table as any)
    .where("id", "=", id)
    .execute();

  return result;
}
