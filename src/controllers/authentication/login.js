/**
 * Login Controller
 */

/**
 * Custom Imports
 */
const SEQUELIZE_MODEL = require('../../databases/postgres/models');
const { BCRYPT_COMPARE } = require('../../services/bcrypt');
const { JWT_TOKEN } = require('../../services/jwt');

class LoginController {
  async login(payload) {
    try {
      let response = null;
      const { email, password } = payload;

      // Check user found using email
      const queryResponse = await SEQUELIZE_MODEL.users.findOne({
        where: { email },
        attributes: ['id', 'firstName', 'lastName', 'email', 'password'],
        raw: true
      });
      if (!queryResponse) {
        response = {
          code: 404,
          message: `${email} not registered`
        };
      }

      // User found means authenticate using password validate password credentials
      const isPasswordValid = await BCRYPT_COMPARE.compareHash(password, queryResponse.password);
      if (!isPasswordValid) {
        // Password verified failed
        response = {
          code: 401,
          message: 'Invalid Login Credential'
        };
      } else {
        // Password verified means generate token
        const CREDENTIAL = {
          ...queryResponse
        };

        // Remove password from token payload
        delete CREDENTIAL.password;

        // Generate Tokens
        const [accessToken, refreshToken] = await JWT_TOKEN.createTokens(CREDENTIAL);

        // Remove password from credentials payload
        delete CREDENTIAL.id;

        const data = {
          ...CREDENTIAL,
          accessToken,
          refreshToken
        };

        response = {
          code: 200,
          message: `User logged in Successfully`,
          data
        };
      }

      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

module.exports = () => new LoginController();
