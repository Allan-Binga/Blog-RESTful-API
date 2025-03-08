const express = require("express");
const upload = require("../middleware/uploads");

const { registerUser, loginUser, logoutUser } = require("../controllers/auth");

const router = express.Router();

//Register route to include the upload middleware.
router.post("/register", upload.single("profilePic"), registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
