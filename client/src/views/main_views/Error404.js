import NavbarNoProfile from '../components/NavbarNoProfile.js';

export default function Error404() {
    return (
        <>
            <NavbarNoProfile />
            <div className="error404-bg"></div>
            <h1 className="error404-text">ERROR 404: Page Not Found</h1>
        </>
    );
}