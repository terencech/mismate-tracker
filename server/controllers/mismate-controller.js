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

  MismateModel.findByIdAndUpdate(id, { update: update }, (err, mismate) => {
    if (err) res.json(err);
    res.json(mismate);
  });
}

exports.deleteMismate = async (req, res) => {
  const ids = req.body

  MismateModel.deleteMany({ _id: { $in: ids } }, (err, result) => {
    if (err) res.json(err);
    res.json(result);
  })
}

exports.matchMismates = async (req, res) => {

}