/**
 * Drivers
 */

/**
 * Note:
 * Use open for initial drive connection load and don't mention if it is not to be loaded at initial
 * Use close for the automatic driver connection close
 */
const MONGOOSE_DRIVER = require('./mongoose.driver');
const SEQUELIZE_DRIVER = require('./sequelize.driver');

module.exports = {
  open: { MONGOOSE_DRIVER },
  close: { MONGOOSE_DRIVER, SEQUELIZE_DRIVER }
};
