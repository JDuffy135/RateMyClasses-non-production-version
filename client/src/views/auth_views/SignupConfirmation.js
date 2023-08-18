import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarNoProfile from '../components/NavbarNoProfile.js';

export default function SignupConfirmation() {

    //STATE HANDLING FOR INPUT DATA
    const [id, setId] = useState('');
    const [error, setError] = useState('');

    
    //USENAVIGATE HOOK
    let navigate = useNavigate();


    //FUNCTION FOR SUBMITTING INPUT FIELDS
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = { id };
        fetch('http://localhost:3001/signup/confirmation', {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then((response) => response.json())
        .then((response) => {
            if (response.message) {
                setError('');
                navigate('/signin');
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
                        <h3>SIGN UP CONFIRMATION</h3>
                        <label>Enter id value from email</label>
                        <input 
                            type="text"
                            value={id}
                            onChange={(e) => {setId(e.target.value)}}
                            required
                        />
                        <div className="authform-errormessage">{error}</div>
                        <button>Confirm</button>
                    </form>
                </div> 
            </div>

            <div className="footer">
                <div className="about-text" onClick={() => navigate('/about')}>about page</div>
            </div>
        </>
    );
}