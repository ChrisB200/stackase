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

const getStackByUsernameTitle: RequestHandler = async (req, res) => {
  const { username, stackTitle } = req.params;

  if (!username || !stackTitle)
    throw new AppError("Missing fields", 400, "MISSING_FIELDS");

  const stack = await db
    .selectFrom("stacks")
    .leftJoin("users", "stacks.userId", "users.id")
    .where("users.username", "ilike", username)
    .where("stacks.title", "ilike", stackTitle)
    .selectAll()
    .select(["stacks.id as id"])
    .executeTakeFirst();

  if (!stack) throw new AppError("Stack not found", 404, "DOES_NOT_EXIST");

  const panels = await db
    .selectFrom("panels")
    .selectAll()
    .where("stackId", "=", stack.id)
    .execute();

  const combined = {
    ...stack,
    panels,
  };

  res.status(200).json(combined);
};

export { createStack, getStack, getStackByUsernameTitle };
