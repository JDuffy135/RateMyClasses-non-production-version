const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    expireAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24 * 1
    }
})

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;