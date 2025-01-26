// controllers/user.js
const User = require('../models/user');

// Add User
exports.createUser = (req, res, next) => {
    const { name, email } = req.body;
    User.create({ name, email })
        .then(result => {
            res.redirect('/user/users'); // Redirect to the users list page
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'User creation failed!' });
        });
};

// Get All Users
exports.getUsers = (req, res, next) => {
    User.findAll()
        .then(users => {
            res.render('user/users-list', { users });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Failed to fetch users!' });
        });
};

// Delete User
exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    User.destroy({ where: { id: userId } })
        .then(result => {
            res.json({ message: 'User deleted successfully!' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'User deletion failed!' });
        });
};
