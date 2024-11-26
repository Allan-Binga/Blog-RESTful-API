const router = require("express").Router();
//IMPORT USER MODEL
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const Post = require("../models/post.js")

//CREATE POST
router.post("/:id", async (req, res) => {
  const newPost = new Post(req.body)
  
});

//UPDATE POST
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

//DELETE POST

//GET POST
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
