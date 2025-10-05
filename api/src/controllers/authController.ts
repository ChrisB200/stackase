import { db } from "../config/database";
import { supabase } from "../config/supabase";
import { RequestHandler } from "express";
import AppError from "../utils/appError";

const completeSignup: RequestHandler = async (req, res) => {
  const { username, name } = req.body;
  const user = req.session.user!;

  if (!username || !name)
    throw new AppError("Missing fields", 400, "MISSING_FIELDS");

  const usernameExists = await db
    .selectFrom("users")
    .where("username", "=", username)
    .executeTakeFirst();

  if (usernameExists)
    throw new AppError("Username is already in use", 409, "USERNAME_EXISTS");

  await db
    .updateTable("users")
    .set({ username, name })
    .where("id", "=", user.id)
    .executeTakeFirst();

  res.status(200).json({ message: "success" });
};

const isAuthenticated: RequestHandler = async (req, res) => {
  res.status(200).json(req.session.user);
};

const signup: RequestHandler = async (req, res) => {
  const { email, password, username, name } = req.body;

  if (!email || !password || !username || !name)
    throw new AppError("Missing fields", 400, "MISSING_FIELDS");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { username, name } },
  });

  if (error) throw new AppError(error.message, 400, error.code);

  const accessToken = data.session?.access_token;

  res.status(200).json({ accessToken });
};

const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new AppError("Missing fields", 400, "MISSING_FIELDS");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new AppError(error.message, 400, error.code);

  const accessToken = data.session?.access_token;

  res.status(200).json({ accessToken });
};

export { completeSignup, isAuthenticated, signup, login };
