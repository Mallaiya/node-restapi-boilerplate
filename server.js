/**
 * Standard Server Configurations and Handlers
 */

/**
 * Global node environments
 */
global.env = process.env.NODE_ENV || 'development';

/**
 * Import dotenv file depending upon the global node environment
 */
require('dotenv').config({
  path: `.env.${global.env}`
});

/**
 * Import Logger Module
 */
require('./src/services/logger').LOGGER.init();

/**
 * Dependancy imports
 */
const HTTP = require('http');

/**
 * Custom imports
 */
const { PORT } = process.env;
const { APPLICATION, ExpressApplication } = require('./src');

// Create Server
const SERVER = HTTP.createServer();
const EXPRESS_APPLICATION = new ExpressApplication();

// Server close handler
function closeServer(code) {
  EXPRESS_APPLICATION.closeDrivers();
  SERVER.close(() => {
    process.exit(code);
  });
}

// Server request handlers
SERVER.on('request', APPLICATION)
  .on('listening', () => {
    global.logger.warn(`Server started in port ${PORT} | ${global.env.toUpperCase()}`);
  })
  .on('error', error => {
    global.logger.error(`${error}`);
    closeServer(1);
  })
  .listen(PORT, () => {
    global.logger.info(`Server is running in port ${PORT} | ${global.env.toUpperCase()}`);
    EXPRESS_APPLICATION.init();
  });

// Server process handlers
process.on('uncaughtException', error => {
  global.logger.fatal(`Uncaught Exception: ${error}`);
  closeServer(1);
});

process.on('unhandledRejection', (error, promise) => {
  global.logger.fatal('Unhandled rejection at ', promise, `reason: ${error.message}`);
  closeServer(1);
});

process.on('SIGTERM', signal => {
  global.logger.fatal(`Process ${process.pid} received a SIGTERM signal | ${signal}`);
  closeServer(0);
});

process.on('SIGINT', signal => {
  global.logger.fatal(`Process ${process.pid} has been interrupted | ${signal}`);
  closeServer(0);
});

process.on('beforeExit', code => {
  // Only for Asynchronous calls
  global.logger.fatal(`Process will exit with code: ${code}`);
  closeServer(code);
});

process.on('exit', code => {
  // Only for synchronous calls
  global.logger.fatal(`Process exited with code: ${code}`);
  closeServer(code);
});
