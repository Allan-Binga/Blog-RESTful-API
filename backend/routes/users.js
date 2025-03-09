const express = require("express")
const {getUsers, getSingleUser, updateInformation} = require("../controllers/users")
const upload = require("../middleware/uploads")

const router = express.Router()

//Users route
router.get("/", getUsers)
router.get("/:name", getSingleUser)
router.patch("/:name/profile/update", upload.single("profilePic"), updateInformation);


module.exports = router