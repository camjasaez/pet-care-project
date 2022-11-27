const Joi = require('joi');

const id = Joi.string().required();
const entryDate = Joi.date();
const exitDate = Joi.date().default(null);
const withdrawn = Joi.boolean().default(false);
const pet = Joi.string().required();
const careTaker = Joi.string().required();

const careSchema = Joi.object({
  entryDate,
  exitDate,
  withdrawn,
  careTaker,
  pet,
});

const careId = Joi.object({
  id,
});

module.exports = { careSchema, careId };
