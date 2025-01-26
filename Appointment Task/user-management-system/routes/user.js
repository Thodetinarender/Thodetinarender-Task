// routes/user.js
const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

// GET route to display the user creation form
router.get('/add-user', (req, res, next) => {
    res.render('user/add-user'); // Render the add-user form
});

// POST route to create a user
router.post('/add-user', userController.createUser);

// GET route to fetch all users
router.get('/users', userController.getUsers);

// DELETE route to delete a user
router.delete('/delete-user/:userId', userController.deleteUser);

module.exports = router;
