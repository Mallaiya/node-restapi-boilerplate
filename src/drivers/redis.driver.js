/**
 * Redis Driver
 */

/**
 * Dependancy Imports
 */
const REDIS = require('redis');

// Load postgres config file data
const CONFIG = require('../configs').getConfig().redis;

module.exports = class RedisDriver {
  constructor() {
    this.connection = null;
  }

  // Create connection
  static async createConnection() {
    try {
      this.connection = await REDIS.createClient(CONFIG);
      this.connection.on('error', error => {
        global.logger.error(`Error in redis connection, ${error} | ${global.env.toUpperCase()}`);
        throw error;
      });
      return Promise.resolve(this.connection);
    } catch (error) {
      global.logger.error(`Error in redis connection | ${global.env.toUpperCase()}`);
      return Promise.reject(error);
    }
  }

  // Get connection
  static getConnection() {
    return this.connection;
  }

  // Close connection
  static closeConnection() {
    if (this.connection) {
      this.connection.quit();
      this.connection = null;
    }
  }
};
