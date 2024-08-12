const express = require('express');
const multer = require('multer');
const path = require('path');
const Customer = require('../models/customer');
const Measurement = require('../models/measurement');
const checkCustomerLogin = require('../utils/checkCustomerLogin');
const getMeasurements = require('../utils/getMeasurements');

const pathh = path.resolve(__dirname, '../../storage', 'images');
const imageUploads = multer({ dest: pathh });
const router = express.Router();


router.get('/customer/measurement', checkCustomerLogin, async (req, res) => {
  const customer = await Customer.findById(req.user.id).exec();
  res.render('customer/measurement', { measurementSet: !!customer.imagePath });
});

router.post('/customer/measurement/', checkCustomerLogin, imageUploads.single('image'), async (req, res) => {
  try {
    await Measurement.deleteMany({ id: req.user.measurements });
    const measurement = await Measurement.create({ shoulder: req.body.shoulder });
    await Customer.findByIdAndUpdate(req.user.id, {
      imagePath: req.file.path,
      measurements: measurement.id,
    });
    const calculatedMeasurements = (await getMeasurements(req.file.path)).toString();
    await Measurement.findByIdAndUpdate(measurement.id, JSON.parse(calculatedMeasurements)).exec();
    res.redirect('/customer/measurement');
  } catch (error) {
    res.redirect('/customer/measurement');
  }
});

router.get('/customer/getmeasurements', async (req, res) => {
  const customer = await Customer.findById(req.user.id).populate('measurements').exec();
  return res.status(200).json({
    ...customer.measurements,
  });
});

router.get('/customer/customize', checkCustomerLogin, async (req, res) => {
  res.render('customer/customizer', { isAmazon: false, clothId: 0 });
});

router.get('/customer/amazon', checkCustomerLogin, async (req, res) => {
  res.render('customer/amazon');
});

router.get('/customer/amazon/customize/:id', checkCustomerLogin, async (req, res) => {
  res.render('customer/customizer', { isAmazon: true, clothId: req.params.id });
});

module.exports = router;
