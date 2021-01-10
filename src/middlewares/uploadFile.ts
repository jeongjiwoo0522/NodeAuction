import multer from "multer";
import path from "path";

const upload: multer.Multer = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, "uploads/");
    },
    filename(req, file, callback) {
      const ext = path.extname(file.originalname);
      callback(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
    },
  }),
  limits: { fieldSize: 5 * 1024 * 1024 },
});

export { upload }