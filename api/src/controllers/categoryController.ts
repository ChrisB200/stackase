import type { RequestHandler } from "express";
import { db } from "../config/database";

const getCategories: RequestHandler = async (req, res) => {
  const categories = await db.selectFrom("categories").selectAll().execute();

  res.status(200).json(categories);
};

export { getCategories };
