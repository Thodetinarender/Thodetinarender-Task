const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Route to get available slots
router.get('/', bookingController.renderHomePage); 
router.post('/book', bookingController.bookSlot);
router.post('/cancel-booking', bookingController.cancelBooking);

module.exports = router;
