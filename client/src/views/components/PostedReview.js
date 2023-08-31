import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import DeleteReviewButton from './DeleteReviewButton.js';

export default function PostedReview({ reviewid, setLoading }) {

    //STATE FOR HANDLING REVIEW OBJECT
    const [reviewObject, setReviewObject] = useState(null);


    //USENAVIGATE HOOK
    let navigate = useNavigate();


    //USEEFFECT FETCHES REVIEW OBJECT FROM DATABASE
    const fetchReviewInfo = async () => {
        fetch(`http://localhost:3001/profile/getreview/${reviewid}`, {
                method: 'get',
                credentials: 'include',
            })
            .then(result => result.json())
            .then (data => {
                setReviewObject(data.review);
            })
    }
    useEffect(() => {
        if (reviewid !== "null" && reviewid !== null)
        {
            fetchReviewInfo();
        }
    }, [])


    //CLICK FUNCTIONS
    const { userid } = useParams();
    const handleDeleteReview = async () => {
        setLoading(true)
        fetch(`http://localhost:3001/profile/${userid}`, {
                method: 'post',
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({request: "review-delete", reviewid, userid})
            })
        .then((response) => {
            setLoading(false)
            navigate(0)
        })
    }

    const handleClickReview = () => {
        navigate(`/courses/${reviewObject.courseCode}`)
    }


    //RETURNED COMPONENT
    return (
        <div className="profile-postedReview">
            {(reviewObject !== null) ?
            <>
                <span className="profile-postedReview-bodycontainer">
                    <span className="profile-postedReview-titleAndIconFlexbox">
                        <h4 className="profile-postedReview-title" onClick={handleClickReview}>
                            {reviewObject.title}
                        </h4>
                        <DeleteReviewButton deletereview={handleDeleteReview}/>
                    </span>
                    <p>{reviewObject.courseCode.substring(0,2)}:{reviewObject.courseCode.substring(2,5)}:{reviewObject.courseCode.substring(5)}</p>
                </span>
            </>
            : null}
        </div>
    );
}