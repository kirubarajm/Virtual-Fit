const express = require('express');
const Order = require('../models/order');
const checkCustomerLogin = require('../utils/checkCustomerLogin');

const router = express.Router();

router.post('/customer/order', checkCustomerLogin, async (req, res) => {
  await Order.create({ customer: req.user.id, garment: req.body });
  res.redirect('/customer/measurement');
});


module.exports = router;
