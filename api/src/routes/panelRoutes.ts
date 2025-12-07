import { upload } from "../config/multer";
import {
  createPanel,
  findSimilarPanels,
  getPanels,
  likePanel,
} from "../controllers/panelController";
import protectedRoute from "../middleware/protectedRoute";
import { Router } from "express";

const router = Router();

router.post("/", [protectedRoute, upload.single("panelImage")], createPanel);
router.get("/", getPanels);
router.post("/search", findSimilarPanels);
router.post("/:panelId/like", protectedRoute, likePanel);

export default router;
