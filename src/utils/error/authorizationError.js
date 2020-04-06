/**
 * Authorization Error Handler
 */
class AuthorizationError extends Error {
  constructor({ code, message, type }) {
    super();
    this.code = code;
    this.message = message || 'Invalid Authorization';
    this.type = type || 'INTERNAL';
    if (this.type === 'EXTERNAL') {
      this.stack = null;
    }
  }
}

module.exports = AuthorizationError;
