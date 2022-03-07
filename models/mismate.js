const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mismateSchema = new Schema({
  storeId: { type: Schema.Types.ObjectId, ref: 'Store' },
  sku: { type: Number },
  side: { type: String, enum: ['right', 'left'] },
  hasBox: { type: Boolean }
});

module.exports = mongoose.model('Mismate', mismateSchema);