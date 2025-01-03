const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js')
const Course = require('../models/course.js');
const Review = require('../models/review.js');


//FUNCTIONS
/* NOTE: might need to make some of these regular functions to use the "this" keyword */
const get_home = (req, res) => {
    const token = req.cookies.token;
    jwt.verify(token, process.env.JWT_STRING, (err, decodedToken) => {
        if (err) {
            res.status(200).json({isSignedIn: false, message: "user authorization checked"})
        } else {
            res.status(200).json({isSignedIn: true, message: "user authorization checked"})
        }
    })
}

// const get_about = (req, res) => {
//     res.status(200).json({message: "about page GET successful"})
// }

const get_courses = async (req, res) => {
/* sends an array of all courses in the database to the frontend */

    Course.find()
    .then((result) => {
        res.status(200).json({courses: result, message: "courses retrieved"})
    })
    .catch((err) => {
        res.status(500).json({error: "server error, couldn't access courses"})
    })
}

const post_courses = async (req, res) => {
    /* receives a coursecode value from searchbar on the frontend, then redirects
    the user to that course's page (if course code exists in the database) */

    const { courseCode } = req.body;
    const course = await Course.findOne({ courseCode })
    if (course != null) {
        // res.redirect(`/courses/${courseCode}`)
        res.status(302).json({message: "course page found - redirecting", courseCode})
    } else {
        res.status(500).json({error: "SERVER ERROR: couldn't be redirected"})
    }
}

const get_courseReviews = async (req, res) => {
    /* extracts course code from the URL request ('/courses/:id'), then searches for and returns
    all reviews containing the given course code */

    const courseCode = req.params.id;
    try {
        const reviews = await Review.find({ courseCode })
        const course = await Course.findOne({ courseCode })
        res.status(200).json({reviews, course, message: "course reviews found"});
    } catch (err) {
        return res.status(400).json({error: "course page not found"})
    }
}


//--------- PROTECTED ROUTES ---------//

// const get_reviewForm = async (req, res) => {
//     res.status(200).json({message: "review form page GET successful"})
// }

const post_reviewForm = async (req, res) => {
    //extracting payload from JWT to access user's _id value + redirect if user not logged in
    const token = req.cookies.token;
    const jwtpayload = JSON.parse(atob(token.split('.')[1]));
    const userid = jwtpayload.id;
    let user = null;
    try {
        user = await User.findById(userid);
    } catch (err) {
        return res.status(401).json({error: "ERROR: user couldn't be authorized"})
    }

    //making sure user hasn't reached max amount of reviews
    if (user.postedReviews.length >= 8)
    {
        return res.status(400).json({error: "ERROR: max reviews posted"})
    }

    //testing to make sure courseCode is valid
    const { courseCode, title, professor, grade, review, ratingValues } = req.body;
    if (/^[0-9]+$/.test(courseCode) != true || courseCode.length != 8) {
        return res.status(400).json({error: "invalid course code"})
    }

    //making sure user hasn't already posted a review for the course
    let currentReview = {courseCode: []};
    for (let i = 0 ; i < user.postedReviews.length ; i++)
    {
        try {
            currentReview = await Review.findById(user.postedReviews[i])
        } catch (err) {
            return res.status(500).json({error: "SERVER ERROR: try again"})
        }

        if (courseCode == currentReview.courseCode)
        {
            return res.status(422).json({error: "user already posted review for this course"})
        }
    }


    //creates course in database if not already present
    if (await Course.findOne({ courseCode }) == null) {
        try {
            await Course.create({
                courseCode,
                ratingValues: [0, 0, 0, 0, 0],
                beingUpdated: "NO"
            })
        } catch (err) {
            return res.status(500).json({error: "SERVER ERROR: try again"})
        }
    }


    //checking to see if course is already being updated in database (to avoid issues with people posting reviews simultaneously)
    let course = null;
    try {
        course = await Course.findOne({ courseCode });
        if (course.beingUpdated !== "NO" && course.beingUpdated !== userid && course.ratingValues[4] != 0)
        {
            return res.status(500).json({error: "SERVER ERROR: course already being updated - wait a moment and try again"})
        } else {
            await Course.updateOne({ courseCode }, { beingUpdated: userid })
        }
    } catch (err) {
        return res.status(500).json({error: "SERVER ERROR: try again"})
    }


    //creating review, updating course ratingValues and user's postedReviews array, and 
    //setting course "beingUpdated" value back to false
    try {
        course = await Course.findOne({ courseCode });
    } catch (err) {
        return res.status(500).json({error: "SERVER ERROR: try again"})
    }

    if (course.beingUpdated == userid) {
        try {
            await Review.create({
                courseCode,
                title,
                professor,
                grade,
                review,
                ratingValues
            })
            const newReview = await Review.findOne({ courseCode, title, review });
            await User.findByIdAndUpdate(user._id, { postedReviews: [...user.postedReviews, newReview._id] })
            await Course.updateOne({ courseCode }, { beingUpdated: "NO" })
            res.status(302).json({message: "review successfully added to database - redirecting to course page", courseCode})
        } catch (err) {
            res.status(400).json({error: "review couldn't be added to database - check to make sure all fields are entered correctly and course review has at least 100 characters"})
        }
    } else {
        return res.status(500).json({error: "SERVER ERROR: wait a moment and try again"})
    }
}

module.exports = { get_home, get_courses, post_courses, get_courseReviews, post_reviewForm };

// module.exports = { get_home, get_about, get_courses, post_courses, get_courseReviews, get_reviewForm, post_reviewForm };