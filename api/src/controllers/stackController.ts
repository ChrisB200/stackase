import type { RequestHandler } from "express";
import { db } from "../config/database";
import AppError from "../utils/appError";

const createStack: RequestHandler = async (req, res) => {
  const { title } = req.body;
  const user = req.session.user!;

  const stack = await db
    .insertInto("stacks")
    .values({ title, userId: user.id })
    .returningAll()
    .executeTakeFirstOrThrow();

  res.status(200).json(stack);
};

const getStack: RequestHandler = async (req, res) => {
  const { stackId } = req.params;

  if (!stackId)
    throw new AppError("No stack id was provided", 400, "MISSING_FIELDS");

  const stack = await db
    .selectFrom("stacks")
    .selectAll()
    .where("stacks.id", "=", parseInt(stackId))
    .leftJoin("users", "users.id", "stacks.userId")
    .select(["stacks.id as id"])
    .execute();

  res.status(200).json(stack);
};

export { createStack, getStack };
