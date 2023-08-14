const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    postedReviews: {
        type: Array,
        default: []
    }
})

//BCRYPT PASSWORD HASHING WHEN SAVING
userSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt();
        try {
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (err) {
            /* CUSTOM ERROR HANDLING HERE - password couldn't be hashed */
            console.log(err)
        }
    } catch (err) {
        /* CUSTOM ERROR HANDLING HERE - salt couldn't be generated */
        console.log(err)
    }
})

//BCRYPT PASSWORD HASHING WHEN UPDATING
userSchema.pre('updateOne', async function(next) {
    let data = this.getUpdate()
    try {
        const salt = await bcrypt.genSalt();
        try {
            data.password = await bcrypt.hash(data.password, salt);
            next();
        } catch (err) {
            console.log(err)
        }
    } catch (err) {
        console.log(err)
    }
});

//STATIC METHOD FOR HANDLING USER LOGIN (returns user document from database)
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;