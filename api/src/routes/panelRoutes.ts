import {
  createPanel,
  findSimilarPanels,
  getPanels,
  likePanel,
} from "../controllers/panelController";
import protectedRoute from "../middleware/protectedRoute";
import { uploadPanelImage } from "../middleware/uploadPanelImage";
import { Router } from "express";

const router = Router();

router.post("/", [protectedRoute, uploadPanelImage], createPanel);
router.get("/", getPanels);
router.post("/search", findSimilarPanels);
router.post("/:panelId/like", protectedRoute, likePanel);

export default router;
