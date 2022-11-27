const Joi = require('joi');

const id = Joi.string().required();
const careTaker = Joi.string().required();
const cares = Joi.array().items(Joi.string().required()).required();

const takeCareSchema = Joi.object({
  careTaker,
  cares,
});

const takeCareId = Joi.object({
  id,
});

module.exports = { takeCareSchema, takeCareId };
