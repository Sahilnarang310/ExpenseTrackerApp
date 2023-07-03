const Expense = require('../models/expense');
const User = require('../models/user');

exports.addExpense = async (req, res, next) => {
  try {
    const { amount, description, category } = req.body;

    if (amount === undefined || amount.length === 0) {
      return res.status(400).json({ success: false, message: 'Parameters missing' });
    }

    const expense = await Expense.create({
      amount,
      description,
      category,
      userId: req.user.id
    });

    const totalExpense = Number(req.user.totalExpenses) + Number(amount);
    await User.update(
      { totalExpenses: totalExpense },
      { where: { id: req.user.id } }
    );

    res.status(201).json({ newExpense: expense });
  } catch (err) {
    console.log('Error adding expense:', err);
    res.status(500).json({ success: false, error: err });
  }
};

exports.getExpense = async (req, res, next) => {
  try {
    const expenses = await Expense.findAll({ where: { userId: req.user.id } });
    console.log(expenses);
    return res.status(200).json({ expenses, success: true });
  } catch (err) {
    console.log('Error getting expenses:', err);
    return res.status(500).json({ error: err, success: false });
  }
};

exports.deleteExpense = async (req, res) => {
  const eId = req.params.id;
  console.log(req.params.id);

  try {
    if (req.params.id === undefined) {
      console.log('ID is missing');
      return res.status(400).json({ err: 'ID is missing' });
    }

    await Expense.destroy({ where: { id: eId } });
    res.sendStatus(200);
  } catch (err) {
    console.log('Error deleting expense:', err);
    res.status(500).json(err);
  }
};
