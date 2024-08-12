const express = require('express');
const authRoutes = require('./auth');
const orderRoutes = require('./order');
const clientRoutes = require('./client');
const measureRoutes = require('./measure');

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/customer/measurement');
});

router.use(authRoutes);
router.use(clientRoutes);
router.use(orderRoutes);
router.use(measureRoutes);

module.exports = router;
