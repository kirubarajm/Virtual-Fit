const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const customerSchema = new mongoose.Schema({
  username: String,
  email: String,
  imagePath: String,
  measurements: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Measurement',
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  }],
  mobileNumber: String,
});

customerSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Customer', customerSchema);
