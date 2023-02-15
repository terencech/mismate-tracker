const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
    ownerMismateId: { type: Schema.Types.ObjectId, ref: 'Mismate' },
    looseMismateId: { type: Schema.Types.ObjectId, ref: 'Mismate' },
    dateMatched: { type: Date },
    tracking: { type: String },
    dateShipped: { type: Date },
    received: { type: Boolean },
    dateReceived: { type: Date }
});

module.exports = mongoose.model('Match', matchSchema);