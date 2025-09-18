import { RequestHandler } from "express";
import AppError from "../utils/appError";
import { v4 as uuid4 } from "uuid";
import path from "path";
import { supabase } from "../config/supabase";
import { db } from "../config/database";

const createPanel: RequestHandler = async (req, res) => {
  const { caption, stackId } = req.body;
  const file = req.file;

  if (!file) throw new AppError("Missing panelImage", 400, "MISSING_FIELDS");

  if (!caption || !stackId)
    throw new AppError("Missing fields", 400, "MISSING_FIELDS");

  const pictureId = uuid4();
  const filename = `${pictureId}${path.extname(file.originalname)}`;
  const supabasePath = `${stackId}/${filename}`;

  const { error } = await supabase.storage
    .from("panels")
    .upload(supabasePath, file.buffer, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.mimetype,
    });

  if (error) throw new AppError(error.message, 500, error.name);

  const panel = await db
    .insertInto("panels")
    .values({ pictureId, caption, stackId })
    .returningAll()
    .executeTakeFirst();

  if (!panel) {
    const { data, error } = await supabase.storage
      .from("panels")
      .remove([supabasePath]);

    throw new AppError("A DB error occurred", 500);
  }

  res.status(200).json(panel);
};

export { createPanel };
