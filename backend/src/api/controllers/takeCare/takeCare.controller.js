'use strict';

const TakeCareModel = require('../../../db/models/takeCare.model');
const { takeCareSchema, takeCareId } = require('../../schemas/takeCare.schema');
const { sucessResponse, errorResponse } = require('../../../utils/responses');

/**
 * @name getTakeCare
 * @description Get all take cares
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
async function getTakeCare(req, res) {
  try {
    const takeCares = await TakeCareModel.find()
      .populate('careTaker')
      .populate('cares');

    const statusCode = takeCares.length === 0 ? 204 : 200;

    sucessResponse(req, res, 'Take Care created', takeCares, statusCode);
  } catch (error) {
    console.log(error);
    errorResponse(req, res, 'Error to get the take cares', 500);
  }
}

/**
 * @name getTakeCareById
 * @description Get a take care by id
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
async function getTakeCareById(req, res) {
  try {
    const { error: errorParams } = takeCareId.validate(req.params);
    if (errorParams) {
      errorResponse(req, res, `Take care params => ${errorParams} `, 400);
      return;
    }

    const takeCare = await TakeCareModel.findById({ _id: req.params.id })
      .populate('careTaker')
      .populate('cares');

    if (!takeCare) {
      errorResponse(req, res, 'Take care not found', 404);
      return;
    }

    sucessResponse(req, res, 'Take Care created', takeCare, 200);
  } catch (error) {
    console.log(error);
    errorResponse(req, res, 'Error to get the take cares', 500);
  }
}

/**
 * @name createTakeCare
 * @description Create a new take care
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
async function createTakeCare(req, res) {
  try {
    const { error: errorBody } = takeCareSchema.validate(req.body);
    if (errorBody) {
      errorResponse(req, res, `Take Care body => ${errorBody} `, 400);
      return;
    }

    const takeCare = new TakeCareModel(req.body);
    const newTakeCare = await takeCare.save();

    if (!newTakeCare) {
      errorResponse(req, res, 'The new take care has not been added', 500);
      return;
    }

    sucessResponse(req, res, 'Take Care Created', newTakeCare, 201);
  } catch (error) {
    console.log(error);
    errorResponse(req, res, 'Error when trying to create a new take care', 500);
  }
}

module.exports = { getTakeCare, createTakeCare, getTakeCareById };
