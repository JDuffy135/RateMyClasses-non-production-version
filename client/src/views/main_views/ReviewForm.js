import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ReviewFormAlert from '../components/ReviewFormAlert.js';

export default function ReviewForm() {

    //FORM STATES
    // if (inputCourseCode == undefined || typeof(inputCourseCode) != 'string') {
    //     inputCourseCode = '';
    // }
    let inputCourseCode = '';
    const { courseId } = useParams();
    if (courseId != undefined && courseId.length <= 8) {
        inputCourseCode = courseId;
    }

    const [courseCode, setCourseCode] = useState(inputCourseCode);
    const [title, setTitle] = useState('');
    const [professor, setProfessor] = useState('');
    const [grade, setGrade] = useState('not sure');
    const [review, setReview] = useState('');

    const [difficulty, setDifficulty] = useState(3);
    const [homework, setHomework] = useState(3);
    const [interest, setInterest] = useState(3);
    const [usefulness, setUsefulness] = useState(3);

    /* dropdown option arrays */
    const gradeOptions = ['not sure', 'prefer not to say', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'];
    const ratingOptions = [1, 2, 3, 4, 5];


    //ERROR MESSAGE STATES
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState('');


    //USENAVIGATE HOOK
    let navigate = useNavigate();


    //USEEFFECT DETECTING IF USER IS LOGGED IN + SETTING DEFAULT COURSECODE VALUE
    useEffect(() => {
        const checkIfLoggedIn = async () => {
            fetch('http://localhost:3001/profile', {
                method: 'get',
                credentials: 'include'
            })
            .then(response => response.json())
            .then(response => {
                if (!response.message) {
                    navigate('/signin')
                }
            })
            .catch(error => {
                navigate('/signin')
            })
        }
        checkIfLoggedIn();
    }, []);


    //FORM FUNCTIONS
    const handleSubmit = async (e) => {
        e.preventDefault();
        let ratingValues = [Number(difficulty), Number(homework), Number(interest), Number(usefulness)];
        let data = { courseCode, title, professor, grade, review, ratingValues };
        fetch('http://localhost:3001/review', {
            method: "post",
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then((response) => response.json())
        .then((response) => {
            if (response.message) {
                setError('');
                setShowAlert(false);
                navigate(`/courses/${courseCode}`);
            } else {
                setError(response.error);
                setShowAlert(true);
            }
        })
    }


    //RETURNED COMPONENT
    return (
        <>
            <Navbar />
            <div className="reviewform-bg">
                <form className="reviewform-form" onSubmit={handleSubmit}>
                    <h1>REVIEW FORM</h1>
                    <div className="reviewform-itemcontainer">
                        <label>Course Code</label>
                        <input
                            type="text"
                            value={courseCode}
                            onChange={(e) => setCourseCode(e.target.value)} 
                            placeholder="type the 8 digit Rutgers course code (without colons)"
                            maxLength="8"
                            required
                        />
                        <p>characters: {courseCode.length}/8</p>
                    </div>
                    <div className="reviewform-itemcontainer">
                        <label>Review Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} 
                            placeholder="max characters: 50"
                            maxLength="50"
                            required
                        />
                        <p>characters: {title.length}/50</p>
                    </div>
                    <div className="reviewform-itemcontainer">
                        <label>Professor</label>
                        <input
                            type="text"
                            value={professor}
                            onChange={(e) => setProfessor(e.target.value)} 
                            placeholder="max characters: 30 (type unkown if unsure)"
                            maxLength="30"
                            required
                        />
                        <p>characters: {professor.length}/30</p>
                    </div>
                    <div className="reviewform-itemcontainer">
                        <label>Grade Received</label>
                        <select value={grade} onChange={(e) => setGrade(e.target.value)}>
                            {gradeOptions.map((item, index) => {
                                return (
                                    <option key={index} value={item}>{item}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="reviewform-itemcontainer-review">
                        <label>Course Review</label>
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="max characters: 1000, minimum characters: 100"
                            maxLength="1000"
                            required
                        />
                        <p>characters: {review.length}/1000</p>
                    </div>


                    <div className="reviewform-itemcontainer">
                        <label>Class Difficulty</label>
                        <span className="reviewform-ratingblurb">How difficult was the class on, a scale from 1 to 5?</span>
                        <div className="reviewform-ratingflexbox">
                            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                                {ratingOptions.map((item, index) => {
                                    return (
                                        <option key={index} value={item}>{item}</option>
                                    );
                                })}
                            </select>
                            <div className="reviewform-explanationbox">
                                {(difficulty == 1) ? <p>1/5: very little effort required</p> : null}
                                {(difficulty == 2) ? <p>2/5: some effort required but not much</p> : null}
                                {(difficulty == 3) ? <p>3/5: about average difficulty</p> : null}
                                {(difficulty == 4) ? <p>4/5: consistently challenging, but not an absolute trainwreck</p> : null}
                                {(difficulty == 5) ? <p>5/5: misery</p> : null}
                            </div>
                        </div>
                    </div>
                    <div className="reviewform-itemcontainer">
                        <label>Amount of Homework</label>
                        <span className="reviewform-ratingblurb">How much out of class work was required, on a scale from 1 to 5?</span>
                        <div className="reviewform-ratingflexbox">
                            <select value={homework} onChange={(e) => setHomework(e.target.value)}>
                                {ratingOptions.map((item, index) => {
                                    return (
                                        <option key={index} value={item}>{item}</option>
                                    );
                                })}
                            </select>
                            <div className="reviewform-explanationbox">
                                {(homework == 1) ? <p>1/5: little to none</p> : null}
                                {(homework == 2) ? <p>2/5: on average, maybe 1 to 2 hours per week</p> : null}
                                {(homework == 3) ? <p>3/5: usually a few hours per week, but pretty manageable</p> : null}
                                {(homework == 4) ? <p>4/5: usually quite a few hours per week - somewhat manageable</p> : null}
                                {(homework == 5) ? <p>5/5: essentially nonstop - barely had time for other classes</p> : null}
                            </div>
                        </div>
                    </div>
                    <div className="reviewform-itemcontainer">
                        <label>Interest Level</label>
                        <span className="reviewform-ratingblurb">How interesting was the course or subject, on a scale from 1 to 5?</span>
                        <div className="reviewform-ratingflexbox">
                            <select value={interest} onChange={(e) => setInterest(e.target.value)}>
                                {ratingOptions.map((item, index) => {
                                    return (
                                        <option key={index} value={item}>{item}</option>
                                    );
                                })}
                            </select>
                            <div className="reviewform-explanationbox">
                                {(interest == 1) ? <p>1/5: I'm falling asleep just thinking about it</p> : null}
                                {(interest == 2) ? <p>2/5: not very interesting</p> : null}
                                {(interest == 3) ? <p>3/5: somewhat interesting</p> : null}
                                {(interest == 4) ? <p>4/5: very interesting</p> : null}
                                {(interest == 5) ? <p>5/5: EXTREMELY interesting</p> : null}
                            </div>
                        </div>
                    </div>
                    <div className="reviewform-itemcontainer">
                        <label>Usefulness</label>
                        <span className="reviewform-ratingblurb">How useful is the course material for your studies, job, or day-to-day life, on a scale from 1 to 5?</span>
                        <div className="reviewform-ratingflexbox">
                            <select value={usefulness} onChange={(e) => setUsefulness(e.target.value)}>
                                {ratingOptions.map((item, index) => {
                                    return (
                                        <option key={index} value={item}>{item}</option>
                                    );
                                })}
                            </select>
                            <div className="reviewform-explanationbox">
                                {(usefulness == 1) ? <p>1/5: I gained nothing of value from this class</p> : null}
                                {(usefulness == 2) ? <p>2/5: I might've gained something of value from this class..?</p> : null}
                                {(usefulness == 3) ? <p>3/5: I gained some valuable skills/insights from this class</p> : null}
                                {(usefulness == 4) ? <p>4/5: I gained a lot of valuable skills/insights from this class</p> : null}
                                {(usefulness == 5) ? <p>5/5: I gained a TON skills/insights from this class</p> : null}
                            </div>
                        </div>
                    </div>

                    <button className="reviewform-submitbutton" type="submit">SUBMIT</button>

                    {(showAlert) ? <ReviewFormAlert error={error} /> : null}
                </form>
            </div>
        </>
    );
}