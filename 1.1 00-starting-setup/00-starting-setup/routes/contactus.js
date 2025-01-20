const path = require('path');

const express = require('express');

const productsController =require('../controllers/products');

const router = express.Router();


router.get('/contactus', productsController.getContactUs);

router.post('/contactus', productsController.postContact);

router.get('/success', productsController.getSuccess);

module.exports = router;
