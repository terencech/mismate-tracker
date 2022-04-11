const { validateMismate } = require('../middleware/validation/mismate-validation.js');
const { createMismate, readMismates, updateMismate, deleteMismate } = require('../controllers/mismate-controller.js');
const verifyToken = require('../middleware/auth.js');

function mismateRoutes(app) {
  app.use(verifyToken);
  app.route('/mismates').post(validateMismate, createMismate);
  app.route('/mismates').get(readMismates);
  app.route('/mismates').put(updateMismate);
  app.route('/mismates').delete(deleteMismate);
}

module.exports = mismateRoutes;