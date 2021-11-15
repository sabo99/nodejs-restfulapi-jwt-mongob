const mongoose = require('mongoose');
const db = {};

mongoose.Promise = global.Promise;
db.mongoose = mongoose;

db.user = require('./UserModel');

module.exports = db;
