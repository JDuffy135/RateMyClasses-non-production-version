export default function CourseStatusBar ({ stat, progressValue }) {

    //PROGRESS BAR STYLING
    const progressbar = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        height: '35%',
        width: '90%',
        backgroundColor: 'white',
        borderRadius: '10px',
        margin: '10px',
        padding: '3px'
    }

    const progress = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: `${progressValue}%`,
        backgroundColor: 'var(--red1)',
        borderRadius: '10px',

        transitionProperty: `width`,
        transitionDelay: '0s',
        transitionDuration: '0.75s',
        transitionTimingFunction: 'cubic-bezier(0.25, 0.5, 0.5, 1)'
    }


    //RETURNED COMPONENT
    return (
        <div className="reviews-progressbarContainer">
            <h1>{stat}</h1>
            <div style={progressbar}>
                <div style={progress}>
                    <p>{Math.round(progressValue / 20 * 10) / 10}/5</p>
                </div>
            </div>
        </div>
    );
}