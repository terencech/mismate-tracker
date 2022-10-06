const MismateModel = require('../models/mismate.js');

exports.createMismate = async (req, res) => {
  const { sku, side, hasBox } = req.body;
  const matchId = req.match ? req.match._id : null;
  const matchUser = req.match ? req.match.matchUser : null;
  const userId = req.user._id;
  const userName = req.user.username;

  MismateModel.create({
    userId,
    userName,
    sku,
    side,
    hasBox,
    matchId,
    matchUser
  }, (err, mismate) => {
    if (err) res.json(err);
    if (matchId) {
      MismateModel.findByIdAndUpdate(matchId, { matchId: mismate._id, matchUser: mismate.userName }, (err, match) => {
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

  const update = {
    sku: req.body.sku,
    side: req.body.side,
    hasBox: req.body.hasBox,
    tracking: req.body.tracking,
    matchId: req.match ? req.match._id : null,
    matchUser: req.match ? req.match.userName : null
  }

  MismateModel.findByIdAndUpdate(req.body.id, update, (err, mismate) => {
    if (err) res.json(err);

    if (req.match) {
      MismateModel.findByIdAndUpdate(req.match._id, { matchId: mismate._id, matchUser: mismate.userName }, (err, updatedMismate) => {
        if (err) res.json(err);
      })
    }
    if (mismate.matchId) {
      MismateModel.findById(mismate.matchId, (err, match) => {
        findNewMatchAndUpdate(match, (err, newMatch) => {
          if (err) res.json(err);
          const newMatchParams = {
            matchId: newMatch ? newMatch._id : null,
            matchUser: newMatch ? newMatch.userName : null
          }
          MismateModel.findByIdAndUpdate(match._id, newMatchParams, (err, updatedMatch) => {
            if (err) res.json(err);
            res.json(mismate);
          });
        })
      })
    } else res.json(mismate);
  });
}

exports.deleteMismate = async (req, res) => {
  const id = req.body.id;

  MismateModel.findByIdAndDelete(id, (err, mismate) => {
    if (err) res.json(err);
    if (mismate.matchId) {
      MismateModel.findById(mismate.matchId, (err, match) => {
        if (err) res.json(mismate);
        findNewMatchAndUpdate(match, (err, newMatch) => {
          if (err) res.json(err);
          const update = {
            matchId: newMatch ? newMatch._id : null,
            matchUser: newMatch ? newMatch.userName : null
          }
          MismateModel.findByIdAndUpdate(match._id, update, (err, updatedMatch) => {
            if (err) res.json(err);
            res.json(mismate);
          });
        })
      })
    } else res.json(mismate);
  });
}

function findNewMatchAndUpdate(mismate, callback) {
  const matchParams = {
    sku: mismate.sku,
    side: mismate.side === 'left' ? 'right' : 'left',
    hasBox: !mismate.hasBox,
    matchId: null
  }
  
  const update = {
    matchId: mismate._id,
    matchUser: mismate.userName
  }
  
  MismateModel.findOneAndUpdate(matchParams, update, (err, match) => {
    callback(err, match);
  })
}