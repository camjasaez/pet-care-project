const { Schema, model } = require('mongoose');

const petOwnerSchema = new Schema({
  rut: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
    unique: true,
  },

});

module.exports = model('PetOwner', petOwnerSchema);
