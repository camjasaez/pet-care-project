const Joi = require('joi');

const id = Joi.string().required();
const rut = Joi.string().required();
const name = Joi.string().min(3).max(30).required();
const lastName = Joi.string().min(3).max(30).required();
const number = Joi.string().min(3).max(30).required();
const email = Joi.string().min(3).max(30).required();
const address = Joi.string().min(3).max(30).required();

const petOwnerSchema = Joi.object({
  rut,
  name,
  lastName,
  number,
  email,
  address,
});

const getOwnerId = Joi.object({
  id,
});

module.exports = { petOwnerSchema, getOwnerId };
