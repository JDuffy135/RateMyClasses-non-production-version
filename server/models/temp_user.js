const mongoose = require('mongoose');

const temp_userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    expireAt: {
        type: Date,
        default: Date.now,
        expires: 600
    },
    existingUser: {
        type: String,
        default: "NO"
    }
})

const Temp_User = mongoose.model('Temp_User', temp_userSchema);

module.exports = Temp_User;