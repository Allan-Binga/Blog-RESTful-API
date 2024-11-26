const router = require('express').Router()
//IMPORT USER MODEL
const User = require("../models/user.js")
//USING BCRYPT TO HASH USER PASSWORD
const bcrypt = require('bcrypt');

//REGISTER
//Create new user
router.post("/register", async (req, res)=>{
    try {

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })
        //SAVE USER
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

//LOGIN
router.post("/login", async (req, res)=>{
    try {
        const user = await User.findOne({username: req.body.username})
        !user && res.status(400).json("Wrong username or password.")

        const validate = await bcrypt.compare(req.body.password, user.password)
        !validate && res.status(400).json("Wrong password.")

        // const {password, ...others}
        res.status(200).json("Login successful.")
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router