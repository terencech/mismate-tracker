const { createUser } = require('../controllers/user-controller.js')

function userRoutes(app) {
  app.route('/users/new').post(createUser);
}

module.exports = userRoutes;