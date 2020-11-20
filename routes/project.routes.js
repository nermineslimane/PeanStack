module.exports = (app) => {
  const project = require('../controllers/project.controller.js');

  var router = require('express').Router();

  // Create a new Tutorial
  router.post('/', project.create);

  // Retrieve all project
  router.get('/', project.findAll);

  // update project
  router.put('/:id', project.update);

  // Retrieve a single Tutorial with id
  router.delete('/:id', project.delete);

  // Retrieve a single Tutorial with id
  router.get('/:id', project.findById);

  app.use('/api/project', router);
};
