const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseCode: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true,
        unique: true
    },
    ratingValues: {
        type: Array,
        default: [0, 0, 0, 0, 0]
    }
})

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;