const router = require("express").Router();
const Category = require("../models/category.js")

//POST CATEGORY
router.post("/", async (req, res) => {
    const newCat = new Category(req.body)
    try {
        const savedCat = await newCat.save()
        res.status(200).json(savedCat)
    } catch (error) {
        res.status(501).json(error)
    }
})

//GET CATEGORIES
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch (error) {
        res.status(501).json(error)
    }
})
module.exports = router