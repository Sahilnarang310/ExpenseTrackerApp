const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expensesRoutes');
const sequelize = require('./util/database');

const app = express()

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(bodyParser.json({ extended: false }));

app.use(authRoutes);
app.use(expenseRoutes);

sequelize
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch(err => console.error(err));