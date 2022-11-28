const Joi = require('joi');

const id = Joi.string().required();
const rating = Joi.number().min(1).max(5).required();
const comment = Joi.string().min(5).max(100).required();

const ratingSchema = Joi.object({
  rating,
  comment,
});

const ratingId = Joi.object({
  id,
});

module.exports = { ratingSchema, ratingId };
