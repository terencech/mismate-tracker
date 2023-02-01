const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mismateSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  userName: { type: String, default: null },
  sku: { type: Number, required: true },
  side: { type: String, enum: ['right', 'left'], required: true },
  hasBox: { type: Boolean, required: true },
  matchId: { type: Schema.Types.ObjectId, ref: 'Mismate', default: null },
  matchUser: { type: String, default: null },
  tracking: { type: String, default: null },
  dateSubmitted: { type: Date, required: true }
});

module.exports = mongoose.model('Mismate', mismateSchema);