'use strict';

const RatingModel = require('../../../db/models/rating.model');
const { ratingSchema, ratingId } = require('../../schemas/rating.schema');

const { sucessResponse, errorResponse } = require('../../../utils/responses');

/**
 * @name createRating
 * @description Create a rating
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
async function createRating(req, res) {
  try {
    const { error: errorBody } = ratingSchema.validate(req.body);
    if (errorBody) {
      errorResponse(req, res, `Rating body => ${errorBody}`, 400);
      return;
    }

    const rating = new RatingModel(req.body);
    const newRating = await rating.save();

    if (!newRating) {
      errorResponse(req, res, 'Rating not created', 500);
      return;
    }

    sucessResponse(req, res, 'Rating created', rating, 201);
  } catch (error) {
    errorResponse(req, res, 'Error to create the rating', 500);
  }
}

/**
 * @name getAllRating
 * @description Get all rating
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
async function getAllRating(req, res) {
  try {
    const rating = await RatingModel.find();
    const statusCode = rating.length === 0 ? 204 : 200;

    sucessResponse(req, res, 'Ratings', rating, statusCode);
  } catch (error) {
    errorResponse(req, res, 'Error to get the rating', 500);
  }
}

/**
 * @name getRatingById
 * @description Get a rating by id
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
async function getRatingById(req, res) {
  try {
    const { error: errorParams } = ratingId.validate(req.params);
    if (errorParams) {
      errorResponse(req, res, `Rating params => ${errorParams}`, 400);
      return;
    }

    const rating = await RatingModel.findById({ _id: req.params.id });

    if (!rating) {
      errorResponse(req, res, 'Rating not found', 404);
      return;
    }

    sucessResponse(req, res, 'Rating found', rating, 200);
  } catch (error) {
    errorResponse(req, res, 'Error to get the rating', 500);
  }
}

module.exports = {
  createRating,
  getAllRating,
  getRatingById,
};
