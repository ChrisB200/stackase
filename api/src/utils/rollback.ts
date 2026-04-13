import { db } from "../config/database";
import { supabase } from "../config/supabase";

/** Best-effort storage delete; never throws (file may not exist if upload never completed). */
export async function rollbackStorage(bucket: string, key: string) {
  const { error } = await supabase.storage.from(bucket).remove([key]);
  if (error) {
    console.error(
      `[rollbackStorage] could not remove ${bucket}/${key}:`,
      error.message,
    );
  }
}

/** Best-effort row delete; logs on failure. */
export async function rollbackInsert(table: string, id: string | number) {
  try {
    const numericId = typeof id === "number" ? id : Number(id);
    await db
      .deleteFrom(table as "panels")
      .where("id", "=", numericId)
      .execute();
  } catch (e) {
    console.error(`[rollbackInsert] could not delete ${table} id=${id}:`, e);
  }
}
