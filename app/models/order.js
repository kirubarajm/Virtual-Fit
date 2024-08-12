const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },
  garment: {
    material: Number,
    collar: Number,
    cuff: Number,
    sleeve: Number,
    pocket: Number,
    twill: Number,
    pattern: Number,
  },
});

module.exports = mongoose.model('Order', orderSchema);
