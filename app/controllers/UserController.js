const db = require('../models');
const { $where } = require('../models/UserModel');
const User = db.user;

const bcrypt = require('bcryptjs');

getUsers = async (req, res) => {
    try {
        const users = await User.find().select(
            '_id email username createdAt updatedAt',
        );
        if (users.length == 0)
            return res
                .status(404)
                .send({ code: 404, message: 'Users are empty!' });

        res.status(200).send({ code: 200, message: 'Success!', users: users });
    } catch (error) {
        res.status(500).send({ code: 500, message: error });
    }
};

getUser = async (req, res) => {
    try {
        const user = await User.findById(req.query.id).select(
            '_id email username createdAt updatedAt',
        );

        if (!user)
            return res
                .status(404)
                .send({ code: 404, message: 'User id Not Found!' });

        res.status(200).send({ code: 200, user: user });
    } catch (error) {
        res.status(500).send({ code: 500, message: error });
    }
};

getPublic = async (req, res) => {
    await res.status(200).send({
        code: 200,
        message: 'This is public API, without Authentication Token JWT',
    });
};

updateUser = async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    email: req.body.email,
                    username: req.body.username,
                    password: bcrypt.hashSync(req.body.password, 10),
                },
            },
        );
        if (!updatedUser)
            return res
                .status(404)
                .send({ code: 404, message: 'User id Not Found!' });

        res.status(200).send({
            code: 200,
            message: 'User Updated Successfully',
        });
    } catch (error) {
        res.status(500).send({ code: 500, message: error });
    }
};

deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser)
            return res
                .status(404)
                .send({ code: 404, message: 'User id Not Found!' });

        res.status(200).send({
            code: 200,
            message: 'User Deleted Successfully',
        });
    } catch (error) {
        res.status(500).send({ code: 500, message: error });
    }
};

module.exports = { getPublic, getUsers, getUser, updateUser, deleteUser };
