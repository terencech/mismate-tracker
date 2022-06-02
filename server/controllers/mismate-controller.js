const MismateModel = require('../models/mismate.js');

exports.createMismate = async (req, res) => {
  const { sku, side, hasBox } = req.body;
  const userId = req.user._id;

  MismateModel.create({
    userId,
    sku,
    side,
    hasBox
  }, (err, mismate) => {
    if (err) res.json(err);
    res.json(mismate);
  });
}

exports.readMismates = async (req, res) => {
  const userId = req.user._id;

  MismateModel.find({
    userId
  }, (err, mismates) => {
    if (err) res.json(err);
    res.json(mismates);
  });
}

exports.updateMismate = async (req, res) => {
  const id = req.body.id;

  const update = {
    sku: req.body.sku,
    side: req.body.side,
    hasBox: req.body.hasBox
  }

  MismateModel.findByIdAndUpdate(id, update, (err, mismate) => {
    if (err) res.json(err);
    res.json(mismate);
  });
}

exports.deleteMismate = async (req, res) => {
  const id = req.body.id

  MismateModel.findByIdAndDelete(id, (err, mismate) => {
    if (err) res.json(err);
    res.json(mismate);
  });
}

exports.matchMismates = async (req, res) => {

}