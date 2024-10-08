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
    const [loading, setLoading] = useState(false);


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
                body: JSON.stringify({request: "logout", reviewid: null, userid})
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
        setLoading(true)
        fetch(`http://localhost:3001/profile/${userid}`, {
                method: 'delete',
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({deleteRequest: "NO"})
            })
            .then((result) => navigate('/'))
    }

    const handleDeleteProfileConfirmAndDelete = async () => {
        setLoading(true)
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
            {(loading === true) ? <div className="loadingscreen">Loading...</div> : null}

            <div className="profile-bg"></div>

            <NavbarNoProfile/>

            {(showAlert !== false) ? 
            <DeleteProfileAlert
                cancel={handleDeleteProfileCancel}
                confirm={handleDeleteProfileConfirm}
                confirmAndDelete={handleDeleteProfileConfirmAndDelete}
            /> 

            : 
            
            <div className="profile-sidebar-container">
                <div className="profile-sidebar">
                    <span className="profile-sidebar-iconAndTextFlexbox">
                        <img src={profilelogo}></img>
                        <div className="profile-sidebar-profiletext">PROFILE PAGE</div>
                    </span>
                    <span className="profile-sidebar-wordcontainer">
                        <span className="profile-sidebar-text" onClick={handleLogout}>Logout</span>
                        <span className="profile-sidebar-text" onClick={handleDeleteProfileAlert}>Delete Profile</span>
                    </span>
                </div>
            </div>

            }

            <div className="profile-postedReview-flexbox">
                <div className="profile-postedReview-container">
                    <div className="profile-postedReview-textbox">
                        <h1>{postedReviews.length}/8 reviews posted</h1>
                    </div>
                    <div className="profile-postedReview-reviewContainer">
                            {(postedReviews.length >= 1) ? postedReviews.map((review, index) => {
                                return (<PostedReview key={index} reviewid={review} setLoading={setLoading}/>);
                            }) : null}
                    </div>
                </div>
            </div>
        </>
    );
}