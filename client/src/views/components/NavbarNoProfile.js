import { useNavigate } from 'react-router-dom';

export default function NavbarNoProfile() {

    //USENAVIGATE HOOK
    let navigate = useNavigate();


    //RETURNED COMPONENT
    return (
        <div className="navbar">
                <span className="logo" onClick={() => navigate('/')}></span>
        </div>
    )
}