const multer = require("multer");
const path = require("path");

// Create storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "profilePics/"); // Save images to the 'uploads' folder
  },
  filename: function (req, file, cb) {
    //Renaming files to avoid duplicates: x-12345.jpg
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

// File filter to allow only jpg and jpeg
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG and JPG images are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
