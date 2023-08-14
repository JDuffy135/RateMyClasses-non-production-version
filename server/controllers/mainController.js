const express = require('express');
const User = require('../models/user.js')
const Course = require('../models/course.js');
const Review = require('../models/review.js');


//FUNCTIONS
/* NOTE: might need to make some of these regular functions to use the "this" keyword */
const get_home = (req, res) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.JWT_STRING, (err, decodedToken) => {
            if (err) {
                res.status(200).json({isSignedIn: false})
            } else {
                res.status(200).json({isSignedIn: true})
            }
        })
    } else {
        res.status(200).json({isSignedIn: false})
    }
}

const get_about = (req, res) => {
    res.status(200).json({message: "about page GET successful"})
}

const get_courses = async (req, res) => {
/* sends an array of all courses in the database to the frontend */

    Course.find()
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({error: "couldn't access courses"})
    })
}

const post_courses = async (req, res) => {
    /* receives a coursecode value from searchbar on the frontend, then redirects
    the user to that course's page (if course code exists in the database) */

    const { courseCode } = req.body;
    const course = await Course.findOne({ courseCode })
    if (course != null) {
        res.redirect(`/courses/${courseCode}`)
    } else {
        console.log(err);
        res.status(400).json({error: "course couldn't be found (no reviews have been submitted for the entered course yet)"})
    }
}

const get_courseReviews = async (req, res) => {
    /* extracts course code from the URL request ('/courses/:id'), then searches for and returns
    all reviews containing the given course code */

    const courseCode = req.params.id;
    Review.find({ courseCode })
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json({error: "course not found"})
    })
}


//--------- PROTECTED ROUTES ---------//

const get_reviewForm = async (req, res) => {
    res.status(200).json({message: "review form page GET successful"})
}

const post_reviewForm = async (req, res) => {
    //extracting payload from JWT to access user's _id value + redirect if user not logged in
    const token = req.cookies.token;
    const jwtpayload = JSON.parse(atob(token.split('.')[1]));
    const userid = jwtpayload.id;
    const user = await User.findById(userid);

    //creating review document and adding _id value to user's "postedReviews" array
    const { courseCode, title, professor, review, ratingValues } = req.body;
    let flag = 0;
    if (await Course.findOne({ courseCode }) == null) {
        try {
            await Course.create({
                courseCode,
                ratingValues: [0, 0, 0, 0, 0]
        })
        } catch (err) {
            console.log(err);
            res.status(500).json({error: "course couldn't be added to database - check to make sure course code is correct (8 digits, no colons)"})
            flag = 1;
        }
    }

    if (flag != 1) {
        try {
            await Review.create({
                courseCode,
                title,
                professor,
                review,
                ratingValues
            })
            const newReview = await Review.findOne({ title, review });
            await User.findByIdAndUpdate(user._id, { postedReviews: [...user.postedReviews, newReview._id] })
            res.redirect(`/courses/${courseCode}`)
        } catch (err) {
            console.log(err);
            res.status(400).json({error: "review couldn't be added to database - course code must be an 8 digit number, review must be between 50 and 400 characters, title cant be over 50 characters, and professor can't be over 30 characters"})
        }
    }
}

module.exports = { get_home, get_about, get_courses, post_courses, get_courseReviews, get_reviewForm, post_reviewForm };