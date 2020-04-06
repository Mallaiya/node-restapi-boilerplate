/**
 * Elasticsearch Driver
 */

/**
 * Dependancy Imports
 */
const ELASTICSEARCH = require('elasticsearch');

// Load postgres config file data
const CONFIG = require('../configs').getConfig().elasticsearch;

module.exports = class ElasticsearchDriver {
  constructor() {
    this.connection = null;
  }

  // Create connection
  static async createConnection() {
    try {
      this.connection = await new ELASTICSEARCH.Client(CONFIG);
      await this.connection.ping({ requestTimeout: 1000 }).catch(error => {
        throw error;
      });
      return Promise.resolve(this.connection);
    } catch (error) {
      global.logger.error(`Error in elastic search connection | ${global.env.toUpperCase()}`);
      return Promise.reject(error);
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
