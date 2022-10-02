const MismateModel = require('../models/mismate.js');
const mongoose = require('mongoose');

exports.createMismate = async (req, res) => {
  const { sku, side, hasBox } = req.body;
  const matchId = req.match ? req.match._id : null;
  const userId = req.user._id;

  MismateModel.create({
    userId,
    sku,
    side,
    hasBox,
    matchId
  }, (err, mismate) => {
    if (err) res.json(err);
    if (matchId) {
      MismateModel.findByIdAndUpdate(matchId, { matchId: mismate._id }, (err, match) => {
        if (err) res.json(err);
      });
    }
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
    hasBox: req.body.hasBox,
    tracking: req.body.tracking,
    matchId: req.match ? req.match._id : null
  }

  MismateModel.findByIdAndUpdate(id, update, (err, mismate) => {
    if (err) res.json(err);
    if (update.tracking) updateTrackingById(mismate.matchId, update.tracking);
    if (mismate.matchId) updateMatchById(mismate.matchId);
    res.json(mismate);
  });
}

exports.deleteMismate = async (req, res) => {
  const id = req.body.id;

  MismateModel.findByIdAndDelete(id, (err, mismate) => {
    if (err) res.json(err);
    if (mismate.matchId) updateMatchById(mismate.matchId);
    res.json(mismate);
  });
}

function updateMatchById(matchId) {
  MismateModel.findById(matchId, (err, match) => {
    if (err) console.error(err);

    const matchData = {
      sku: match.sku,
      side: match.side === 'left' ? 'right' : 'left',
      hasBox: !match.hasBox,
      matchId: null,
    }

    MismateModel.findOneAndUpdate(matchData, { matchId: match._id }, (err, updatedMatch) => {
      if (err) console.error(err);

      const updateData = {
        matchId: updatedMatch ? updatedMatch._id : null,
      }

      MismateModel.findByIdAndUpdate(matchId, updateData, (err, updatedMatch) => {
        if (err) console.error(err);
        return updatedMatch;
      })
    })
  })

  return undefined;
}

function updateTrackingById(mismateId, tracking) {
  MismateModel.findByIdAndUpdate(mismateId, { tracking }, (err, updatedMismate) => {
    if (err) console.error(err);
    return updatedMismate;
  });
}