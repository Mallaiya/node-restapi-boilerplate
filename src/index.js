/**
 * Standard Express Application and Handlers
 */

/**
 * Dependancy imports
 */
const EXPRESS = require('express');
const BODY_PARSER = require('body-parser');
const COMPRESSION = require('compression');
const CORS = require('cors');
const EXPRESS_STATUS_MONITOR = require('express-status-monitor');
const EXPRESS_RATE_LIMITER = require('express-rate-limit');
const HELMET = require('helmet');
const HPP = require('hpp');
const MONGO_SANITIZE = require('express-mongo-sanitize');
const XSS = require('xss-clean');

const APPLICATION = EXPRESS();

/**
 * Custom imports
 */

const DRIVERS = require('./drivers');
const ROUTES = require('./routes')(); // Imported with all Routers
const CONTROLLERS = require('./controllers')(); // Imported with all controllers
const API_VERSION = require('./configs').getConfig().apiVersion;
const { PRIVATE_ROUTES, ACTIVITY_LOGS } = require('./middlewares');

class ExpressApplication {
  async init() {
    await this.initDrivers();
    this.initExpress();
    this.initControllers();
    this.initRoutes();
  }

  // Initialize Drivers
  async initDrivers() {
    try {
      const CONNECTION = DRIVERS.open;
      const DRIVER_KEYS = Object.keys(CONNECTION);
      for (let i = 0; i < DRIVER_KEYS.length; i++) {
        // eslint-disable-next-line security/detect-object-injection
        await CONNECTION[DRIVER_KEYS[i]].createConnection();
      }
      global.logger.info(`Drivers initialized | ${global.env.toUpperCase()}`);
      return Promise.resolve();
    } catch (error) {
      global.logger.error(error);
      global.logger.error(`Drivers initialize failed | ${global.env.toUpperCase()}`);
      return Promise.reject();
    }
  }

  // Initialize Express Handlers
  initExpress() {
    // Set security HTTP headers
    APPLICATION.use(HELMET());
    // Limit request from same IP
    APPLICATION.use(
      '/',
      EXPRESS_RATE_LIMITER({
        max: 500,
        windowMs: 60 * 60 * 1000,
        message: 'Too many request from this IP, IP blocked please try later'
      })
    );
    // Express realtime server monitor
    APPLICATION.use(EXPRESS_STATUS_MONITOR()); // Check realtime server metrics for Express based node servers use ip/status
    // Payload compresser
    APPLICATION.use(COMPRESSION());
    // Cross origin controller
    APPLICATION.use(CORS());
    // Body parser
    APPLICATION.use(BODY_PARSER.json({ limit: '2MB' })); // supports upto 2MB JSON encoded payloads
    APPLICATION.use(
      BODY_PARSER.urlencoded({
        extended: true
      })
    );
    // Data sanitization against mongo query injection
    APPLICATION.use(MONGO_SANITIZE());
    // Data sanitization against XSS
    APPLICATION.use(XSS());
    // Prevent parameter pollution
    APPLICATION.use(HPP());
    // API activity log
    APPLICATION.use(ACTIVITY_LOGS);
    global.logger.info(`Express handlers initialized | ${global.env.toUpperCase()}`);
  }

  // Initialize Express Controllers
  initControllers() {
    CONTROLLERS.forEach(controller => {
      const EXPRESS_CONTROLLER = `${controller.constructor.name[0].toLowerCase()}${controller.constructor.name.slice(1)}`;
      // eslint-disable-next-line security/detect-object-injection
      this[EXPRESS_CONTROLLER] = controller;
    });
    global.logger.info(`Controllers initialized | ${global.env.toUpperCase()}`);
  }

  // Initialize Express Routes
  initRoutes() {
    // Public Routes
    ROUTES.forEach(route => {
      if (route.getMode() === 'public') APPLICATION.use(`${API_VERSION}${route.getRoutes()}`, route.getRouter());
    });

    // Private Routes Authorization Middleware
    APPLICATION.use(PRIVATE_ROUTES);

    // Private Routes
    ROUTES.forEach(route => {
      if (route.getMode() === 'private') APPLICATION.use(`${API_VERSION}${route.getRoutes()}`, route.getRouter());
    });

    // Static file Routes
    APPLICATION.use('/static', EXPRESS.static(`${__dirname}/public`, { maxAge: '28 days' }));

    // Undefined Routes Handler
    APPLICATION.use('*', (req, res, err) => {
      if (err) {
        res.status(404).json({
          code: 404,
          msg: `Cannot find ${req.originalUrl} Please try again!!!`
        });
        res.end();
      }
    });
    global.logger.info(`Routes initialized | ${global.env.toUpperCase()}`);
  }

  // Driver close handler
  closeDrivers() {
    try {
      const CONNECTION = DRIVERS.close;
      const DRIVER_KEYS = Object.keys(CONNECTION);
      DRIVER_KEYS.forEach(key => {
        // eslint-disable-next-line security/detect-object-injection
        CONNECTION[key].closeConnection();
      });
    } catch (error) {
      global.logger.error(error);
      global.logger.error(`Drivers termination failed | ${global.env.toUpperCase()}`);
    }
  }
}

module.exports = {
  ExpressApplication,
  APPLICATION
};
