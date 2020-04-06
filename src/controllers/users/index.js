/**
 * User Controller Modules
 */
const ADD_USER_CONTROLLER = require('./addUser')();
const UPDATE_USER_CONTROLLER = require('./updateUser')();
const GET_USER_CONTROLLER = require('./getUser')();

module.exports = {
  ADD_USER_CONTROLLER,
  UPDATE_USER_CONTROLLER,
  GET_USER_CONTROLLER
};
