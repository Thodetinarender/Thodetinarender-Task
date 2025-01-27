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
