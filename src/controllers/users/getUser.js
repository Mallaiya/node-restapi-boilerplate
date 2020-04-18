/**
 * Get User Controller
 */

/**
 * Custom Imports
 */
const SEQUELIZE_MODEL = require('../../databases/postgres/models');

const { BadRequestError, DatabaseError } = require('../../utils/error');

class GetUserController {
  async get(credential) {
    try {
      let response = null;
      const { id } = credential;
      if (!id) {
        response = BadRequestError;
      } else {
        const queryResponse = await SEQUELIZE_MODEL.users.findOne({
          attributes: ['firstName', 'lastName', 'email', 'dob'],
          where: { id },
          raw: true
        });
        const data = { ...queryResponse };
        response = {
          code: 200,
          message: 'User data got successfully',
          data
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

module.exports = () => new GetUserController();
