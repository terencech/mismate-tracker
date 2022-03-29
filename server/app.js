const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const userRoutes = require('./routes/users.js');
const mismateRoutes = require('./routes/mismates.js');
const auth = require('./middleware/auth.js');

app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_URI).catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/auth', auth, (req, res) => {
  res.status(200).send('Auth success');
});

mismateRoutes(app);
userRoutes(app);

const listener = app.listen(process.env.PORT || 8000, () => {
  console.log('App is now listening on port ' + listener.address().port);
});