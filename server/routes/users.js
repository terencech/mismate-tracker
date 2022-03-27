const { createUser, userLogin } = require('../controllers/user-controller.js')

function userRoutes(app) {
  app.route('/users/new').post(createUser);
  app.route('/users/login').post(userLogin);
}

module.exports = userRoutes;