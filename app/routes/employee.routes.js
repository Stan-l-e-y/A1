module.exports = (app) => {
  const employees = require('../controllers/employee.controller.js');

  var router = require('express').Router();

  router.post('/', employees.create);

  router.get('/', employees.findAll);

  router.get('/:id', employees.findOne);

  router.put('/:id', employees.update);

  router.delete('/:id', employees.delete);

  app.use('/api/employees', router);
};
