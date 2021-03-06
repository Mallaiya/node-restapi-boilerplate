/**
 * Config load file to start up configuration json depending
 * upon the node environment
 */

class Configs {
  // Get Config file
  getConfig() {
    // eslint-disable-next-line security/detect-non-literal-require
    return require(`${__dirname}/config.${global.env || 'development'}.json`);
  }
}

module.exports = new Configs();
