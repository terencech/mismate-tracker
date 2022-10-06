const MismateModel = require('../models/mismate.js');

const findMatch = (req, res, next) => {
    const user = req.user;

    const matchParams = {
      sku: Number(req.body.sku),
      side: req.body.side === 'left' ? 'right' : 'left',
      hasBox: req.body.hasBox === 'true' ? false : true,
      matchId: null
    }
  
    MismateModel.findOne(matchParams, (err, match) => {
      if (err) res.json(err);
      //req.user object not persisting into callback?
      req.user = user;
      req.match = match;
      next();
    })
}

module.exports = findMatch;