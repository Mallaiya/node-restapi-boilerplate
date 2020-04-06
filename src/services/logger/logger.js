/* eslint-disable security/detect-non-literal-fs-filename */

/**
 * Dependancy imports
 */
const LOG4JS = require('log4js');
const FS = require('fs');

class Logger {
  constructor() {
    this.init();
  }

  init() {
    const LOGGER_DIR = './logger';
    // Create logger directory if does not exists
    if (!FS.existsSync(LOGGER_DIR)) {
      FS.mkdirSync(LOGGER_DIR);
    }
    LOG4JS.configure({
      appenders: {
        console: { type: 'stdout' },
        [global.env]: {
          type: 'file',
          filename: `${LOGGER_DIR}/${global.env}.log`,
          keepFileExt: true,
          maxLogSize: 20480000,
          backups: 10
        }
      },
      categories: {
        default: { appenders: ['console', global.env], level: 'debug' }
      }
    });
    // Set logger to node global
    global.logger = LOG4JS.getLogger(global.env);
  }
}

module.exports = new Logger();
