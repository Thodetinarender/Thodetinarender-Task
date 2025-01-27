const Expense = require('../models/expense');

exports.createExpense = (req, res, next) => {
    const { amount, description, category } = req.body;
    Expense.create({ amount, description, category })
        .then(result => {
            res.redirect('/expense/expenses');
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Expense creation failed!' });
        });
};

exports.getExpenses = (req, res, next) => {
    Expense.findAll()
        .then(expenses => {
            res.render('expense/expenses-list', { expenses });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Failed to fetch expenses!' });
        });
};

exports.deleteExpense = (req, res, next) => {
    const expenseId = req.params.expenseId;
    Expense.destroy({ where: { id: expenseId } })
        .then(result => {
            res.redirect('/expense/expenses-list');
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Expense deletion failed!' });
        });
};



// Get Edit Expense Form
exports.getEditExpense = (req, res, next) => {
    const expenseId = req.params.expenseId;
    Expense.findByPk(expenseId)
        .then(expense => {
            if (!expense) {
                return res.status(404).json({ message: 'Expense not found!' });
            }
            res.render('expense/edit-expense', { expense });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Failed to fetch expense!' });
        });
};

// Update Expense
exports.updateExpense = (req, res, next) => {
    const expenseId = req.params.expenseId;
    const { amount, description, category } = req.body;

    Expense.findByPk(expenseId)
        .then(expense => {
            if (!expense) {
                return res.status(404).json({ message: 'Expense not found!' });
            }

            // Update the expense fields
            expense.amount = amount;
            expense.description = description;
            expense.category = category;

            return expense.save(); // Save updated expense
        })
        .then(result => {
            res.redirect('/expense/expenses-list'); // Redirect to the expenses list
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Expense update failed!' });
        });
};