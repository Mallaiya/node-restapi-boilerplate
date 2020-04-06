/**
 * Get User Route
 */

/**
 * Dependancy Imports
 */
const ROUTER = require('express').Router();
const { UPDATE_USER_CONTROLLER } = require('../../../../controllers/users');

/**
 * Custom Imports
 */
const { InternalServerError } = require('../../../../utils/error');

class UpdateUserRouter {
  constructor(controller) {
    this.controller = controller;
    if (this.controller) this.init();
  }

  init() {
    /**
     *  ROUTE        /api/v1/user
     *  METHOD       PUT
     *  DESCRIPTION  Update user
     *  */
    ROUTER.put('/', async (req, res) => {
      try {
        const {
          body,
          headers: { credential }
        } = req;
        const RESPONSE = await this.controller.update(body, credential);
        return res.status(RESPONSE.code).json(RESPONSE);
      } catch (error) {
        if (error.type === 'EXTERNAL') {
          delete error.type;
          return res.status(error.code).json(error);
        }
        // global.logger.error(error);
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
    return UPDATE_USER_CONTROLLER;
  }

  // Get Router
  getRouter() {
    return ROUTER;
  }

  // Get Route mode
  getMode() {
    return 'private';
  }
}

module.exports = controller => {
  return new UpdateUserRouter(controller);
};
