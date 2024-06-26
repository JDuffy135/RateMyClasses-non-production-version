import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarNoProfile from '../components/NavbarNoProfile.js';
import { checkIfSignedIn } from '../../helper_methods/signinCheck.js';

export default function Signin() {

    //STATE HANDLING FOR INPUT DATA
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    //USENAVIGATE HOOK + CHECK IF USER SIGNED IN
    let navigate = useNavigate();

    // const waitForSigninCheck = async () => {
    //     const isSignedIn = await checkIfSignedIn();
    //     if (isSignedIn !== false) {
    //         navigate('/')
    //     }
    // }
    // waitForSigninCheck();



    //FUNCTION FOR SUBMITTING INPUT FIELDS
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = { email, password };
        fetch('http://localhost:3001/signin', {
            method: "post",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(data)
        }).then((response) => response.json())
        .then(response => {
            if (response.message) {
                setShowError(false);
                navigate('/');
            } else {
                setShowError(true);
                setErrorMessage(response.error)
            }
        })
    }


    //RETURNED COMPONENT
    return (
        <>
            <div className="auth-bg"></div>

            <NavbarNoProfile/>

            <div className="authform-flexbox">
                <div className="authform">
                    <form onSubmit={handleSubmit}>
                        <h3>SIGN IN FORM</h3>
                        <label>Email</label>
                        <input 
                            type="text"
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                            required
                        />
                        <label>Password</label>
                        <input 
                            type="text"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                            required
                        />
                        {showError ? <div className="authform-errormessage">ERROR: {errorMessage}</div> : null}
                        <button>Signin</button>
                    </form>
                    <div className="authform-bottomtext-flexbox">
                        <span className="authform-bottomtext" onClick={() => navigate('/signup')}>Sign up</span>
                        <span className="authform-bottomtext" onClick={() => navigate('/change-password')}>Change password</span>
                    </div>
                </div> 
            </div>

            <div className="footer">
                <div className="about-text" onClick={() => navigate('/about')}>about page</div>
            </div>
        </>
    );
}