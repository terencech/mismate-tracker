const MismateModel = require('../models/mismate.js');

exports.createMismate = async (req, res) => {
  const { scan, side, hasBox } = req.body;

  MismateModel.create({
    userId: null,
    sku: scan,
    side,
    hasBox
  }, (err, mismate) => {
    if (err) res.json(err);
    res.json(mismate);
  });
}

exports.readMismates = async (req, res) => {
  MismateModel.find({
    userId: null
  }, (err, mismates) => {
    if (err) res.json(err);
    res.json(mismates);
  });
}

exports.updateMismate = async (req, res) => {
  const id = req.body.id;

  MismateModel.findByIdAndUpdate(id, (err, mismate) => {
    if (err) res.json(err);
    res.json(mismate);
  });
}

exports.deleteMismate = async (req, res) => {
  const id = req.body.id;

  MismateModel.findByIdAndDelete(id, (err, mismate) => {
    if (err) res.json(err);
    res.json(mismate);
  })
}