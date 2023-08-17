const express = require('express');
const Mailer = require('../mailer.js');
const passGenerator = require('../passGenerator.js');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const Temp_User = require('../models/temp_user.js');


//--------- SIGN IN FUNCTIONS ---------//

const createToken = (id) => {
    const secret = process.env.JWT_STRING;
    return jwt.sign({ id }, secret);
}

const get_signin = async (req, res) => {
    const token = req.cookies.token;
    if (token) {
        // res.redirect('/')
        res.status(302).json({message: "user already signed in - redirecting"})
    } else {
        res.status(200).json({message: "signin GET successful"})
    }
}

const post_signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    if (user != null)
    {
        const token = createToken(user._id);
        res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 3 });
        // res.redirect('/');
        res.status(302).json({message: "login successful - redirecting"})
    } else {
        res.status(400).json({error: "login failed"})
    }
}


//--------- SIGN UP FUNCTIONS ---------//

const get_signup = (req, res) => {
    res.status(200).json({message: "signup GET successful"})
}

const post_signup = async (req, res) => {
    const { email } = req.body;
    if (await User.findOne({ email }) == null && await Temp_User.findOne({ email }) == null)
    {
        try {
            const temp_user = await Temp_User.create({ email });
            Mailer.sendSignUpConfirmationEmail(email, temp_user._id)
            // res.redirect('/signup/confirmation')
            res.status(302).json({message: "signup successful - redirecting to signup confirmation page"})
         } catch (err) {
            console.log(err)
            res.status(500).json({error: "couldn't generate an id for user confirmation"})
        }
    }
    else {
        res.status(400).json({error: "a user with the entered email address already exists or is waiting to be confirmed."})
    }
}

const get_signupConfirmation = (req, res) => {
    res.status(200).send({message: "confirmation email sent!"})
}

const post_signupConfirmation = async (req, res) => {
    const { temp_id } = req.body;
    try {
        const temp_user = await Temp_User.findById(temp_id);
        const email = temp_user.email;
        const password = passGenerator.generatePassword();
        const user = await User.create({ email, password });
        /* NOTE: password is hashed in a mongoose pre hook (using bcrypt) before saved to database */
        await Temp_User.deleteMany({ email });
        Mailer.sendNewAccountPasswordEmail(email, password);
        // res.redirect('/signin');
        res.status(302).json({message: "signup confirmation successful - redirecting to signin page"})
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "user's account couldn't be confirmed, try signing up again"})
    }
}


//--------- CHANGE PASSWORD FUNCTIONS ---------//

const get_changePassword = (req, res) => {
    res.status(200).json({message: "change password GET succesful"})
}

const post_changePassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user == null) {
        res.status(400).json({error: "user doesn't exist"})
    }
    else {
        if (await Temp_User.findOne({ email, existingUser: "YES" }) == null) {
            const temp_user = await Temp_User.create({
                email,
                existingUser: "YES"
            });
            Mailer.sendChangePasswordConfirmationEmail(email, temp_user._id)
            // res.redirect('/change-password/confirmation')
            res.status(302).json({message: "change password successful - redirecting to change password confirmation page"})
        }
        else
        {
            res.status(400).json({error: "password change already requested, check your inbox (and junk mail) - you will be eligible for another password change in about 10 minutes if not found"})
        }
    }
}

const get_changePasswordConfirmation = (req, res) => {
    res.status(200).json({message: "password change confirmation email sent!"})
}

const post_changePasswordConfirmation = async (req, res) => {
    const { temp_id } = req.body;
    const temp_user = await Temp_User.findById(temp_id);

    if (temp_user != null) {
        const email = temp_user.email;
        const newPassword = passGenerator.generatePassword();
        try {
            await User.updateOne({ email }, { password: newPassword });
            Mailer.sendPasswordChangedEmail(email, newPassword);
            await Temp_User.deleteMany({ email });
            res.cookie('token', { maxAge: 1 });
            // res.redirect('/signin')
            res.status(302).json({message: "change password confirmation successful - redirecting to signin page"})
        } catch (err) {
            console.log(err)
            res.status(500).json({error: "server error, password couldn't be changed"})
        }
    }
    else {
        res.status(400).json({error: "id invalid, temp_user couldn't be found - try requesting password change again"})
    }
}

module.exports = { get_signin, post_signin, get_signup, post_signup, get_signupConfirmation, post_signupConfirmation,
    get_changePassword, post_changePassword, get_changePasswordConfirmation, post_changePasswordConfirmation };