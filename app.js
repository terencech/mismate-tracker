const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).catch(err => console.log(err));

const mismateRoutes = require(__dirname + '/routes/mismates.js');

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

mismateRoutes(app);

const listener = app.listen(process.env.PORT || 8000, () => {
  console.log('App is now listening on port ' + listener.address().port);
});