/**
 * Sequelize Driver
 */

/**
 * Dependancy Imports
 */
const SEQUELIZE = require('sequelize');

// Load postgres config file data
const CONFIG = require('../configs').getConfig().postgres;

module.exports = class SequelizeDriver {
  constructor() {
    this.connection = null;
  }

  // Create connection
  static createConnection() {
    try {
      this.connection = new SEQUELIZE(CONFIG);
      return this.connection;
    } catch (error) {
      global.logger.error(`Error in sequelize connection | ${global.env.toUpperCase()}`);
      return error;
    }
  }

  // Close connection
  static closeConnection() {
    if (this.connection) {
      this.connection.close();
      this.connection = null;
    }
  }
};
