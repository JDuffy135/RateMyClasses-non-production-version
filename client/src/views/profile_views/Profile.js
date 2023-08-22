import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import profilelogo from '../../images/profilelogo.png';
import NavbarNoProfile from '../components/NavbarNoProfile.js';
import PostedReview from '../components/PostedReview.js';
import DeleteProfileAlert from '../components/DeleteProfileAlert.js';

export default function Profile() {

    //STATES
    const [postedReviews, setPostedReviews] = useState([]);
    const [showAlert, setShowAlert] = useState(false);


    //USENAVIGATE HOOK
    let navigate = useNavigate();


    //RETRIEVE ARRAY OF POSTED REVIEWS & REDIRECT IF NOT AUTHORIZED
    const { userid } = useParams();
    useEffect(() => {
        const fetchReviewsArray = async () => {
            const result = await fetch(`http://localhost:3001/profile/${userid}`, {
                    method: 'get',
                    credentials: 'include'
                })
            result.json().then(data => {
                if (data.error) {
                    navigate('/')
                }
                const reviews = data.reviewArray;
                setPostedReviews(reviews)
            })
        }
        fetchReviewsArray();
    }, []);


    //CLICK FUNCTIONS
    const handleLogout = () => {
        fetch(`http://localhost:3001/profile/${userid}`, {
                method: 'post',
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({request: "logout"})
            })
            .then((result) => navigate('/'))
    }

    const handleDeleteProfileAlert = () => {
        setShowAlert(true);
    }

    const handleDeleteProfileCancel = () => {
        setShowAlert(false);
    }

    const handleDeleteProfileConfirm = async () => {
        fetch(`http://localhost:3001/profile/${userid}`, {
                method: 'delete',
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({deleteRequest: "NO"})
            })
            .then((result) => navigate('/'))
    }

    const handleDeleteProfileConfirmAndDelete = async () => {
        fetch(`http://localhost:3001/profile/${userid}`, {
                method: 'delete',
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({deleteRequest: "YES"})
            })
            .then((result) => navigate('/'))
    }
    

    //RETURNED COMPONENT
    return (
        <>
            <div className="profile-bg"></div>

            <NavbarNoProfile/>

            <div className="profile-sidebar-container">
                <div className="profile-sidebar">
                    <img src={profilelogo}></img>
                    <div className="profile-sidebar-profiletext">PROFILE PAGE</div>
                    <div className="profile-sidebar-gap"></div>
                    <div className="profile-sidebar-wordcontainer">
                        <span className="profile-sidebar-text" onClick={handleLogout}>Logout</span>
                        <span className="profile-sidebar-text" onClick={handleDeleteProfileAlert}>Delete Profile</span>
                    </div>
                </div>
            </div>

            {(showAlert !== false) ? 
            <DeleteProfileAlert
                cancel={handleDeleteProfileCancel}
                confirm={handleDeleteProfileConfirm}
                confirmAndDelete={handleDeleteProfileConfirmAndDelete}
            /> 
            : null}

            <div className="profile-postedReview-container">
                <div className="profile-postedReview-textbox">
                    <h1>{postedReviews.length}/8 reviews posted</h1>
                </div>
                <div className="profile-postedReview-reviewContainer">
                        {postedReviews.map((review, index) => {
                            return (<PostedReview key={index} reviewid={review}/>);
                        })}
                </div>
            </div>

            <div className="footer">
                <div className="about-text" onClick={() => navigate('/about')}>about page</div>
            </div>
        </>
    );
}