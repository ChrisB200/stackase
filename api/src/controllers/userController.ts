import type { RequestHandler } from "express";
import AppError from "../utils/appError";
import { db } from "../config/database";

const getStacksByUserId: RequestHandler = async (req, res) => {
  const { userId } = req.params;

  if (!userId) throw new AppError("Missing user id", 400, "MISSING_FIELDS");

  const stacks = await db
    .selectFrom("stacks")
    .selectAll()
    .leftJoin("users", "users.id", "stacks.userId")
    .select(["users.name", "users.username", "stacks.id as id"])
    .where("stacks.userId", "=", userId)
    .execute();

  res.status(200).json(stacks);
};

export { getStacksByUserId };
