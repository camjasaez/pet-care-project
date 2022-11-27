const Joi = require('joi');

const id = Joi.string().required();
const withdrawn = Joi.boolean().default(false).required();
const pet = Joi.string().required();

const careSchema = Joi.object({
  pet,
});

const careId = Joi.object({
  id,
});

const careWithdrawPetSchema = Joi.object({
  withdrawn,
});

module.exports = { careSchema, careId, careWithdrawPetSchema };
