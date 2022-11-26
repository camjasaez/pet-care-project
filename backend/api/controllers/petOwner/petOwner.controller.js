'use strict';
const PetOwnerModel = require('../../../db/models/petOwner.model');
const { sucessResponse, errorResponse } = require('../../../utils/responses');
const { petOwnerSchema, getOwnerId } = require('../../schemas/petOwner.schema');

/**
 * @name getPetOwners
 * @description Get all pet owners
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
async function getPetOwners(req, res) {
  try {
    const petOwners = await PetOwnerModel.find();
    const statusCode = petOwners.length === 0 ? 204 : 200;
    sucessResponse(req, res, 'Pet Owners', petOwners, statusCode);
  } catch (error) {
    errorResponse(req, res, 'Pet owners have not been brought in', 500);
  }
}

/**
 * @name getPetOwnerById
 * @description Get a pet owner by id
 * @param {Object} req - Request object 
 * @param {object} res - Response object
 */
async function getPetOwnerById(req, res) {
  try {
    const petOwner = await PetOwnerModel.findById({
      _id: req.params.id,
    });
    const statusCode = petOwner.length === 0 ? 204 : 200;
    sucessResponse(req, res, 'Pet Owner', petOwner, statusCode);
  } catch (error) {
    errorResponse(req, res, 'Pet owner not found', 404);
  }
}


/**
 * @name createPetOwner
 * @description Create a new pet owner
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
async function createPetOwner(req, res) {
  try {
    const { error } = petOwnerSchema.validate(req.body);
    if (error) {
      errorResponse(req, res, `Pet Owner => ${error} `, 400);
      return;
    }
    const petOwner = new PetOwnerModel(req.body);
    const petOwnerCreated = await petOwner.save();
    if (!petOwnerCreated) {
      throw new Error('Pet Owner not created');
    }
    sucessResponse(req, res, 'Pet Owner Created', petOwnerCreated, 201);
  } catch (error) {
    console.error(error.message);
    errorResponse(req, res, 'Pet Owner not created', 500);
  }
}

/**
 * @name removePetOwners
 * @description Remove a pet owner
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
async function removePetOwners(req, res) {
  try {
    const { error } = getOwnerId.validate(req.params);
    if (error) {
      errorResponse(req, res, 'Pet Owner Id not valid', 400);
      return;
    }
    const petOwner = await PetOwnerModel.findByIdAndRemove({
      _id: req.params.id,
    });

    if (!petOwner) {
      errorResponse(req, res, 'Pet Owner not found', 404);
      return;
    }
    sucessResponse(req, res, 'Pet Owner Removed', petOwner, 200);
  } catch (error) {
    console.error(error.message);
    errorResponse(req, res, 'Pet Owner not Removed', 500);
  }
}

/**
 * @name modifyPetOwner
 * @description Modify a pet owner
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
async function modifyPetOwner(req, res) {
  try {
    const { error: errorBody } = petOwnerSchema.validate(req.body);
    if (errorBody) {
      errorResponse(req, res, `Pet Owner => ${errorBody} `, 400);
      return;
    }
    const { error: errorParams } = getOwnerId.validate(req.params);
    if (errorParams) {
      errorResponse(req, res, 'Pet Owner Id not valid', 400);
      return;
    }
    const petOwner = await PetOwnerModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
    );
    if (!petOwner) {
      throw new Error('Pet Owner not found');
    }
    sucessResponse(req, res, 'Pet Owner Modified', petOwner, 200);
  } catch (error) {
    console.error(error.message);
    errorResponse(req, res, 'Pet Owner not updated', 500);
  }
}

module.exports = {
  getPetOwners,
  getPetOwnerById,
  createPetOwner,
  removePetOwners,
  modifyPetOwner,
};
