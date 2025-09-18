import multer from "multer";

// Set up multer to store files in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limit to 5MB, adjust as needed
  },
  fileFilter: (req, file, cb) => {
    // Optional: check MIME type
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    }
  },
});

export { upload };
