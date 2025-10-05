import { upload } from "../config/multer";
import { createPanel, getPanels } from "../controllers/panelController";
import protectedRoute from "../middleware/protectedRoute";
import { Router } from "express";

const router = Router();

router.post("/", [protectedRoute, upload.single("panelImage")], createPanel);
router.get("/", getPanels);

export default router;
