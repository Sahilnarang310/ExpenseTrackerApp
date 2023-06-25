const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesController')

router.get('/expenses', expensesController.getAllExpenses);

router.get('/', expensesController.getAllExpenses);

router.get('/expenses/:id', expensesController.getOneExpense);

router.post('/expenses', expensesController.postAddExpense);

router.put('/expenses/:id', expensesController.putUpdateExpense);

router.delete('/expenses/:id', expensesController.deleteExpense);

module.exports = router;