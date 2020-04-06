/**
 * Mongoose Driver
 */

/**
 * Dependancy Imports
 */
const MONGOOSE = require('mongoose');

// Load mongo config file data
const CONFIG = require('../configs').getConfig().mongo;

module.exports = class MongooseDriver {
  constructor() {
    this.connection = null;
  }

  // Create connection
  static async createConnection() {
    try {
      this.connection = await MONGOOSE.connect(CONFIG.uri, CONFIG.options);
      return Promise.resolve(this.connection);
    } catch (error) {
      global.logger.error(`Error in mongoose connection | ${global.env.toUpperCase()}`);
      return Promise.reject(error);
    }
  }

  // Close connection
  static closeConnection() {
    if (this.connection) {
      this.connection.disconnect();
      this.connection = null;
    }
    return this.connection;
  }
};
