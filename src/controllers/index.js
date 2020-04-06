/**
 * Dependancy imports
 */
const GLOB = require('glob');

// Exclude index js from glob usage
const EXCULDE = 'index.js';

module.exports = () =>
  GLOB.sync('**/*.js', { cwd: `${__dirname}/` })
    .map(filename => {
      if (!filename.includes(EXCULDE)) {
        // eslint-disable-next-line security/detect-non-literal-require
        return require(`./${filename}`)();
      }
      return null;
    })
    .filter(require => require);
