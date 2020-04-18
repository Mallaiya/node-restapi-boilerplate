/**
 * Dependancy Imports
 */
const JWT = require('jsonwebtoken');
const FS = require('fs');
const PATH = require('path');

// eslint-disable-next-line security/detect-non-literal-fs-filename
const PUBLIC_KEY = FS.readFileSync(PATH.resolve(__dirname, '../../keys/jwt/public.pem'), 'utf8');

class JWTVerify {
  static verify(payload) {
    try {
      return Promise.resolve(JWT.verify(payload, PUBLIC_KEY, { algorithms: ['RS256'] }));
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        const INVALID_AUTHORIZATION = { code: 401, message: 'Invalid Authorization', type: 'EXTERNAL' };
        return Promise.reject(INVALID_AUTHORIZATION);
      }
      return Promise.reject(error);
    }
  }
}

module.exports = JWTVerify;
