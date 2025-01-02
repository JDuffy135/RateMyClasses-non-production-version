const mongoose = require('mongoose');
const Course = require('./course.js');

const reviewSchema = new mongoose.Schema({
    courseCode: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    title: {
        type: String,
        maxLength: 50,
        default: 'my course review',
        required: true
    },
    professor: {
        type: String,
        maxLength: 30,
        default: 'unknown',
        required: true
    },
    grade: {
        type: String,
        minLength: 1,
        default: 'not sure',
        required: true
    },
    review: {
        type: String,
        minLength: 100,
        maxLength: 1200,
        required: true,
        unique: true
    },
    date: {
        type: String,
        // default: Date(Date.now()).toString()
        default: Date(Date.now())
    },
    ratingValues: {
        type: Array,
        default: [0, 0, 0, 0, 0],
        required: true
    }
})


//Update the ratingValues totals (increment) of the associated course when a review is added to the database
reviewSchema.post('save', async function() {
    const incrementValues = this.toJSON().ratingValues;
    const courseCode = this.toJSON().courseCode;

    try {
        const course = await Course.findOne({ courseCode })
        let newRatingValues = course.ratingValues;
        newRatingValues[0] += incrementValues[0];
        newRatingValues[1] += incrementValues[1];
        newRatingValues[2] += incrementValues[2];
        newRatingValues[3] += incrementValues[3];
        newRatingValues[4] += 1;
        await Course.updateOne({ courseCode }, { ratingValues: newRatingValues });
    } catch (err) {
        console.log(err)
        await Review.findOneAndDelete({ _id: this.toJSON()._id })
        return;
    }
})

//Update the ratingValues totals (decrement) of the associated course when a review is deleted from the database
//and deletes the course from the database if there are 0 reviews
reviewSchema.post('deleteOne', { document: true, query: false }, async function(req, res) {
    const decrementValues = this.toJSON().ratingValues;
    const courseCode = this.toJSON().courseCode;

    try {
        const course = await Course.findOne({ courseCode })
        let newRatingValues = course.ratingValues;
        newRatingValues[0] -= decrementValues[0];
        newRatingValues[1] -= decrementValues[1];
        newRatingValues[2] -= decrementValues[2];
        newRatingValues[3] -= decrementValues[3];
        newRatingValues[4] -= 1;
        if (newRatingValues[0] <= 0 && newRatingValues[4] <= 0) {
            await Course.findOneAndDelete({ courseCode })
        } else {
            await Course.updateOne({ courseCode }, { ratingValues: newRatingValues });
        }
    } catch (err) {
        console.log(err);
    }
})


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;