/* eslint-disable security/detect-object-injection */
/* eslint-disable security/detect-non-literal-fs-filename */

/**
 * Dependancy imports
 */
const FS = require('fs');
const PATH = require('path');
const SEQUELIZE = require('sequelize');

const SEQUELIZE_DRIVER = require('../../../drivers/sequelize.driver');

const sequelize = SEQUELIZE_DRIVER.createConnection();

const BASENAME = PATH.basename(__filename);

const DB = {};

FS.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== BASENAME && file.slice(-3) === '.js';
  })
  .forEach(file => {
    const model = sequelize['import'](PATH.join(__dirname, file));
    DB[model.name] = model;
  });

Object.keys(DB).forEach(modelName => {
  if (DB[modelName].associate) {
    DB[modelName].associate(DB);
  }
});

DB.sequelize = sequelize;
DB.Sequelize = SEQUELIZE;

module.exports = DB;
