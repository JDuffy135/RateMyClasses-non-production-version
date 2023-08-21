import { useNavigate } from 'react-router-dom';

export default function CourseLookup({ courseCode, reviewAmount }) {

    //USENAVIGATE HOOK
    let navigate = useNavigate();


    //RETURNED COMPONENT
    return (
        <div className="lookup-displayedCourseOutline" onClick={() => navigate(`/courses/${courseCode}`)}>
            <h2>{courseCode.substring(0,2)}:{courseCode.substring(2,5)}:{courseCode.substring(5)}</h2>
            <p>Reviews: {reviewAmount}</p>
        </div>
    );
}