/**
 * Dependancy imports
 */

const GLOB = require('glob');

// Exclude index js from glob usage
const EXCULDE = 'index.js';

// API Version
const API_VERSION = require('../configs/index').getConfig().apiVersion;

module.exports = () =>
  GLOB.sync('**/*.js', { cwd: `${__dirname}${API_VERSION}` })
    .map(filename => {
      if (!filename.includes(EXCULDE)) {
        // eslint-disable-next-line security/detect-non-literal-require
        const ROUTE = require(`.${API_VERSION}/${filename}`);
        return ROUTE(ROUTE().getController());
      }
      return null;
    })
    .filter(require => require);
