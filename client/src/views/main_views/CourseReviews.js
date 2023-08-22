import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import DisplayedReview from '../components/DisplayedReview.js';

export default function CourseReviews() {

    //STATES
    const [reviews, setReviews] = useState([]);
    const [courseRatingsArray, setCourseRatingsArray] = useState([]);
    const [showError, setShowError] = useState(false);


    //USEEFFECT HOOK TO RETRIEVE COURSE INFO AND FILL REVIEWS STATE ARRAY
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
                    setCourseRatingsArray(data.course.ratingValues)
                    setReviews(data.reviews)
                } else {
                    setShowError(true);
                }
            })
            .catch(error => {
                setShowError(true);
            })
        }
        fetchData();
    }, [])


    //RETURNED COMPONENT
    return (
        <>
            <Navbar />


            <div className="reviews-bg"></div>


            <div className="reviews-sidebar">
                <div className="reviews-sidebar-container">
                    <h1>{id.substring(0,2)}:{id.substring(2,5)}:{id.substring(5)}</h1>
                    <div className="reviews-statsContainer">

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
        </>
    );
}