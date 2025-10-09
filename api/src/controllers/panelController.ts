import { RequestHandler } from "express";
import AppError from "../utils/appError";
import { db } from "../config/database";
import path from "path";
import { supabase } from "../config/supabase";
import { requestML } from "../utils/api";
import { rollbackInsert, rollbackStorage } from "../utils/rollback";
import { sql } from "kysely";

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

  const maxResult = await db
    .selectFrom("panels")
    .select(({ fn }) => fn.max("position").as("maxPosition"))
    .executeTakeFirst();

  const position = (maxResult?.maxPosition ?? -1) + 1;

  const panel = await db
    .insertInto("panels")
    .values({ caption, stackId, origin, media, format, position })
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
  if (error) {
    await rollbackStorage("panels", key);
    await rollbackInsert("panels", panel.id);
    throw new AppError(error.message, 500);
  }

  try {
    const response = await requestML({
      method: "post",
      url: "/images",
      data: { key },
    });
  } catch (error) {
    await rollbackStorage("panels", key);
    await rollbackInsert("panels", panel.id);
    throw new AppError("Could not upload image", 400, "ML_ERROR");
  }

  res.status(200).json(panel);
};

const getPanels: RequestHandler = async (req, res) => {
  const { include } = req.query;

  const options = {
    include: include ? include : null,
  };

  let query = db
    .selectFrom("panels")
    .selectAll()
    .orderBy(sql`random()`);

  console.log(options);
  if (options.include === "stacks") {
    query = query
      .leftJoin("stacks", "panels.stackId", "stacks.id")
      .leftJoin("users", "stacks.userId", "users.id")
      .select(["username", "panels.id as id", "stacks.title as title", "name"]);
  }

  const panels = await query.execute();

  res.status(200).json(panels);
};

export { createPanel, getPanels };
