/**
 * Add User Schema Validator
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
  },
  email: {
    type: 'string',
    presence: {
      allowEmpty: false,
      message: 'is required'
    },
    email: true
  },
  dob: {
    presence: {
      allowEmpty: false,
      message: 'is required'
    }
  },
  phoneNumber: {
    type: 'string',
    presence: {
      allowEmpty: false,
      message: 'is required'
    },
    format: {
      pattern: '[0-9]+',
      message: 'is not valid'
    }
  },
  password: {
    type: 'string',
    presence: {
      allowEmpty: false,
      message: 'is required'
    },
    length: {
      minimum: 8,
      message: 'must be at least 8 characters'
    }
  },
  confirmPassword: {
    type: 'string',
    presence: {
      allowEmpty: false,
      message: 'is required'
    },
    equality: 'password'
  }
};

module.exports = payload => VALIDATE(payload, CONSTAINTS);
