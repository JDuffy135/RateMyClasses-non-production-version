export default function ReviewFormAlert({ error }) {
    return (
        <div className="reviewform-alertdiv">
            <h2>ERROR</h2>
            <p>{error}</p>
        </div>
    );
}