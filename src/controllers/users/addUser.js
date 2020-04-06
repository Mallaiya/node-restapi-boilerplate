/**
 * Add User Controller
 */

/**
 * Custom Imports
 */
const SEQUELIZE_MODEL = require('../../database/postgres/models');
const { ADD_USER_VALIDATOR } = require('../../utils/validator/users');

const { DatabaseError, ValidatorError } = require('../../utils/error');

class AddUserController {
  async create(payload) {
    try {
      let response = null;

      // Define unnecessary payload properties to remove
      const removePayloadProperties = ['confirmPassword'];
      const DATA = payload;

      // Validate payload data
      const isError = await ADD_USER_VALIDATOR(DATA);
      if (isError) {
        throw new ValidatorError({ code: 403, message: 'Validation Error', type: 'EXTERNAL', error: isError });
      }

      // Remove unnecessary payload properties
      Object.keys(payload).map(key => {
        if (removePayloadProperties.includes(key)) {
          // eslint-disable-next-line security/detect-object-injection
          delete DATA[key];
        }
        return null;
      });

      // Find Email already exists or create new user
      const { email } = DATA;
      const [queryResponse, isUserCreated] = await SEQUELIZE_MODEL.users.findOrCreate({
        where: { email },
        raw: true,
        attributes: ['email'],
        defaults: { ...DATA }
      });

      if (!isUserCreated) {
        response = {
          code: 406,
          message: `${queryResponse.email} already exists`
        };
      } else {
        response = {
          code: 200,
          message: `User created Successfully`
        };
      }

      return Promise.resolve(response);
    } catch (error) {
      if (error.name === 'SequelizeDatabaseError') {
        throw new DatabaseError({ code: 403, message: error.message, type: 'EXTERNAL' });
      }
      return Promise.reject(error);
    }
  }
}

module.exports = () => new AddUserController();
