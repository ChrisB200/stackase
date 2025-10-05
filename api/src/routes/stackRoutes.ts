import {
  createStack,
  getStack,
  getStackByUsernameTitle,
} from "../controllers/stackController";
import protectedRoute from "../middleware/protectedRoute";
import { Router } from "express";

const router = Router();

router.post("/", protectedRoute, createStack);
router.get("/:stackId", getStack);
router.get("/:username/:stackTitle", getStackByUsernameTitle);

export default router;
