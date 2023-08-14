const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.JWT_STRING, (err, decodedToken) => {
            if (err) {
                res.redirect('/signin')
                console.log(err.message)
            } else {
                next();
            }
        })
    } else {
        res.redirect('/signin')
    }
}

const requireSpecificAuth = async (req, res, next) => {
    const token = req.cookies.token;
    const userid = req.params.userid;
    const user = await User.findById(userid);
    if (token) {
        jwt.verify(token, process.env.JWT_STRING, (err, decodedToken) => {
            if (err) {
                console.log("user not authenticated")
                // res.status(401).json({error: "user not authenticated"})
                res.redirect('/signin')
            } else if (decodedToken.id != userid) {
                console.log("user not authenticated")
                // res.status(401).json({error: "user not authenticated"})
                res.redirect('/signin')
            } else if (user == null) {
                console.log("user not authenticated")
                // res.status(401).json({error: "user not authenticated"})
                res.redirect('/signin')
            } else {
                next();
            }
        })
    } else {
        res.redirect('/signin')
    }
}


module.exports = { requireAuth, requireSpecificAuth }