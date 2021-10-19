const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        unique: false
    },
    role: {
        type: String,
        required: true,
        unique: false,
    }
}, { timestamps: true });

module.exports = mongoose.model('auth', AuthSchema);