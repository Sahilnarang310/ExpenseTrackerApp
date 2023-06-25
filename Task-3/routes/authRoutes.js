const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');

// router.get('/expenses', expensesController.getAllExpenses);

// router.get('/', expensesController.getAllExpenses);

// router.get('/expenses/:id', expensesController.getOneExpense);

router.post('/user/signup', authController.postAddUser);

// router.put('/expenses/:id', expensesController.putUpdateExpense);

// router.delete('/expenses/:id', expensesController.deleteExpense);

module.exports = router;