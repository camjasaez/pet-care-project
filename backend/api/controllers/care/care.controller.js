'use strict';

const CareModel = require('../../../db/models/care.model');
const CareTakerModel = require('../../../db/models/careTaker.model');
const PetModel = require('../../../db/models/pet.model');

const { careSchema, careId } = require('../../schemas/care.schema');
const { sucessResponse, errorResponse } = require('../../../utils/responses');

async function getCare(req, res) {
  try {
    const cares = await CareModel.find();
    const statusCode = cares.length === 0 ? 204 : 200;
    sucessResponse(req, res, 'Care', cares, statusCode);
  } catch (error) {
    console.log(error);
    errorResponse(req, res, 'Error to get the cares', 500);
  }
}

async function createCare(req, res) {
  try {
    const mybody = {
      careTaker: req.params.idCareTaker,
      pet: req.params.idPet,
      ...req.body,
    };

    const { error } = careSchema.validate(mybody);
    if (error) {
      errorResponse(req, res, `Care => ${error} `, 400);
      return;
    }

    const care = new CareModel(mybody);
    const newCare = await care.save();

    if (!newCare) {
      throw new Error('Care has not been added');
    }

    sucessResponse(req, res, 'Care Created', newCare, 201);
  } catch (error) {
    errorResponse(req, res, 'Care has not been added', 500);
  }
}

module.exports = { getCare, createCare };
