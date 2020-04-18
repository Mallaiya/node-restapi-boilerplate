/**
 * Dependancy imports
 */
const GLOB = require('glob');
const PATH = require('path');
const MONGOOSE = require('mongoose');

// Exclude index js from glob usage
const EXCULDE = 'index.js';

const DB = GLOB.sync('**/*.js', { cwd: `${__dirname}` })
  .map(filename => {
    if (!filename.includes(EXCULDE)) {
      return {
        // eslint-disable-next-line security/detect-non-literal-require
        schema: require(`./${filename}`),
        name: PATH.basename(filename).replace(PATH.extname(filename), '')
      };
    }
    return null;
  })
  .filter(require => require)
  .map(({ name, schema }) => MONGOOSE.model(name, schema))
  .reduce((db, model) => {
    return {
      ...db,
      [model.modelName]: model
    };
  }, {});

module.exports = DB;
