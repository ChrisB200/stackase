import type { RequestHandler } from "express";
import { db } from "../config/database";

const createStack: RequestHandler = async (req, res) => {
  const { name } = req.body;
  const user = req.session.user!;

  const stack = await db
    .insertInto("stacks")
    .values({ name, userId: user.id })
    .returningAll()
    .executeTakeFirstOrThrow();

  res.status(200).json(stack);
};

const getStacks: RequestHandler = async (req, res) => {
  const { userId } = req.params;
  const stacks = await db
    .selectFrom("stacks")
    .selectAll()
    .where("userId", "=", userId)
    .execute();

  res.status(200).json(stacks);
};

export { createStack, getStacks };
