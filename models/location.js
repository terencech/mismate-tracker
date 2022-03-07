const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  name: { type: String },
  mismates: { type: Schema.Types.ObjectId, ref: 'Mismate' }
});

module.exports = mongoose.model('Location', locationSchema);