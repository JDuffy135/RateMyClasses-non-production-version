import { useEffect } from 'react';
import { checkIfSignedIn } from '../../helper_methods/signinCheck';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

    //USEEFFECT HOOK TO DETERMINE IF USER IS LOGGED IN
    let isSignedIn = false;
    useEffect(() => {
        async function checkSignin() {
            isSignedIn = await checkIfSignedIn();
        }
        checkSignin();
    }, []);


    //USENAVIGATE HOOK
    let navigate = useNavigate();


    //RETURNED COMPONENT
    return (
        <div className="navbar">
                <span className="logo" onClick={() => navigate('/')}></span>
                
                {isSignedIn ? <span className="profile-logo" onClick={() => navigate('/profile')}></span> : 
                <>
                    <span className="signin-text" onClick={() => navigate('/signin')}>signin</span>
                    <span className="signup-text" onClick={() => navigate('/signup')}>signup</span>
                </>}
        </div>
    )
}