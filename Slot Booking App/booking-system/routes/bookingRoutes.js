const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Route to get available slots
router.get('/', bookingController.renderHomePage);  // This is the route that handles the GET request for '/'
router.post('/book', bookingController.bookSlot);

module.exports = router;
