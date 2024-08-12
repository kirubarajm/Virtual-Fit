const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema({
  shoulder: Number,
  shirtHeight: Number,
  hand: Number,
  collar: Number,
  chest: Number,
  stomach: Number,
  hip: Number,
});

module.exports = mongoose.model('Measurement', measurementSchema);
