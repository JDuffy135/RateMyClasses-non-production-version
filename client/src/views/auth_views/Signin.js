import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarNoProfile from '../components/NavbarNoProfile.js';

export default function Signin() {

    //STATE HANDLING FOR INPUT DATA
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);


    //USENAVIGATE HOOK
    let navigate = useNavigate();


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
                        {showError ? <div className="authform-errormessage">ERROR: invalid credentials</div> : null}
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