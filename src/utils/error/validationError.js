/**
 * Validation Error Handler
 */
class ValidationError extends Error {
  constructor({ code, message, type, error }) {
    super();
    this.code = code;
    this.message = message;
    this.type = type || 'INTERNAL';
    this.error = error;
    if (this.type === 'EXTERNAL') {
      this.stack = null;
    }
  }
}

module.exports = ValidationError;
