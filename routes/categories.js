const router = require("express").Router();
const category_control = require("../controllers/categories")

router.post("/addcategory", category_control.addcategory)
router.get("/all", category_control.getAllCategory)
router.delete("/:id", category_control.deleteCategory)


module.exports = router;