const Joi = require ('joi');

const id = Joi.string().required();
const rut = Joi.string().required();
const name = Joi.string().min(3).max(30).required();
const number = Joi.string().min(3).max(30).required();

const careTakerSchema = Joi.object({
    rut,
    name,
    number,
}); 

const getCareTakerId = Joi.object({
    id,
});

module.exports = { careTakerSchema, getCareTakerId };