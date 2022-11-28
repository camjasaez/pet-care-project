'use strict';
const errorHandler = (error) => {
  console.log(error.message);
  throw new Error(error.message);
};

module.exports = { errorHandler };
