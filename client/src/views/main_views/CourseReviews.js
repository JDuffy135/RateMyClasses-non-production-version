import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import DisplayedReview from '../components/DisplayedReview.js';
import CourseStatusBar from '../components/CourseStatusBar.js';

export default function CourseReviews() {

    //USENAVIGATE HOOK
    let navigate = useNavigate();


    //STATES
    const [reviews, setReviews] = useState([]);
    const [courseRatingsArray, setCourseRatingsArray] = useState([0, 0, 0, 0]);


    //USEEFFECT HOOK TO RETRIEVE COURSE INFO AND FILL STATE ARRAYS
    const updateCourseRatingsArray = (difficulty, homework, interest, usefulness, reviewCount) => {
        let updatedArray = [0, 0, 0, 0];
        /* NOTE: multiplying by 20 because I want values to be out of 100 */
        updatedArray[0] = (difficulty / reviewCount) * 20;
        updatedArray[1] = (homework / reviewCount) * 20;
        updatedArray[2] = (interest / reviewCount) * 20;
        updatedArray[3] = (usefulness / reviewCount) * 20;
        updatedArray[4] = reviewCount;
        setCourseRatingsArray(updatedArray);
    }

    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            fetch(`http://localhost:3001/courses/${id}`, {
                method: 'get',
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    // setCourseRatingsArray(data.course.ratingValues)
                    updateCourseRatingsArray(data.course.ratingValues[0], data.course.ratingValues[1], 
                        data.course.ratingValues[2], data.course.ratingValues[3], data.course.ratingValues[4])
                    setReviews(data.reviews)
                } else {
                    navigate('/404')
                }
            })
            .catch(error => {
                navigate('/404')
            })
        }
        fetchData();
    }, [id])


    //RETURNED COMPONENT
    return (
        <>
            <Navbar />


            <div className="reviews-bg"></div>


            <div className="reviews-sidebar">
                <div className="reviews-sidebar-container">
                    <h1>{id.substring(0,2)}:{id.substring(2,5)}:{id.substring(5)}</h1>
                    <h2>reviews: {courseRatingsArray[4]}</h2>
                    <div className="reviews-statsContainer">
                        <CourseStatusBar stat="difficulty" progressValue={courseRatingsArray[0]} />
                        <CourseStatusBar stat="homework" progressValue={courseRatingsArray[1]} />
                        <CourseStatusBar stat="interest" progressValue={courseRatingsArray[2]} />
                        <CourseStatusBar stat="usefulness" progressValue={courseRatingsArray[3]} />
                    </div>
                </div>
            </div>


            <div className="reviews-container">
                <h1>REVIEWS</h1>
                {reviews.map((currentReview, index) => {
                    return (
                        <DisplayedReview
                            className="reviews-reviewContainer"
                            key={index}
                            title={currentReview.title}
                            professor={currentReview.professor}
                            grade={currentReview.grade}
                            review={currentReview.review}
                            date={currentReview.date}
                            ratingValues={currentReview.ratingValues}
                        />
                    );
                })}
            </div>

            <span className="reviews-back" onClick={() => navigate(-1)}>back to courses</span>
        </>
    );
}