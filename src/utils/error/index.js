/**
 * Standard Error utils
 */
const APIError = require('./apiError');
const AuthorizationError = require('./validationError');
const DatabaseError = require('./databaseError');
const ValidatorError = require('./validationError');

const BadRequestError = require('./badRequestError');
const InternalServerError = require('./internalServerError');

module.exports = {
  APIError,
  AuthorizationError,
  BadRequestError,
  DatabaseError,
  InternalServerError,
  ValidatorError
};
