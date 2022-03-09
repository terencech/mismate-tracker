const MismateModel = require('../models/mismate.js');

exports.createMismate = async (req, res) => {
  MismateModel.create({
    locationId: null,
    sku: req.body.scan,
    side: req.body.side,
    hasBox: req.body.hasBox
  }, (err, mismate) => {
    if (err) res.json(err);
    res.json(mismate);
  });
}