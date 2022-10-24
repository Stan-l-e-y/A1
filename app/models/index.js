const mongoConfig = require('../config/mongo.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = mongoConfig.url;
db.employees = require('./employee.model.js');
db.users = require('./user.model.js');

module.exports = db;
