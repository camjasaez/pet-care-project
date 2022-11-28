const Joi = require('joi');

const id = Joi.string().required();
const name = Joi.string().min(2).max(30).required();
const animal = Joi.string().min(2).max(30).required();
const breed = Joi.string().min(2).max(30).required();
const description = Joi.string().required();

const PetSchema = Joi.object({
  name,
  animal,
  breed,
  description,
});

const petId = Joi.object({
  id,
});

module.exports = { PetSchema, petId };
