import { useEffect, useState } from 'react';
import { checkIfSignedIn } from '../../helper_methods/signinCheck';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

    //USEEFFECT & USESTATE HOOKS TO DETERMINE IF USER IS LOGGED IN
    const [userSignedIn, setUserSignedIn] = useState(false);
    useEffect(() => {
        async function checkSignin() {
            let isSignedIn = await checkIfSignedIn();
            if (isSignedIn !== false) {
                setUserSignedIn(isSignedIn);
            }
        }
        checkSignin();
    }, []);


    //USENAVIGATE HOOK
    let navigate = useNavigate();


    //RETURNED COMPONENT
    return (
        <div className="navbar">
                <span className="logo" onClick={() => navigate('/')}></span>
                
                {userSignedIn === true ? <span className="profile-logo" onClick={() => navigate('/profile')}></span> : 
                <>
                    <span className="signin-text" onClick={() => navigate('/signin')}>signin</span>
                    <span className="signup-text" onClick={() => navigate('/signup')}>signup</span>
                </>}
        </div>
    )
}