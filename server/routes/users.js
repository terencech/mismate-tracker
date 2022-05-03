const { validateUser } = require('../middleware/validation/user-validation.js');
const { createUser, userLogin, returnAuth } = require('../controllers/user-controller.js');
const verifyToken = require('../middleware/auth.js');

function userRoutes(app) {
  app.route('/users').post(validateUser, createUser);
  app.route('/users/login').post(validateUser, userLogin);
  app.route('/isUserAuth').get(verifyToken, returnAuth);
}

module.exports = userRoutes;