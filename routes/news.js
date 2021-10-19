const router = require("express").Router();
const news_control = require("../controllers/news");

router.post("/addnews", news_control.addnews)
router.get("/allnews", news_control.allnews)
router.get("/:id", news_control.singlenews)
router.delete("/:id", news_control.deletenews)
router.put("/:id",news_control.updateNews)

module.exports = router;
