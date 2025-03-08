const express = require("express");
const upload = require("../middleware/uploads")

const { registerUser, loginUser } = require("../controllers/auth");

const router = express.Router();

//Register route to include the upload middleware.
router.post("/register", upload.single("profilePic"), registerUser)
router.post("/login", loginUser)

module.exports = router;
