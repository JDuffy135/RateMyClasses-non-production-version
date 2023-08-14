const mongoose = require('mongoose');

/* the auto-generated _id value of the temp_user will be used for user/password change confirmation */

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