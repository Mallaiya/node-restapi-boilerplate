/**
 * JWT Service
 */
const JWT_SIGN = require('./sign');
const JWT_VERIFY = require('./verify');
const JWT_TOKEN = require('./token');
const JWT_DECODE = require('./decode');

module.exports = {
  JWT_SIGN,
  JWT_VERIFY,
  JWT_TOKEN,
  JWT_DECODE
};
