const MismateModel = require('../models/mismate.js');

const findMatch = (req, res, next) => {
    const user = req.user;
    const mismate = {
      sku: req.body.sku,
      side: req.body.side,
      hasBox: req.body.hasBox
    }
  
    MismateModel.findOne({
      sku: mismate.sku,
      side: mismate.side === 'left' ? 'right' : 'left',
      hasBox: !mismate.hasBox,
      matchId: null
    }, (err, match) => {
      if (err) res.json(err);
      //req.user object not persisting into callback?
      req.user = user;
      req.match = match;
      next();
    })
}

module.exports = findMatch;