import { getStacksByUserId } from "../controllers/userController";
import protectedRoute from "../middleware/protectedRoute";
import { Router } from "express";

const router = Router();

router.get("/:userId/stacks", getStacksByUserId);

export default router;
