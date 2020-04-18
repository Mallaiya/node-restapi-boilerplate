/**
 * JWT Token Services
 */

/**
 * Dependancy Imports
 */
const LODASH = require('lodash');

/**
 * Custom Imports
 */
const JWT_SIGN = require('./sign');
const JWT_VERIFY = require('./verify');
const SEQUELIZE_MODEL = require('../../databases/postgres/models');

const { AuthorizationError } = require('../../utils/error');

class JWTToken {
  static createTokens(payload) {
    try {
      const ACCESS_TOKEN = JWT_SIGN.sign({ user: LODASH.pick(payload, ['id', 'firstName', 'lastName', 'email']) });
      const REFRESH_TOKEN = JWT_SIGN.sign({ user: LODASH.pick(payload, ['id']) }, '7d');
      return Promise.all([ACCESS_TOKEN, REFRESH_TOKEN]);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async generateTokens(payload) {
    try {
      const { refreshToken: REFRESH_TOKEN } = payload;
      const {
        user: { id }
      } = await JWT_VERIFY.verify(REFRESH_TOKEN);
      if (!id) {
        throw new AuthorizationError({ code: 401, message: 'Invalid Authorization', type: 'EXTERNAL' });
      }
      const USER_CREDENTIALS = await SEQUELIZE_MODEL.users.findOne({
        where: { id },
        raw: true,
        attributes: ['id', 'firstName', 'lastName', 'email']
      });
      if (!USER_CREDENTIALS) {
        throw new AuthorizationError({ code: 401, message: 'Invalid Authorization', type: 'EXTERNAL' });
      }
      const [accessToken, refreshToken] = await JWTToken.createTokens(USER_CREDENTIALS);

      return Promise.resolve([accessToken, refreshToken]);
    } catch (error) {
      global.logger.error(error);
      if (error.code === 401) {
        return Promise.reject(error);
      }
      const INVALID_AUTHORIZATION = { code: 401, message: 'Invalid Authorization', type: 'EXTERNAL' };
      return Promise.reject(INVALID_AUTHORIZATION);
    }
  }
}

module.exports = JWTToken;
