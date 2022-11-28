const { Schema, model } = require('mongoose');

const careTakerSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  rut: {
    type: String,
    require: true,
    unique: true,
  },
  number: {
    type: String,
    require: true,
    unique: true,
  },
});
module.exports = model('CareTaker', careTakerSchema);
