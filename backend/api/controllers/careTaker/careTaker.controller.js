'use strict';
const CareTakerModel = require('../../../db/models/careTaker.model');
const { sucessResponse, errorResponse } = require('../../../utils/responses');
const {
  careTakerSchema,
  getCareTakerId,
} = require('../../schemas/careTaker.schemas');

/**
 * @name careTaker
 * @description Get all careTakers
 * @param {*} req -request objec
 * @param {*} res - response object
 */
async function getCareTakers(req, res) {
  try {
    const careTakers = await CareTakerModel.find();
    const statusCode = careTakers.length === 0 ? 204 : 200;
    sucessResponse(req, res, 'Care Takers', careTakers, statusCode);
  } catch (error) {
    errorResponse(req, res, 'Care takers have not been brought in', 500);
  }
}

/**
 * @name getCareTakerByRut
 * @description Get careTaker by rut
 * @param {*} req -request objec
 * @param {*} res -response object
 */
async function getCareTakerById(req, res) {
  try {
    const careTaker = await CareTakerModel.findById({
      _id: req.params.id,
    });
    const statusCode = careTaker.length === 0 ? 204 : 200;
    sucessResponse(req, res, 'Care Taker', careTaker, statusCode);
  } catch (error) {
    errorResponse(req, res, 'Care taker not found', 404);
  }
}

/**
 * @name createCareTaker
 * @description Create a new careTaker
 * @param {*} req -request objec
 * @param {*} res -response object
 * @returns
 */

async function createCareTaker(req, res) {
  try {
    const { error } = careTakerSchema.validate(req.body);
    if (error) {
      errorResponse(req, res, `Care Taker => ${error} `, 400);
      return;
    }
    const careTaker = new CareTakerModel(req.body);
    const careTakerCreated = await careTaker.save();
    if (!careTakerCreated) {
      throw new Error('Care Taker not created');
    }
    sucessResponse(req, res, 'Care Taker Created', careTakerCreated, 201);
  } catch (error) {
    console.error(error.message);
    errorResponse(req, res, 'Care Taker not created', 500);
  }
}

/**
 * @name modifyCareTaker
 * @description Modify a careTaker
 * @param {*} req -request objec
 * @param {*} res -response object
 * @returns
 */
async function modifyCareTaker(req, res) {
  try {
    const { error: errorBody } = careTakerSchema.validate(req.body);
    if (errorBody) {
      errorResponse(req, res, `Care Taker => ${errorBody} `, 400);
      return;
    }
    const { error: errorParams } = getCareTakerId.validate(req.params);
    if (errorParams) {
      errorResponse(req, res, `Care Taker Id not valid`, 400);
      return;
    }
    const careTaker = await CareTakerModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
    );
    if (!careTaker) {
      throw new Error('Care Taker not found');
    }
    sucessResponse(req, res, 'Care Taker Modified', careTaker, 200);
  } catch (error) {
    console.error(error.message);
    errorResponse(req, res, 'Care Taker not update', 500);
  }
}

/**
 * @name deleteCareTaker
 * @description Delete a careTaker
 * @param {*} req -request objec
 * @param {*} res -response object
 */

async function deleteCareTaker(req, res) {
  try {
    const careTaker = await CareTakerModel.findByIdAndDelete(req.params.id);
    if (!careTaker) {
      throw new Error('Care Taker not deleted');
    }
    sucessResponse(req, res, 'Care Taker Deleted', careTaker, 200);
  } catch (error) {
    console.error(error.message);
    errorResponse(req, res, 'Care Taker not deleted', 500);
  }
}

module.exports = {
  getCareTakers,
  getCareTakerById,
  createCareTaker,
  modifyCareTaker,
  deleteCareTaker,
};
