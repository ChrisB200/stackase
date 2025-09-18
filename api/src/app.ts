import express from "express";
import morgan from "morgan";
import http from "http";
import initSession from "./config/session";
import initCORS from "./config/cors";
import { errorHandler } from "./middleware/errorHandler";
import { connectRedisClients } from "./config/redis";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import roomRoutes from "./routes/roomRoutes";
import categoryRoutes from "./routes/categoryRoutes";

(async () => {
  await connectRedisClients();
})();

const app = express();
const server = http.createServer(app);

// middleware
app.use(cookieParser());
app.use(initCORS());
app.use(initSession());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes
app.use("/auth", authRoutes);
app.use("/rooms", roomRoutes);
app.use("/categories", categoryRoutes);

// error handler
app.use(errorHandler);

export { server, app };
