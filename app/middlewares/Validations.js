const db = require('../models');
const User = db.user;
const Joi = require('joi');

checkUsernameOrEmailExists = (req, res, next) => {
    User.findOne({ username: req.body.username }).exec((err, user) => {
        if (err) return res.status(500).send({ code: 500, messaage: err });
        if (user)
            return res
                .status(400)
                .send({ code: 400, messaage: 'Username is already exists!' });

        User.findOne({ email: req.body.email }).exec((err, user) => {
            if (err) return res.status(500).send({ code: 500, messaage: err });
            if (user)
                return res
                    .status(400)
                    .send({ code: 400, messaage: 'Email is already exists!' });

            next();
        });
    });
};

signUpValidation = (req, res, next) => {
    const { error, value } = Joi.object({
        email: Joi.string().email().required(),
        username: Joi.string().min(4).required(),
        password: Joi.string().min(6).required(),
    }).validate(req.body);

    if (error)
        return res
            .status(422)
            .send({ code: 422, message: error.details[0].message });

    next();
};

signInValidation = (req, res, next) => {
    const { error, value } = Joi.object({
        username: Joi.string().min(4).required(),
        password: Joi.string().min(6).required(),
    }).validate(req.body);

    if (error)
        return res
            .status(422)
            .send({ code: 422, message: error.details[0].message });

    next();
};

findWithQueryId = (req, res, next) => {
    const { error, value } = Joi.object({
        id: Joi.string().min(24).max(24).required(),
    }).validate(req.query);

    if (error)
        return res
            .status(422)
            .send({ code: 422, message: error.details[0].message });

    next();
};

findWithParamsId = (req, res, next) => {
    const { error, value } = Joi.object({
        id: Joi.string().min(24).max(24).required(),
    }).validate(req.params);

    if (error)
        return res
            .status(422)
            .send({ code: 422, message: error.details[0].message });

    next();
};

checkValueUpated = (req, res, next) => {
    User.findById(req.params.id).exec(async (err, user) => {
        if (!user)
            return res
                .status(404)
                .send({ code: 404, message: 'User id Not Found!' });

        if (!Object.keys(req.body).length)
            return res
                .status(422)
                .send({ code: 422, message: 'Undefine Request Body!' });

        if (err) return res.status(500).send({ code: 500, message: err });

        if (user) {
            req.body.email =
                typeof req.body.email != 'undefined'
                    ? req.body.email
                    : user.email;

            req.body.username =
                typeof req.body.username != 'undefined'
                    ? req.body.username
                    : user.username;

            req.body.password =
                typeof req.body.password != 'undefined'
                    ? req.body.password
                    : user.password;

            const { error, value } = Joi.object({
                email: Joi.string().email().required(),
                username: Joi.string().min(4).required(),
                password: Joi.string().min(6).required(),
            }).validate(req.body);

            if (error)
                return res
                    .status(422)
                    .send({ code: 422, message: error.details[0].message });

            next();
        }
    });
};

module.exports = {
    checkUsernameOrEmailExists,
    signUpValidation,
    signInValidation,
    findWithQueryId,
    findWithParamsId,
    checkValueUpated,
};
