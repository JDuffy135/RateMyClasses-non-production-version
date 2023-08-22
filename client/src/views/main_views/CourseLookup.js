import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import DisplayedCourse from '../components/DisplayedCourse.js';

export default function CourseLookup() {

    //STATES
    const [searchBy, setSearchBy] = useState('course code'); /* either "course code" or "department code" - changed with a dropdown */
    const [enteredCode, setEnteredCode] = useState('');
    const [courses, setCourses] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [showError, setShowError] = useState(false);


    //USEEFFECT THAT GRABS THE COURSES FROM THE DATABASE
    useEffect(() => {
        const fetchCourses = async () => {
            fetch('http://localhost:3001/courses', {
                method: 'get',
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    setCourses(data.courses)
                    setSearchResults(data.courses)
                } else {
                    setShowError(true)
                }
            })
            .catch(error => {
                setShowError(true)
            })
        }
        fetchCourses();
    }, [])


    //FORM FUNCTIONS
    const handleSubmit = (e) => {
        e.preventDefault();

        let displayedCourses = [];
        if (searchBy == 'course code')
        {
            displayedCourses = courses.filter(course => course.courseCode.includes(enteredCode))
        } else {
            displayedCourses = courses.filter(course => (course.courseCode.substring(2, 5)).includes(enteredCode))
        }

        setSearchResults(displayedCourses)
        if (displayedCourses.length < 1) {
            setShowError(true)
        } else {
            setShowError(false)
        }
    }


    //RETURNED COMPONENT
    return (
        <>
            <Navbar />

            <span className="lookup-bg" />

            <div className="lookup-sidebar">
                <form className="lookup-form" onSubmit={handleSubmit}>
                    <label>Course Lookup</label>
                    <input
                        type="text"
                        value={enteredCode}
                        onChange={(e) => setEnteredCode(e.target.value)} 
                        placeholder={(searchBy == 'course code') ? "type 8 digit course code (no colons)" : "type 3 digit department code"}
                        maxLength="8"
                        required
                    />

                    <label>Filter Search</label>
                    <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
                        <option value='course code'>course code</option>
                        <option value='department code'>department code</option>
                    </select>

                    <button type="submit">Search</button>
                </form>
            </div>

            <div className="lookup-displayedCoursesContainer">
                <h1>COURSES</h1>
                {(showError === true) ? 
                    <div className="lookup-displayedCourseError">
                        <h2>NO RESULTS FOUND</h2>
                        <p>No courses in the database match your search. Either try another course, or login to write a review for the entered course.</p>
                    </div> :
                    searchResults.map((course, index) => {
                        return <DisplayedCourse key={index} courseCode={course.courseCode} reviewAmount={course.ratingValues[4]}/> 
                    })
                }
            </div>
        </>
    );
}