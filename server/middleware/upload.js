const multer = require("multer");

const multerConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/images/uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}_${file.originalname}`);
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Only Images are Allowed..."));
  }
};

const upload = multer({
  storage: multerConfig,
  fileFilter: isImage,
});

exports.uploadImage = upload.single("prize_image");

exports.upload = (req, res) => {
  console.log(req.file);
  if (req.file) {
    res.status(200).json({
      status: "Success",
    });
  } else {
    res.status(404).json({
      status: "Missing File",
    });
  }
};
