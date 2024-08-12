const Customer = require('../models/customer');

module.exports = async (req, res, next) => {
  if (req.user && await Customer.findById(req.user.id).exec()) {
    return next();
  }
  return res.redirect('/customer/login');
};
