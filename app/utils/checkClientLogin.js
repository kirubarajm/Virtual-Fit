const Client = require('../models/client');

module.exports = async (req, res, next) => {
  if (req.user && await Client.findById(req.user.id).exec()) {
    return next();
  }
  return res.redirect('/client/login');
};
