const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'expense-tracker',
    'root',
    'Sahil3453%%',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

module.exports = sequelize;