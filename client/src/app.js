/* master component file */

//GENERAL IMPORTS
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


//IMPORTING CSS
import './styles/index.css';
import './styles/pages.css';


//IMPORTING VIEWS
import Home from './views/main_views/Home.js';
import About from './views/main_views/About.js';
import CourseLookup from './views/main_views/CourseLookup.js';
import CourseReviews from './views/main_views/CourseReviews.js';
import ReviewForm from './views/main_views/ReviewForm.js';
import Signin from './views/auth_views/Signin.js';
import Signup from './views/auth_views/Signup.js';
import SignupConfirmation from './views/auth_views/SignupConfirmation.js';
import ChangePassword from './views/auth_views/ChangePassword.js';
import ChangePasswordConfirmation from './views/auth_views/ChangePasswordConfirmation.js';
import ProfileLoading from './views/profile_views/ProfileLoading.js';
import Profile from './views/profile_views/Profile.js';
import Error404 from './views/main_views/Error404.js';


function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/courses" element={<CourseLookup />} />
                    <Route path="/courses/:id" element={<CourseReviews />} />
                    <Route path="/review" element={<ReviewForm />} />
                    <Route path="/review/:courseId" element={<ReviewForm />} />

                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signup/confirmation" element={<SignupConfirmation />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                    <Route path="/change-password/confirmation" element={<ChangePasswordConfirmation />} />

                    <Route path='/profile' element={<ProfileLoading />} />
                    <Route path="/profile/:userid" element={<Profile />} />

                    <Route path="*" element={<Error404 />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;