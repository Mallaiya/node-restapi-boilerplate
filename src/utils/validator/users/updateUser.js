/**
 * Update User Schema Validator
 */

const VALIDATE = require('validate.js');

const CONSTAINTS = {
  firstName: {
    type: 'string',
    presence: {
      allowEmpty: false,
      message: 'is required'
    }
  },
  lastName: {
    type: 'string',
    presence: {
      allowEmpty: false,
      message: 'is required'
    }
  }
};

module.exports = payload => VALIDATE(payload, CONSTAINTS);
