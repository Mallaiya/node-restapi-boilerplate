/**
 * JWT Sign Service
 */

/**
 * Dependancy Imports
 */
const JWT = require('jsonwebtoken');
const FS = require('fs');
const PATH = require('path');

const PRIVATE_KEY = FS.readFileSync(PATH.resolve(__dirname, '../../keys/jwt/private.pem'), 'utf8');
const { PASS_PHRASE } = process.env;

class JWTSign {
  // Default expiresIn 1 hour = 3600 seconds
  static sign(payload, expiresIn = 3600) {
    return JWT.sign(payload, { key: PRIVATE_KEY, passphrase: PASS_PHRASE }, { algorithm: 'RS256', expiresIn });
  }
}

module.exports = JWTSign;
