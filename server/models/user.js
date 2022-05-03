const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true, select: false },
  mismates: { type: Schema.Types.ObjectId, ref: 'Mismate' }
});

module.exports = mongoose.model('User', userSchema);