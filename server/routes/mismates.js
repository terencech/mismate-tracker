const express = require('express');
const { validateMismate } = require('../validation/mismate-validation.js');
const { createMismate, readMismates } = require('../controllers/mismate-controller.js');

function mismateRoutes(app) {
  app.use(express.urlencoded({ extended: true }));

  app.route('/mismates/new').post(validateMismate, createMismate);
  app.route('/mismates').get(readMismates);
}

module.exports = mismateRoutes;