import { createStack, getStacks } from "../controllers/stackController";
import protectedRoute from "../middleware/protectedRoute";
import { Router } from "express";

const router = Router();

router.post("/", protectedRoute, createStack);

router.get("/:userId", protectedRoute, getStacks);

export default router;
