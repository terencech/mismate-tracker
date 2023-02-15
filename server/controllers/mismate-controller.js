const MismateModel = require('../models/mismate.js');

exports.createMismate = async (req, res) => {
  const { sku, side, hasBox } = req.body;
  const matchId = req.match ? req.match._id : null;
  const matchUser = req.match ? req.match.matchUser : null;
  const userId = req.user._id;
  const userName = req.user.username;
  const dateSubmitted = new Date();

  MismateModel.create({
    userId,
    sku,
    side,
    hasBox,
    dateSubmitted
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

  const update = {
    sku: req.body.sku,
    side: req.body.side,
    hasBox: req.body.hasBox,
    lastUpdated: new Date()
  }

  MismateModel.findByIdAndUpdate(req.body.id, update, (err, mismate) => {
    if (err) res.json(err);
    res.json(mismate);
  });
}

exports.deleteMismate = async (req, res) => {
  const id = req.body.id;

  MismateModel.findByIdAndDelete(id, (err, mismate) => {
    if (err) res.json(err);
    res.json(mismate);
  });
}