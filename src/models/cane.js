const mongoose = require("mongoose");

const caneSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  SN: Number,
  time: String,
  location: {
    lat: String,
    lng: String
  },
  torch: Boolean,
  accelerometer: Boolean,
  gyroscope: Boolean,
  ultrasonic: Boolean,
  proximity: Boolean,
  battery: Boolean
});

module.exports = mongoose.model("Cane", caneSchema);
