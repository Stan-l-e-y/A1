const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  last_name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    maxLength: 50,
  },
  gender: {
    type: String,
    required: true,
    maxLength: 25,
  },
  salary: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('employee', employeeSchema);
