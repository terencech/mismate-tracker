const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mismateSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  sku: { type: Number, required: true },
  side: { type: String, enum: ['right', 'left'], required: true },
  hasBox: { type: Boolean, required: true },
  matchId: { type: Schema.Types.ObjectId, ref: 'Match', default: null },
  dateSubmitted: { type: Date, required: true },
  lastUpdated: { type: Date, default: null }
});

module.exports = mongoose.model('Mismate', mismateSchema);