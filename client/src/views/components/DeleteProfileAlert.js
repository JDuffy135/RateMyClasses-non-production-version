export default function DeleteProfileAlert({ cancel, confirm, confirmAndDelete }) {

    return (
        <div className="profile-sidebar-container">
            <div className="profile-alert-background">
                <div className="profile-alert-container">
                    <span className="profile-alert-warningtext-flexbox">
                        <h2>WARNING</h2>
                        <p className="profile-alert-warningtext">do you want to permanently delete your account?</p>
                    </span>
                    <div className="profile-alert-buttoncontainer">
                        <button
                            className="profile-alert-confirmanddeletebutton"
                            onClick={confirmAndDelete}>
                                CONFIRM AND DELETE REVIEWS
                        </button>
                        {/* <button
                            className="profile-alert-confirmbutton"
                            onClick={confirm}>
                                CONFIRM
                        </button> */}
                        <button
                            className="profile-alert-cancelbutton"
                            onClick={cancel}>
                                CANCEL
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}