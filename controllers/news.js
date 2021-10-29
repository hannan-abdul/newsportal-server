const News = require("../models/News")

//add services api
const addnews = async (req, res) => {
    try {
        const newNews = new News({
            title: req.body.title,
            email: req.body.email,
            category: req.body.category,
            author: req.body.author,
            description: req.body.description,
            photo: req.body.photo,
        });
        const newnews = await newNews.save();
        res.status(200).json(newnews);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
}

//get all services list
const allnews = async (req, res) => {
    try {
        const newss = await News.find()
        res.status(200).json(newss)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

//delete service
const deletenews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (news.email === req.body.email) {
            try {
                await news.delete();
                res.status(200).json("News has been deleted");
            } catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("You can delete only your News");
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
}

// update service 
const updateNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (news.email === req.body.email) {
            try {
                const updatenews = await News.findByIdAndUpdate(
                    req.params.id,
                    { $set: req.body },
                    { new: true }
                );
                res.status(200).json(updatenews);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can update only your News");
        }
    } catch (err) {
        res.status(500).json(err)
    }
};

// get single service 
const singlenews = async (req, res) => {
    let newsId = req.params.id;
    try {
        const newsItem = await News.findById(newsId);
        res.status(200).json(newsItem)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
};



module.exports = {
    addnews,
    allnews,
    singlenews,
    deletenews,
    updateNews
}

