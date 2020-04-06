/**
 * Login Route
 */

/**
 * Dependancy Imports
 */
const ROUTER = require('express').Router();

/**
 * Custom Imports
 */
const { LOGIN_CONTROLLER } = require('../../../../controllers/authentication');

const { InternalServerError } = require('../../../../utils/error');

class LoginRouter {
  constructor(controller) {
    this.controller = controller;
    if (this.controller) this.init();
  }

  init() {
    /**
     *  ROUTE        /api/v1/user/auth/login
     *  METHOD       POST
     *  DESCRIPTION  Auth Login
     *  */
    ROUTER.post('/', async (req, res) => {
      try {
        const { body } = req;
        const RESPONSE = await this.controller.login(body);
        if (RESPONSE.data) {
          return res.status(RESPONSE.code).json(RESPONSE);
        }
        return res.status(RESPONSE.code).json(RESPONSE);
      } catch (error) {
        if (error.type === 'EXTERNAL') {
          delete error.type;
          return res.status(error.code).json(error);
        }
        global.logger.error(error);
        return res.status(InternalServerError.code).json(InternalServerError);
      }
    });
  }

  // Get Route
  getRoutes() {
    return `/auth/login`;
  }

  // Get Controller for the route
  getController() {
    return LOGIN_CONTROLLER;
  }

  // Get Router
  getRouter() {
    return ROUTER;
  }

  // Get Route mode
  getMode() {
    return 'public';
  }
}

module.exports = controller => {
  return new LoginRouter(controller);
};
