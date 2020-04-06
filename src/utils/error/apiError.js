/**
 * API Error Handler
 */
class APIError extends Error {
  constructor({ code, message, type }) {
    super();
    this.code = code;
    this.message = message;
    this.type = type || 'INTERNAL';
    if (this.type === 'EXTERNAL') {
      this.stack = null;
    }
  }
}

module.exports = APIError;
