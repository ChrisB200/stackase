import { upload } from "../config/multer";
import { createPanel } from "../controllers/panelController";
import protectedRoute from "../middleware/protectedRoute";
import { Router } from "express";

const router = Router();

router.post("/", [protectedRoute, upload.single("panelImage")], createPanel);

export default router;
