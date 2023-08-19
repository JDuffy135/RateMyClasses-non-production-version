import { useState, useEffect } from 'react';
import deleteicon from '../../images/deleteicon.png';

export default function DeleteReviewButton({deletereview}) {

    return (
        <>
            <img onClick={deletereview} className="profile-deleteicon" src={deleteicon} alt="del"/>
        </>
    );
}