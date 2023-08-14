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
        default: 'my course review'
    },
    professor: {
        type: String,
        maxLength: 30,
        default: '',
    },
    review: {
        type: String,
        minLength: 50,
        maxLength: 400,
        required: true,
        unique: true
    },
    date: {
        type: String,
        default: Date(Date.now()).toString()
    },
    ratingValues: {
        type: Array,
        default: [0, 0, 0, 0, 0]
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
        console.log(err);
    }
})

//Update the ratingValues totals (decrement) of the associated course when a review is deleted from the database
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
        await Course.updateOne({ courseCode }, { ratingValues: newRatingValues });
    } catch (err) {
        console.log(err);
    }
})


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;