export default function ProfileLoading() {

    fetch('http://localhost:3001/profile');

    return (
        <div>ProfileLoading</div>
    );
}