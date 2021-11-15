const mongoose = require('mongoose');

module.exports = mongoose.model(
    'User',
    new mongoose.Schema(
        {
            email: { type: String },
            username: { type: String },
            password: { type: String },
        },
        { timestamps: true },
    ),
);
