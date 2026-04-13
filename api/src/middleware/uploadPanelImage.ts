import { upload } from "../config/multer";
import AppError from "../utils/appError";
import multer from "multer";
import type { RequestHandler } from "express";

/** Runs multer and maps errors to AppError so the client gets 4xx instead of generic 500. */
export const uploadPanelImage: RequestHandler = (req, res, next) => {
  upload.single("panelImage")(req, res, (err) => {
    if (!err) {
      next();
      return;
    }
    if (err instanceof multer.MulterError) {
      next(new AppError(err.message, 400, "UPLOAD_ERROR"));
      return;
    }
    next(
      new AppError(
        err instanceof Error ? err.message : "Invalid file upload",
        400,
        "UPLOAD_ERROR",
      ),
    );
  });
};
