const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController.js');
const { requireAuth } = require('../middleware/jwtMiddleware.js');


//ROUTES
router.get('/', mainController.get_home);
// router.get('/about', mainController.get_about);
router.get('/courses', mainController.get_courses);
router.post('/courses', mainController.post_courses);
router.get('/courses/:id', mainController.get_courseReviews);

/* NOTE: these are protected routes, so need middleware to check if user is logged in */
// router.get('/review', requireAuth, mainController.get_reviewForm);
router.post('/review', requireAuth, mainController.post_reviewForm);


module.exports = router;