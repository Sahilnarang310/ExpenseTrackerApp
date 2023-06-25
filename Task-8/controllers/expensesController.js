const Expenses = require('../models/expense');

const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.getAllExpenses = (req, res, next) => {
    Expenses.findAll()
        .then(response => res.json(response))
        .catch(err => console.log(err));
    const userId = jwt.verify(req.query.token, 'yeduniyamch').id
    if (userId) {
        Expenses.findAll({
            where: {
                userId: userId
            }
        })
            .then(response => res.json(response))
            .catch(err => console.log(err));
    } else {
        res.status(401).json({
            message: 'Unauthorized User'
        });
    }
}

exports.getOneExpense = (req, res, next) => {
    Expenses.findByPk(req.params.id)
        .then(response => res.json(response))
        .catch(err => console.log(err));
    const userId = jwt.verify(req.query.token, 'yeduniyamch').id
    if (userId) {
        Expenses.findByPk({
            where: {
                id: req.params.id,
                userId: jwt.verify(req.query.token, 'yeduniyamch').id
            }
        })
            .then(response => res.json(response))
            .catch(err => console.log(err));
    } else {
        res.status(401).json({
            message: 'Unauthorized User'
        });
    }
}

exports.postAddExpense = (req, res, next) => {
    const amount = parseInt(req.body.amount);
    const description = req.body.description;
    const category = req.body.category;
    Expenses.create({
        amount: amount,
        description: description,
        // category: category
        category: category,
        userId: jwt.verify(req.body.token, 'Zyeduniyamch').id
    })
        .then(response => res.json(response))
        .then(response => {
            console.log("5");
            res.json(response)
        })
        .catch(err => console.log(err));
}

exports.putUpdateExpense = (req, res, next) => {
    const expenseId = req.params.id;
    console.log(req.body);
    Expenses.update({
        amount: parseInt(req.body.amount),
        description: req.body.description,
        category: req.body.category
    }, {
        where: {
            // id: expenseId
            id: expenseId,
            userId: jwt.verify(req.body.token, 'yeduniyamch').id
        }
    }
    )
        .then(response => res.json(response))
        .catch(err => console.log(err));
}

exports.deleteExpense = (req, res, next) => {
    Expenses.destroy({
        where: {
            id: req.params.id
        }
    })
    const userId = jwt.verify(req.query.token, 'yeduniyamch').id
    if (userId) {
        Expenses.destroy({
            where: {
                id: req.params.id,
                userId: jwt.verify(req.query.token, 'yeduniyamch').id
            }
        })
            .then(response => res.json(response))
            .catch(err => console.log(err));
    } else {
        res.status(401).json({
            message: 'Unauthorized User'
        });
    }
}