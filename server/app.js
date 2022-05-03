const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const userRoutes = require('./routes/users.js');
const mismateRoutes = require('./routes/mismates.js');
const auth = require('./middleware/auth.js');
const cors = require('cors');

mongoose.connect(process.env.MONGO_URI).catch(err => console.log(err));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mismateRoutes(app);
userRoutes(app);

const listener = app.listen(process.env.PORT || 8000, () => {
  console.log('App is now listening on port ' + listener.address().port);
});