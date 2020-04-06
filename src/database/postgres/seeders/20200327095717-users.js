const MODELS = require('../models');
const { USER_MOCK_DATA } = require('../../../__mocks__/data');
const { BCRYPT_HASH } = require('../../../services/bcrypt');

module.exports = {
  up: async () => {
    // Hash Password before seeding all data
    for (let index = 0; index < USER_MOCK_DATA.length; index++) {
      USER_MOCK_DATA[index].password = await BCRYPT_HASH.generateHash(USER_MOCK_DATA[index].password);
    }
    return MODELS.users.bulkCreate(USER_MOCK_DATA);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
