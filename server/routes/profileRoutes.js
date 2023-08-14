const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController.js');
const { requireAuth, requireSpecificAuth } = require('../middleware/jwtMiddleware.js');


//ROUTES
/* NOTE: all routes are double protected (specific user needs to be logged in and authenticated before viewing), so need middleware */
router.get('/', requireAuth, profileController.get_userid);
router.get('/:userid', requireSpecificAuth, profileController.get_profile);
router.post('/:userid', requireSpecificAuth, profileController.post_profile);
router.delete('/:userid', requireSpecificAuth, profileController.delete_profile);
router.get('/reviews/:userid', requireSpecificAuth, profileController.get_profileReviews);
router.delete('/reviews/:userid', requireSpecificAuth, profileController.delete_profileReview);


module.exports = router;