const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.JWT_STRING, (err, decodedToken) => {
            if (err) {
                // res.redirect('/signin')
                return res.status(401).json({error: "user couldn't be authorized"});

            } else {
                next();
            }
        })
    } else {
        // res.redirect('/signin')
        return res.status(401).json({error: "user couldn't be authorized"});
    }
}

const requireSpecificAuth = async (req, res, next) => {
    const token = req.cookies.token;
    const userid = req.params.userid;
    const user = await User.findById(userid);
    if (token) {
        jwt.verify(token, process.env.JWT_STRING, (err, decodedToken) => {
            if (err) {
                // res.redirect('/signin')
                return res.status(401).json({error: "user couldn't be authorized"});
            } else if (decodedToken.id != userid) {
                // res.redirect('/signin')
                return res.status(401).json({error: "user couldn't be authorized"});
            } else if (user == null) {
                console.log("user not authenticated")
                // res.redirect('/signin')
                return res.status(401).json({error: "user couldn't be authorzed"});
            } else {
                next();
            }
        })
    } else {
        // res.redirect('/signin')
        return res.status(401).json({error: "user couldn't be authorized"});
    }
}


module.exports = { requireAuth, requireSpecificAuth }