'use strict';

const CareModel = require('../../../db/models/care.model');
const CareTakerModel = require('../../../db/models/careTaker.model');
const PetModel = require('../../../db/models/pet.model');

const { careSchema, careId } = require('../../schemas/care.schema');
const { sucessResponse, errorResponse } = require('../../../utils/responses');

async function getCare(req, res) {
  try {
    const cares = await CareModel.find().populate('pets').populate('careTaker');
    const statusCode = cares.length === 0 ? 204 : 200;
    sucessResponse(req, res, 'Care', cares, statusCode);
  } catch (error) {
    console.log(error);
    errorResponse(req, res, 'Error to get the cares', 500);
  }
}

async function createCare(req, res) {
  try {
    const myCareTaker = await CareTakerModel.findById(req.params.idCareTaker);
    if (!myCareTaker) {
      throw new Error('Care Taker not found');
    }

    const { error } = careSchema.validate(req.body);
    if (error) {
      errorResponse(req, res, `Care => ${error} `, 400);
      return;
    }

    const care = new CareModel(req.body);
    const newCare = await care.save();

    care.careTaker = myCareTaker;
    await care.save();

    if (!newCare) {
      throw new Error('Care has not been added');
    }

    sucessResponse(req, res, 'Care Created', newCare, 201);
  } catch (error) {
    console.log(error);
    errorResponse(req, res, 'Care has not been added', 500);
  }
}

// async function addPets(req,res){
//   try {

//   } catch (error) {

//   }

// }

module.exports = { getCare, createCare };
