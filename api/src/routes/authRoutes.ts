import {
  completeSignup,
  isAuthenticated,
  signup,
  login,
} from "../controllers/authController";
import protectedRoute from "../middleware/protectedRoute";
import { Router } from "express";

const router = Router();

router.post("/signup/complete", protectedRoute, completeSignup);
router.get("/authenticated", protectedRoute, isAuthenticated);
router.post("/login", login);
router.post("/signup", signup);

export default router;
