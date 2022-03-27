const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mismateSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  sku: { type: Number, required: true },
  side: { type: String, enum: ['right', 'left'], required: true },
  hasBox: { type: Boolean, required: true }
});

module.exports = mongoose.model('Mismate', mismateSchema);