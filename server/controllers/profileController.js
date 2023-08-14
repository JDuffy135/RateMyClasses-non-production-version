const express = require('express');
const User = require('../models/user.js');
const Review = require('../models/review.js');


//FUNCTIONS
/* NOTE: might need to make some of these regular functions to use the "this" keyword */

const get_userid = async (req, res) => {
    const token = req.cookies.token;
    const decoded = JSON.parse(atob(token.split('.')[1]));
    const userid = decoded.id;
    res.redirect(`/profile/${userid}`);
}

const get_profile = (req, res) => {
    res.status(200).json({message: "profile GET successful"})
}

const post_profile = (req, res) => {
    /* switch case that handles logout, password change, and reviews redirect */
    const { request } = req.body;
    const userid = req.params.userid;
    switch(request) {
        case "logout":
            res.cookie('token', { maxAge: 1 });
            res.redirect('/signin');
            break;
        case "reviews":
            res.redirect(`/profile/${userid}/reviews`);
            break;
        case "change_password":
            res.redirect('/change-password');
            break;
        default:
            res.status(500).json({error: "invalid argument from client"})
            break;
    }
}

const delete_profile = async (req, res) => {
    /* deletes user's reviews (if prompted) and user document from the database + deletes jwt from browser*/
    const deleteRequest = req.body.deleteRequest;
    const userid = req.params.userid;
    const user = await  User.findById(userid);
    try {
        if (deleteRequest == "YES") {
            await deleteAllReviews(user.postedReviews);
        }
        await user.deleteOne();
        res.cookie('token', { maxAge: 1 });
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "profile delete failed"})
    }
}

const get_profileReviews = async (req, res) => {
    /* sends a list of all the reviews written by the user */
    const userid = req.params.userid;
    try {
        const user = await User.findById(userid);
        let reviewArray = [];
        user.postedReviews.forEach((review) => {
            reviewArray.push(review);
        })
        res.status(200).send(reviewArray);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "profile reviews couldn't be accessed"})
    }
}

const delete_profileReview = async (req, res) => {
    /* deletes specified review from the database and from the user's "postedReviews" array
    (also fires the post deleteOne() hook in the Review model, which decrements the "ratingValues" array for the review's course) */
    const userid = req.params.userid;
    const { reviewid } = req.body;
    try {
        const review = await Review.findById(reviewid);
        await review.deleteOne();
        const user = await User.findById(userid);
        let updatedPostedReviews = deleteReview(reviewid, user.postedReviews);
        await User.findByIdAndUpdate(userid, { postedReviews: updatedPostedReviews });
        res.redirect(`/profile/reviews/${userid}`);
    } catch (err) {
        /* CUSTOM ERROR HANDLING GOES HERE - couldn't delete review */
        console.log(err);
        res.status(500).json({error: "delete review failed"})
    }
}


//--------- HELPER FUNCTIONS --------->

const deleteReview = function (reviewid, reviewArray) {
    let newArray = [];
    reviewArray.forEach((review) => {
        if (review != reviewid) {
            newArray.push(review);
        }
    })
    return newArray;
}

//NOTE: doesn't actually delete reviews from the database, it just replaces the review text
const deleteAllReviews = async function (reviewArray) {
    for (let i = 0; i < reviewArray.length; i++) {
        let review = await Review.findById(reviewArray[i]._id);
        await review.deleteOne();
    }
}

module.exports = { get_userid, get_profile, post_profile, delete_profile, get_profileReviews, delete_profileReview };