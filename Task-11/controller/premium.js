const User = require('../models/user');
const Expense = require('../models/expense');
const sequelize = require('../util/database');

const getUserLeaderBoard = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    const aggreExp = {};

    expenses.forEach((expense) => {
      if (aggreExp[expense.userId]) {
        aggreExp[expense.userId] += parseInt(expense.amount);
      } else {
        aggreExp[expense.userId] = parseInt(expense.amount);
      }
    });

    const leaderboardofusers = await User.findAll({
      attributes: ['id', 'name', [sequelize.fn('sum', sequelize.col('expenses.amount')), 'total_cost']],
      include: [
        {
          model: Expense,
          attributes: []
        }
      ],
      group: ['User.id'],
      order: [[sequelize.literal('total_cost'), 'DESC']]
    });

    const userLeaderBoardDetails = leaderboardofusers.map((user) => ({
      name: user.name,
      total_cost: aggreExp[user.id] || 0
    }));

    userLeaderBoardDetails.sort((a, b) => b.total_cost - a.total_cost);
    
    res.status(200).json(userLeaderBoardDetails);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  getUserLeaderBoard
};
