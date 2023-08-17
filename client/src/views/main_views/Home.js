import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.js';

export default function Home() {

    //USENAVIGATE HOOK
    let navigate = useNavigate();


    //RETURNED COMPONENT
    return (
        <div>
            <div className="home-bg"></div>

            <Navbar/>

            <div className="home-buttonSectionContainer">
                <div className="home-buttonSection">
                    <button className="home-button" onClick={() => navigate('/courses')}>SEARCH COURSES</button>
                    <p className="home-paragraph">
                    Search for classes and reviews already submitted to the database. No login necessary.
                    </p>
                </div>
                <div className="home-buttonSection">
                    <button className="home-button" onClick={() => navigate('/review')}>WRITE A REVIEW</button>
                    <p className="home-paragraph">
                    Write a review for a class whether it already exists in the database or not. Login required.
                    </p>
                </div>
            </div>
            
            <div className="footer">
                <div className="about-text" onClick={() => navigate('/about')}>about page</div>
            </div>
        </div>
    );
}