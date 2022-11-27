'use strict';

const CareModel = require('../../../db/models/care.model');

const {
  careSchema,
  careId,
  careWithdrawPetSchema,
} = require('../../schemas/care.schema');
const { sucessResponse, errorResponse } = require('../../../utils/responses');

/**
 * @name getCare
 * @description Get all cares
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
async function getCare(req, res) {
  try {
    const cares = await CareModel.find().populate('pet');

    const statusCode = cares.length === 0 ? 204 : 200;

    sucessResponse(req, res, 'Care', cares, statusCode);
  } catch (error) {
    console.log(error);
    errorResponse(req, res, 'Error to get the cares', 500);
  }
}

/**
 * @name getCareByPet
 * @description Get by id cares
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @returns
 */
async function getCareById(req, res) {
  try {
    const { error: errorParams } = careId.validate(req.params);
    if (errorParams) {
      errorResponse(req, res, `Care params => ${errorParams} `, 400);
      return;
    }

    const care = await CareModel.findById({ _id: req.params.id }).populate(
      'pet',
    );

    if (!care) {
      errorResponse(req, res, 'Care not found', 404);
      return;
    }

    sucessResponse(req, res, 'Care found', care, 200);
  } catch (error) {
    console.log(error);
    errorResponse(req, res, 'No care has been provided', 500);
  }
}

/**
 * @name createCare
 * @description Create a new care
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
async function createCare(req, res) {
  try {
    const { error: errorBody } = careSchema.validate(req.body);
    if (errorBody) {
      errorResponse(req, res, `Care body => ${errorBody} `, 400);
      return;
    }

    const care = new CareModel(req.body);
    const newCare = await care.save();

    if (!newCare) {
      errorResponse(req, res, 'The new care has not been added', 500);
      return;
    }

    sucessResponse(req, res, 'Care Created', newCare, 201);
  } catch (error) {
    console.log(error);
    errorResponse(req, res, 'Error when trying to create a care', 500);
  }
}

/**
 * @name deleteCare
 * @description Delete a care
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @returns
 */
async function deleteCare(req, res) {
  try {
    const { error: errorParams } = careId.validate(req.params);
    if (errorParams) {
      errorResponse(req, res, `Care params => ${errorParams} `, 400);
      return;
    }

    const care = await CareModel.findByIdAndDelete({ _id: req.params.id });

    if (!care) {
      errorResponse(req, res, 'The care has not been deleted', 500);
      return;
    }

    sucessResponse(req, res, 'Care Deleted', care, 200);
  } catch (error) {
    console.log(error);
    errorResponse(req, res, 'Error when trying to delete a care', 500);
  }
}

/**
 * @name withdrawPet
 * @description Withdraw a pet from a care
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
async function withdrawPet(req, res) {
  try {
    const { error: errorParams } = careId.validate(req.params);
    if (errorParams) {
      errorResponse(req, res, `Care params => ${errorParams} `, 400);
      return;
    }

    const { error: bodyError } = careWithdrawPetSchema.validate(req.body);
    if (bodyError) {
      errorResponse(req, res, `Care body => ${bodyError} `, 400);
      return;
    }

    let myBody;
    if (req.body.withdrawn === true) {
      myBody = {
        withdrawn: req.body.withdrawn,
        exitDate: new Date(),
        ...req.body,
      };
    } else {
      myBody = {
        withdrawn: req.body.withdrawn,
        exitDate: null,
        ...req.body,
      };
    }

    const care = await CareModel.findByIdAndUpdate(
      { _id: req.params.id },
      myBody,
    );

    if (!care) {
      errorResponse(
        req,
        res,
        'The pet has not been withdrawn, because the pet was not found.',
        404,
      );
      return;
    }

    sucessResponse(req, res, 'Pet retirated', care, 200);
  } catch (error) {
    console.log(error);
    errorResponse(req, res, 'Error when trying to withdraw a pet', 500);
  }
}

module.exports = { getCare, createCare, deleteCare, withdrawPet, getCareById };
