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
        default: () => new Date(Date.now() + 60 * 60 * 24 * 1000), // 24 hours from now
        expires: 0 // TTL index automatically removes documents after the `expireAt` time
    }
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;