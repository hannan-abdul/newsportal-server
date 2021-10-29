const { json } = require('body-parser');
const Categories = require('../models/Categories');

// add Categories 
const addcategory = async (req, res) => {
    try {
        const newCategory = new Categories({
            name: req.body.name,
            email: req.body.email,
        });
        const category = await newCategory.save();
        res.status(200).json({ success: 'category added successfully', category })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
}

// get category list 
const getAllCategory = async (req, res) => {
    try {
        const allcategory = await Categories.find()
        res.status(200).json(allcategory)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

// delete category 
const deleteCategory = async (req, res) => {
    try {
        const delcat = await Categories.findById(req.params.id);
        if (delcat.email === req.body.email) {
            try {
                await delcat.delete();
                res.status(200).json({ success: "category deleted" })
            } catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("You can delete only your category");
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

module.exports = {
    addcategory,
    getAllCategory,
    deleteCategory,
}