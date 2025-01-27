// routes/expense.js
const express = require('express');
const expenseController = require('../controllers/expense');

const router = express.Router();

// GET route to display the expense creation form
router.get('/add-expense', (req, res, next) => {
    res.render('expense/add-expense'); // Render the add-expense form
});

// POST route to create a expense
router.post('/add-expense', expenseController.createExpense);

// GET route to fetch all expenses
router.get('/expenses', expenseController.getExpenses);

// GET route to fetch all expenses and render the list
router.get('/expenses-list', expenseController.getExpenses);

// POST route to delete an expense
router.post('/delete-expense/:expenseId', expenseController.deleteExpense);

// Route to display the edit form for an expense
router.get('/edit-expense/:expenseId', expenseController.getEditExpense);

// Route to handle the actual update of the expense
router.post('/edit-expense/:expenseId', expenseController.updateExpense);

module.exports = router;
