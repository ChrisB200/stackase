import { NextFunction, Request, Response } from "express";
import { getAuthorizationToken } from "../utils/jwt";
import { db } from "../config/database";
import { SessionData } from "express-session";
import AppError from "../utils/appError";
import { supabase } from "../config/supabase";

// Function to handle token validation and user session update
async function handleToken(token: string, session: Partial<SessionData>) {
  const { data } = await supabase.auth.getUser(token);
  if (!data.user)
    throw new AppError("Unauthorised access", 401, "UNAUTHORISED");

  // Fetch the user based on the token data (e.g., authUserId)
  let user = await db
    .selectFrom("users")
    .selectAll()
    .where("id", "=", data.user.id)
    .executeTakeFirst();

  if (user) {
    session.user = user;
  } else {
    throw new AppError("Unauthorised access", 401, "UNAUTHORISED");
  }
}

// Middleware to handle both Express and Socket.IO requests
const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Handle Express Request
  const token = getAuthorizationToken(req);
  if (!token) {
    throw new AppError("Unauthorised access", 401, "UNAUTHORISED");
  }
  await handleToken(token, req.session); // Handle token and update session for Express
  return next();
};

export default protectedRoute;
