const router = require("express").Router();
//IMPORT USER MODEL
const User = require("../models/users.js");
const bcrypt = require("bcrypt");
const Post = require("../models/post.js")

//UPDATE USER
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("You can only update your account.");
  }
});

//DELETE USER
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      try {
        await Post.deleteMany({username:user.username})
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(404).json("User not found.")
    }
  } else {
    res.status(401).json("You can only delete your account.");
  }
});

//GET USERS
router.get("/:id", async(req, res)=>{
  try {
    const user = await User.findById(req.params.id)
    const {password, ...others} = user._doc
    res.status(200).json(others)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router;
