const express = require('express');
const Order = require('../models/order');
const Customer = require('../models/customer');
const checkClientLogin = require('../utils/checkClientLogin');

const router = express.Router();

router.get('/client/order/view', checkClientLogin, async (req, res) => {
  const order = await Order.findOne().sort({ _id: -1 }).exec();
  const customer = await Customer.findById(order.customer).populate('measurements').exec();
  console.log(customer.measurements);
  res.render('client/vieworder', { customer: JSON.stringify(customer), measurements: JSON.stringify(customer.measurements) });
});

router.get('/client/order/details', checkClientLogin, async (req, res) => {
  const order = await Order.findOne().sort({ _id: -1 }).exec();
  res.render('client/orderdetails', order.garment);
});

router.get('/client/order/design', checkClientLogin, async (req, res) => {
  const order = await Order.findOne().sort({ _id: -1 }).exec();
  const customer = await Customer.findById(order.customer).populate('measurements').exec();
  res.render('client/design', { measurements: JSON.stringify(customer.measurements) });
});

module.exports = router;
