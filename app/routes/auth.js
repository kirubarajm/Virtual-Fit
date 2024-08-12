const express = require('express');
const passport = require('passport');
const Client = require('../models/client');
const Customer = require('../models/customer');
const loginUtil = require('../utils/login');

const router = express.Router();

router.get('/customer/login', (req, res) => {
  res.render('customer/login');
});
router.get('/customer/register', (req, res) => {
  res.render('customer/register');
});

router.get('/client/login', (req, res) => {
  res.render('client/login');
});

router.get('/client/register', (req, res) => {
  res.render('client/register');
});

router.post('/client/register', (req, res) => {
  const newClient = {
    username: req.body.username,
    email: req.body.email,
    location: req.body.location,
  };
  Client.register(new Client(newClient), req.body.password, (err) => {
    if (err) {
      res.redirect('/client/register');
    } else {
      passport.authenticate('local')(req, res, () => res.redirect('/client/login'));
    }
  });
});

router.post('/customer/register', (req, res) => {
  const newCustomer = {
    username: req.body.username,
    email: req.body.email,
    mobileNumber: req.body.mobile_number,
  };
  Customer.register(new Customer(newCustomer), req.body.password, (err) => {
    if (err) {
      res.redirect('/customer/register');
    } else {
      passport.authenticate('local')(req, res, () => res.redirect('/customer/login'));
    }
  });
});

router.post('/client/login', passport.authenticate('client',
  {
    failureRedirect: '/client/login',
    successRedirect: '/client/order/view',
  }));

router.post('/customer/login', passport.authenticate('customer',
  {
    failureRedirect: '/customer/login',
    successRedirect: '/customer/measurement',
  }));

router.post('/customer/login', async (req, res, next) => {
  await loginUtil(req, res, next, 'customer');
});

router.post('/client/logout', (req, res) => {
  req.logout();
  res.status(200).json({
    type: 'Success',
    error: '',
  });
});

router.post('/customer/logout', (req, res) => {
  req.logout();
  res.status(200).json({
    type: 'Success',
    error: '',
  });
});

module.exports = router;
