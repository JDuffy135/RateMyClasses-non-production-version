const express = require('express');
const router = express.Router();
const authController = require('../controllers/authenticationController.js');

//ROUTES
router.get('/signin', authController.get_signin);
router.post('/signin', authController.post_signin);
// router.get('/signup', authController.get_signup);
router.post('/signup', authController.post_signup);
// router.get('/signup/confirmation', authController.get_signupConfirmation);
router.post('/signup/confirmation', authController.post_signupConfirmation);
// router.get('/change-password', authController.get_changePassword);
router.post('/change-password', authController.post_changePassword);
// router.get('/change-password/confirmation', authController.get_changePasswordConfirmation);
router.post('/change-password/confirmation', authController.post_changePasswordConfirmation);


module.exports = router;