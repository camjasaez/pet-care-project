'use strict';

const Pet = require('../../../db/models/pet.model');
const PetOwnerModel = require('../../../db/models/petOwner.model');

const { PetSchema, petId } = require('../../schemas/pet.schema');
const { sucessResponse, errorResponse } = require('../../../utils/responses');

/**
 * @name getPets
 * @description Get all pets
 * @param {Object} req request for GET method to obtain pets
 * @param {Object} res response for GET method to obtain pets
 */
async function getPets(req, res) {
  try {
    const pets = await Pet.find();
    const statusCode = pets.length === 0 ? 204 : 200;
    sucessResponse(req, res, 'Pet', pets, statusCode);
  } catch (error) {
    errorResponse(res, res, 'Pet has not been added', 500);
  }
}

/**
 * @name createPet
 * @description Create a new pet
 * @param {Object} req request for POST method to create a new pet
 * @param {Object} res response for POST method to create a new pet
 */

async function createPet(req, res) {
  try {
    const { error } = PetSchema.validate(req.body);
    if (error) {
      errorResponse(req, res, `Pet => ${error} `, 400);
      return;
    }
    const pet = new Pet(req.body);
    const newPet = await pet.save();

    const petOwner = await PetOwnerModel.findById(req.params.idownerPet);
    if (!petOwner) {
      throw new Error('Pet Owner not found');
    }
    petOwner.pets.push(newPet);
    await petOwner.save();

    if (!newPet) {
      throw new Error('Pet has not been added');
    }
    sucessResponse(req, res, 'Pet Created', pet, 201);
  } catch (error) {
    errorResponse(req, res, 'Pet has not been added', 500);
  }
}

/**
 * @name getPet
 * @description Get a pet by id
 * @param {Object} req request for GET method to obtain a pet
 * @param {Object} res response for GET method to obtain a pet
 */

async function getPet(req, res) {
  try {
    const pet = await Pet.findById(req.params.id);
    const statusCode = pet.length === 0 ? 200 : 404;
    sucessResponse(req, res, 'Pet found', pet, statusCode);
  } catch (error) {
    errorResponse(req, res, 'Pet has not been added', 500);
  }
}

/**
 * @name modifyPetOwner
 * @description Modify a pet owner
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */

async function updatePet(req, res) {
  try {
    const { error: errorBody } = PetSchema.validate(req.body);
    if (errorBody) {
      errorResponse(req, res, `Pet Owner => ${errorBody} `, 400);
      return;
    }
    const { error: errorParams } = petId.validate(req.params);
    if (errorParams) {
      errorResponse(req, res, `Pet Id not valid`, 400);
      return;
    }
    const pet = await Pet.findByIdAndUpdate({ _id: req.params.id }, req.body);
    if (!pet) {
      throw new Error('Pet has not been updated');
    }
    sucessResponse(req, res, 'Pet updated', pet, 200);
  } catch (error) {
    errorResponse(req, res, 'Pet has not been updated', 500);
  }
}

/**
 * @name deletePet
 * @description Delete a pet by id
 * @param {Object} req request for DELETE method to delete a pet
 * @param {Object} res response for DELETE method to delete a pet
 */

async function deletePet(req, res) {
  try {
    const { error } = petId.validate(req.params);
    if (error) {
      errorResponse(req, res, `Pet Id not valid`, 400);
      return;
    }

    const pet = await Pet.findByIdAndDelete({ _id: req.params.id });

    if (!pet) {
      throw new Error('Pet not found');
    }
    sucessResponse(req, res, 'Pet deleted', pet, 200);
  } catch (error) {
    errorResponse(req, res, error.message);
  }
}

module.exports = { getPets, createPet, getPet, updatePet, deletePet };
