const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  mismates: { type: Schema.Types.ObjectId, ref: 'Mismate' },
  token: { type: String }
});

module.exports = mongoose.model('User', userSchema);