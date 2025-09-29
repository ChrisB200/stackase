import { RequestHandler } from "express";
import AppError from "../utils/appError";
import { db } from "../config/database";
import axios from "axios";
import path from "path";
import { supabase } from "../config/supabase";
import env from "../config/constants";
import { requestML } from "../utils/api";

const createPanel: RequestHandler = async (req, res) => {
  const { caption, stackId, format, origin, media } = req.body;
  const file = req.file;

  if (!file) throw new AppError("Missing panelImage", 400, "MISSING_FIELDS");

  if (!caption || !stackId)
    throw new AppError("Missing fields", 400, "MISSING_FIELDS");

  if (!format)
    throw new AppError("No format was provided", 400, "MISSING_FIELDS");

  if (!origin)
    throw new AppError("No origin was provided", 400, "MISSING_FIELDS");

  if (!media)
    throw new AppError("No media was provided", 400, "MISSING_FIELDS");

  const panel = await db
    .insertInto("panels")
    .values({ caption, stackId, origin, media, format })
    .returningAll()
    .executeTakeFirstOrThrow();

  const key = `temp/${panel.id}${path.extname(file.originalname)}`;

  const { error } = await supabase.storage
    .from("panels")
    .upload(key, file.buffer, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.mimetype,
    });

  // TODO: rollback db changes
  if (error) throw new AppError(error.message, 500);

  await requestML({ method: "post", url: "/images", data: { key } });

  res.status(200).json(panel);
};

export { createPanel };
