module.exports = (app) => {
  const freelancer = require('../controllers/freelancer.controller.js');
  const validator = require('../validators/freelancer.validator');

  var router = require('express').Router();

  // Create a new Tutorial
  router.post('/',  validator.create, freelancer.create);

  // Retrieve all freelancer
  router.get('/', freelancer.findAll);

  // Retrieve a single Tutorial with id
  router.get('/:id', freelancer.findById);

  // Retrieve a single Tutorial with id
  router.put('/', freelancer.addProject);

  app.use('/api/freelancer', router);
};
