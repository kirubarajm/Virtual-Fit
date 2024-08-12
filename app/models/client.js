const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const clientSchema = new mongoose.Schema({
  username: String,
  email: String,
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  }],
  location: String,
});

clientSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Client', clientSchema);
