/**
 * Update User Controller
 */

/**
 * Custom Imports
 */
const SEQUELIZE_MODEL = require('../../databases/postgres/models');
const { UPDATE_USER_VALIDATOR } = require('../../utils/validator/users');

const { DatabaseError, ValidatorError } = require('../../utils/error');

class UpdateUserController {
  async update(payload, credential) {
    try {
      let response = null;
      const { id } = credential;
      const DATA = payload;
      // Validate payload data
      const isError = await UPDATE_USER_VALIDATOR(DATA);
      if (isError) {
        throw new ValidatorError({ code: 403, message: 'Validation Error', type: 'EXTERNAL', error: isError });
      }
      const { firstName, lastName } = DATA;
      const [queryResponse] = await SEQUELIZE_MODEL.users.update({ firstName, lastName }, { where: { id } });
      if (queryResponse && queryResponse > 0) {
        response = {
          code: 200,
          message: `User updated successfully`
        };
      } else {
        response = {
          code: 404,
          message: `Update failed User not found`
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

module.exports = () => new UpdateUserController();
