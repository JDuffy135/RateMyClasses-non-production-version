import { useState, useEffect } from 'react';

export default function DisplayedReview({ title, professor, grade, review, date, ratingValues }) {

//RATINGBOX STATES
const [difficultyBox, setDifficultyBox] = useState('reviews-ratingBox-red');
const [homeworkBox, setHomeworkBox] = useState('reviews-ratingBox-red');
const [interestBox, setInterestBox] = useState('reviews-ratingBox-red');
const [usefulnessBox, setUsefulnessBox] = useState('reviews-ratingBox-red');


//COLOR VARIABLES & DISPLAYED DATE
let difficultyColor = '';
let homeworkColor = '';
let interestColor = '';
let usefulnessColor = '';


//SETTING RATING BOX COLOR
const setRatingBoxVColors = () => {
    //DIFFICULTY SWITCH
    switch (ratingValues[0]) {
        case 5:
            difficultyColor = 'red';
            break;
        case 4:
            difficultyColor = 'orange';
            break;
        case 3:
            difficultyColor = 'yellow';
            break;
        case 2:
            difficultyColor = 'blue';
            break;
        case 1:
            difficultyColor = 'green';
            break;
    }
    //HOMEWORK SWITCH
    switch (ratingValues[1]) {
        case 5:
            homeworkColor = 'red';
            break;
        case 4:
            homeworkColor = 'orange';
            break;
        case 3:
            homeworkColor = 'yellow';
            break;
        case 2:
            homeworkColor = 'blue';
            break;
        case 1:
            homeworkColor = 'green';
            break;
    }
    //INTEREST SWITCH
    switch (ratingValues[2]) {
        case 5:
            interestColor = 'green';
            break;
        case 4:
            interestColor = 'blue';
            break;
        case 3:
            interestColor = 'yellow';
            break;
        case 2:
            interestColor = 'orange';
            break;
        case 1:
            interestColor = 'red';
            break;
    }
    //USEFULNESS SWITCH
    switch (ratingValues[3]) {
        case 5:
            usefulnessColor = 'green';
            break;
        case 4:
            usefulnessColor = 'blue';
            break;
        case 3:
            usefulnessColor = 'yellow';
            break;
        case 2:
            usefulnessColor = 'orange';
            break;
        case 1:
            usefulnessColor = 'red';
            break;
    }
    //RATINGBOX STATE ADJUSTMENTS
    setDifficultyBox(`reviews-ratingBox-${difficultyColor}`)
    setHomeworkBox(`reviews-ratingBox-${homeworkColor}`)
    setInterestBox(`reviews-ratingBox-${interestColor}`);
    setUsefulnessBox(`reviews-ratingBox-${usefulnessColor}`);
}
useEffect(() => {
    setRatingBoxVColors();
}, [])



//RETURNED COMPONENT
    return (
        <div className="reviews-displayedReviewContainer">
            <p>Review Title</p>
            <div className="reviews-titleContainer">
                <h2>{title}</h2>
            </div>

            <div className="reviews-professorAndGradeTopText-flexbox">
                <p className="reviews-professorAndGradeTopText-text">Professor</p>
                <p className="reviews-professorAndGradeTopText-text">Grade</p>
            </div>
            <div className="reviews-professorAndGrade-flexbox">
                <div className="reviews-professorAndGrade">{professor}</div>
                <div className="reviews-professorAndGrade">{grade}</div>
            </div>

            <div className="reviews-reviewTopText-flexbox">
                <p>Review</p>
            </div>
            <div className="reviews-review-flexbox">
                <div className="reviews-review">
                    <div className="reviews-reviewText">{review}</div>
                </div>
            </div>

            <div className="reviews-ratings-flexbox">
                <div className="reviews-ratingsText-flexbox">
                    <p>Difficulty</p>
                    <p>Homework</p>
                    <p>Interest</p>
                    <p>Usefulness</p>
                </div>
                <div className="reviews-ratingBoxes-flexbox">
                    <div className={difficultyBox}>
                        <h2>{ratingValues[0]}</h2>
                    </div>
                    <div className={homeworkBox}>
                        <h2>{ratingValues[1]}</h2>
                    </div>
                    <div className={interestBox}>
                        <h2>{ratingValues[2]}</h2>
                    </div>
                    <div className={usefulnessBox}>
                        <h2>{ratingValues[3]}</h2>
                    </div>
                </div>
            </div>
            <p className="reviews-date">{date.split(' ')[1]} {date.split(' ')[2]}, {date.split(' ')[3]}</p>
        </div>
    );
}