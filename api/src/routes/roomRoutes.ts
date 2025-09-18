import { createRoom, getRoom, getRooms } from "../controllers/roomController";
import protectedRoute from "../middleware/protectedRoute";
import { Router } from "express";

const router = Router();

router.post("/", protectedRoute, createRoom);
router.get("/", getRooms);
router.get("/:roomId", getRoom);

export default router;
