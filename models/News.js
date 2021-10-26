const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: true,
        unique: false
    },
    photo: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('newsdata', newsSchema);