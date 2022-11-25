'use strict';

const { errorHandler } = require('../../../utils/errorHandler');
const { sucessResponse } = require('../../../utils/responses');

/**
 * @name healthCheck
 * @description A simple function to check if the server is running
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @param {Function} next A callback to the next middleware
 */
module.exports = function healthCheck(req, res, next) {
  try {
    sucessResponse(req, res, 200, {
      serverState: 'Running',
    });
  } catch (error) {
    errorHandler(error);
  }
};
