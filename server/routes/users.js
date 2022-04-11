const { validateUser } = require('../middleware/validation/user-validation.js');
const { createUser, userLogin } = require('../controllers/user-controller.js');

function userRoutes(app) {
  app.route('/users').post(validateUser, createUser);
  app.route('/users/login').post(userLogin);
}

module.exports = userRoutes;