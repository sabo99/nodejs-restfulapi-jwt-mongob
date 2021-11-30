const config = require('../config');
const db = require('../models');
const User = db.user;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

signUp = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    });

    user.save((err, user) => {
        if (err) return res.status(500).send({ code: 500, messaage: err });

        res.status(201).send({
            code: 201,
            message: 'Registeredd Successfully!',
            user: {
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
            },
        });
    });
};

signIn = (req, res) => {
    User.findOne({ username: req.body.username }).exec((err, user) => {
        if (err) return res.status(500).send({ code: 500, messaage: err });
        if (!user)
            return res
                .status(404)
                .send({ code: 404, messaage: 'Username has not registered!' });

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password,
        );
        if (!passwordIsValid)
            return res
                .status(401)
                .send({ code: 401, messaage: 'Invalid Password!' });

        const token = jwt.sign({ _id: user._id }, config.TOKEN_JWT, {
            expiresIn: '1d',
        });

        res.header('x-auth-token', token)
            .status(200)
            .send({
                code: 200,
                message: 'Logged in!',
                user: {
                    username: user.username,
                    email: user.email,
                    token: token,
                },
                'device-info': req.deviceInfo,
            });
    });
};

module.exports = { signUp, signIn };
