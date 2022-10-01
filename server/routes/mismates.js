const { validateMismate } = require('../middleware/validation/mismate-validation.js');
const { createMismate, readMismates, updateMismate, deleteMismate } = require('../controllers/mismate-controller.js');
const verifyToken = require('../middleware/auth.js');
const findMatch = require('../middleware/findMatch.js');

function mismateRoutes(app) {
  app.route('/mismates').post(validateMismate, verifyToken, findMatch, createMismate);
  app.route('/mismates').get(verifyToken, readMismates);
  app.route('/mismates').put(verifyToken, findMatch, updateMismate);
  app.route('/mismates').delete(verifyToken, deleteMismate);
}

module.exports = mismateRoutes;