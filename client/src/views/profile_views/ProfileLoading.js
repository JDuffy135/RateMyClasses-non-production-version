import { useNavigate } from 'react-router-dom';
import NavbarNoProfile from '../components/NavbarNoProfile.js';

export default function ProfileLoading() {
        
    //USENAVIGATE HOOK
    let navigate = useNavigate();

    fetch('http://localhost:3001/profile', {
        method: 'get',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(response => {
        if (response.message) {
            navigate(`/profile/${response.userid}`)
        } else {
            navigate('/signin')
        }
    })
    .catch(error => {
        navigate('/signin')
    })

    return (
       <>
            <div className="profile-bg"></div>

            <NavbarNoProfile/>
        </>
    );
}