const { Schema, model } = require('mongoose');

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  animal: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = model('Pet', petSchema);
