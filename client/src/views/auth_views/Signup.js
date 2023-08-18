import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarNoProfile from '../components/NavbarNoProfile.js';

export default function Signup() {

    //STATE HANDLING FOR INPUT DATA
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    
    //USENAVIGATE HOOK
    let navigate = useNavigate();


    //FUNCTION FOR SUBMITTING INPUT FIELDS
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = { email };
        fetch('http://localhost:3001/signup', {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then((response) => response.json())
        .then((response) => {
            if (response.message) {
                setError('');
                navigate('/signup/confirmation');
            } else {
                setError(response.error)
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
                        <h3>SIGN UP FORM</h3>
                        <label>Email</label>
                        <input 
                            type="text"
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                            required
                        />
                        <div className="authform-errormessage">{error}</div>
                        <button>Signup</button>
                    </form>
                    <div className="authform-bottomtext-flexbox">
                        <span className="authform-bottomtext" onClick={() => navigate('/signin')}>Sign in</span>
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