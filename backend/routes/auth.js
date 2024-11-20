const router = require('express').Router()
//IMPORT USER MODEL
const User = require("../models/user.js")

//REGISTER
//Create new user
router.post("/register", async (req, res)=>{
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
        //SAVE USER
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router