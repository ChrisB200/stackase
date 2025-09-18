import type { RequestHandler } from "express";
import { db } from "../config/database";
import AppError from "../utils/appError";

const createRoom: RequestHandler = async (req, res) => {
  const { topic, categoryId } = req.body;
  const user = req.session.user!;

  if (!topic) throw new AppError("Missing topic", 400, "INVALID_FIELDS");

  if (!categoryId)
    throw new AppError("Missing category id", 400, "INVALID_FIELDS");

  const room = await db
    .insertInto("rooms")
    .values({ userId: user.id, topic, categoryId })
    .returningAll()
    .executeTakeFirst();

  if (!room) throw new AppError("Error creating room", 500);

  res.status(200).json(room.id);
};

const getRooms: RequestHandler = async (req, res) => {
  const rooms = await db
    .selectFrom("rooms")
    .innerJoin("categories", "categoryId", "categories.id")
    .selectAll()
    .execute();

  res.status(200).json(rooms);
};

const getRoom: RequestHandler = async (req, res) => {
  const { roomId } = req.params;

  if (!roomId) throw new AppError("Missing room id", 400, "INVALID_FIELDS");

  const room = await db
    .selectFrom("rooms")
    .innerJoin("categories", "categoryId", "categories.id")
    .selectAll()
    .executeTakeFirst();

  if (!room)
    throw new AppError(`room ${roomId} does not exist`, 404, "INVALID_FIELDS");

  res.status(200).json(room);
};

export { createRoom, getRooms, getRoom };
