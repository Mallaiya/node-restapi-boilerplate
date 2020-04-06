/**
 * JWT Decode Service
 */

/**
 * Dependancy Imports
 */
const JWT = require('jsonwebtoken');

class JWTDecode {
  static decode(payload) {
    return JWT.decode(payload);
  }
}

module.exports = JWTDecode;
