const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const propertySchema = new Schema({
  property: { type: String },
  contact: { type: Number, unique: true },
  area: { type: Number },
  daysLeft: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Assests", propertySchema);
