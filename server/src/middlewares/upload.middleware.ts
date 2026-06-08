import multer from "multer";

import path from "path";

// Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// File Filter
const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: any
) => {
  const allowedMimeTypes = [
    "application/pdf",
    "application/octet-stream",
  ];

  const isPdf =
    file.originalname
      .toLowerCase()
      .endsWith(".pdf");

  if (
    allowedMimeTypes.includes(
      file.mimetype
    ) || isPdf
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only PDF files are allowed"
      ),
      false
    );
  }
};

// Export Upload Middleware
export const upload = multer({
  storage,
  fileFilter,
});