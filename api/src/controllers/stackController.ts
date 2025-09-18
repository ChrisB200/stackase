import type { RequestHandler } from "express";
import { db } from "../config/database";

const createStack: RequestHandler = async (req, res) => {
  const { name, description } = req.body;
  const user = req.session.user!;

  const stack = await db
    .insertInto("stacks")
    .values({ name, description, userId: user.id })
    .returningAll()
    .executeTakeFirstOrThrow();

  res.status(200).json(stack);
};

const getStacks: RequestHandler = async (req, res) => {
  const user = req.session.user!;

  const stacks = await db.selectFrom("stacks").selectAll().execute();

  res.status(200).json(stacks);
};

export { createStack, getStacks };
