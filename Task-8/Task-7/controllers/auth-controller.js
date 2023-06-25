const User = require('../models/user');

exports.postAddUser = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findOne({ where: { email: email } });
        if (user) {
            return res.status(400).json({
                error: 'User already exists',
                user: user
            });
        }
        const newUser = await User.create({
            name: name,
            email: email,
            password: password
        });
        res.status(201).json({
            user: newUser
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
}