const express = require('express');
const User = require('../models/user.js');
const Review = require('../models/review.js');


//FUNCTIONS
/* NOTE: might need to make some of these regular functions to use the "this" keyword */

const get_userid = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({error: "user couldn't be authorzed"})
    }
    try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        const userid = decoded.id;
        return res.status(302).json({message: "userid retrieved - redirecting to profile page", userid})
    } catch (err) {
        return res.status(401).json({error: "user couldn't be authorzed"})
    }
}

const get_profile = async (req, res) => {
    /* sends a list of all the reviews written by the user */
    const userid = req.params.userid;
    let user = null;
    try {
        user = await User.findById(userid);
    } catch (err) {
        return res.status(500).json({error: "ERROR: couldn't load user's posted reviews"})
    }

    let reviewArray = [];
    user.postedReviews.forEach((review) => {
        reviewArray.push(review);
    })
    return res.status(200).json({reviewArray, message: "user's posted reviews retrieved"});
}

const post_profile = async (req, res) => {
    /* switch case that handles logout, password change, and reviews redirect */
    const { request } = req.body;
    switch(request) {
        case "logout":
            // res.cookie('token', { maxAge: 1 });
            res.clearCookie('token');
            return res.status(302).json({message: "user logged out - redirecting to signin page"})
        case "change-password":
            return res.status(302).json({message: "redirecting to change password page"})
        case "review-delete":
            const { reviewid, userid } = req.body;
            const deletion = await delete_profileReview(reviewid, userid);
            if (deletion === true) {
                return res.status(200).json({message: "review deleted"})
            } else {
                return res.status(500).json({error: "server error, delete review failed"})
            }
    }

    return res.status(500).json({error: "server error"})
}

const delete_profile = async (req, res) => {
    /* deletes user's reviews (if prompted) and user document from the database + deletes jwt from browser*/
    const deleteRequest = req.body.deleteRequest;
    const userid = req.params.userid;
    let user = null;
    try {
        user = await  User.findById(userid);
    } catch (err) {
        return res.status(500).json({error: "server error, profile failed to delete"})
    }

    try {
        if (deleteRequest == "YES") {
            await deleteAllReviews(user.postedReviews);
        }
        await user.deleteOne();
        // res.cookie('token', { maxAge: 1 });
        res.clearCookie('token');
        return res.status(302).json({message: "profile successfully deleted - redirecting to home page"})
    } catch (err) {
        return res.status(500).json({error: "server error, profile failed to delete"})
    }
}

const get_profileReview = async (req, res) => {
    const reviewid = req.params.reviewid;
    let review = null;
    try {
        const review = await Review.findById(reviewid);
        return res.status(200).json({message: "retrieved review info", review})
    } catch (err) {
        return res.status(500).json({error: "ERROR: server error, couldn't retrive review info"})
    }
}


//--------- HELPER FUNCTIONS --------->

const delete_profileReview = async (reviewid, userid) => {
    /* deletes specified review from the database and from the user's "postedReviews" array
    (also fires the post deleteOne() hook in the Review model, which decrements the "ratingValues" array for the review's course) */
    try {
        const review = await Review.findById(reviewid);
        await review.deleteOne();
        const user = await User.findById(userid);
        let updatedPostedReviews = deleteReview(reviewid, user.postedReviews);
        await User.findByIdAndUpdate(userid, { postedReviews: updatedPostedReviews });
        return true;
    } catch (err) {
        return false;
    }
}

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

module.exports = { get_userid, get_profile, post_profile, delete_profile, get_profileReview };