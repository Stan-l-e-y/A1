const db = require('../models');
const Employee = db.employees;

exports.create = (req, res) => {
  if (
    !req.body.first_name ||
    !req.body.last_name ||
    !req.body.email ||
    !req.body.gender ||
    !req.body.salary
  ) {
    res.status(400).send({
      message:
        'Content can not be empty! First name, Last name, Email, Gender and Salary are required!',
    });
    return;
  }

  const employee1 = new Employee({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    gender: req.body.gender,
    salary: req.body.salary,
  });

  employee1
    .save(employee1)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'An error occurred ',
      });
    });
};

exports.findAll = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.send(employees);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'An error occurred while retrieving employees.',
    });
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const employee = await Employee.findById(id);
    res.send(employee);
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        'An error occurred while retrieving employee with id=' + id,
    });
  }
};

exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Body can not be empty',
    });
  }

  const id = req.params.id;
  try {
    const employee = await Employee.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    res.send(employee);
  } catch (err) {
    res.status(500).send({
      message: 'Error updating employee with id=' + id,
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const employee = await Employee.findByIdAndRemove(id, {
      useFindAndModify: false,
    });
    res.send(employee);
  } catch (err) {
    res.status(500).send({
      message: 'Could not delete employee with id=' + id,
    });
  }
};
