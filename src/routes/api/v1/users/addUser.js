/**
 * Add User Route
 */

/**
 * Dependancy Imports
 */
const ROUTER = require('express').Router();

/**
 * Custom Imports
 */
const { ADD_USER_CONTROLLER } = require('../../../../controllers/users');

const { InternalServerError } = require('../../../../utils/error');

class AddUserRouter {
  constructor(controller) {
    this.controller = controller;
    if (this.controller) this.init();
  }

  init() {
    /**
     *  ROUTE        /api/v1/user
     *  METHOD       POST
     *  DESCRIPTION  Create user
     *  */
    ROUTER.post('/', async (req, res) => {
      try {
        const { body } = req;
        const RESPONSE = await this.controller.create(body);
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
    return `/user`;
  }

  // Get Controller for the route
  getController() {
    return ADD_USER_CONTROLLER;
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
  return new AddUserRouter(controller);
};
