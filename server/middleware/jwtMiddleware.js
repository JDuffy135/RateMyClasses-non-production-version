const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.JWT_STRING, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({error: "user couldn't be authorized"});

            } else {
                next();
            }
        })
    } else {
        return res.status(401).json({error: "user couldn't be authorized"});
    }
}

const requireSpecificAuth = async (req, res, next) => {
    const token = req.cookies.token;
    const userid = req.params.userid;
    let user = null;
    try {
        user = await User.findById(userid);
    } catch (err) {
        return res.status(401).json({error: "user couldn't be authorized"});
    }

    if (user !== null) {
        jwt.verify(token, process.env.JWT_STRING, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({error: "user couldn't be authorized"});
            } else if (decodedToken.id !== userid) {
                return res.status(401).json({error: "user couldn't be authorized"});
            } else {
                next();
            }
        })
    } else {
        return res.status(401).json({error: "user couldn't be authorized"});
    }
}


module.exports = { requireAuth, requireSpecificAuth }