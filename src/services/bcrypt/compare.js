/**
 * Bcrypt Compare Service
 */
const BCRYPT = require('bcrypt');

class BcryptCompare {
  static compareHash(value, hash) {
    return BCRYPT.compareSync(value, hash);
  }
}

module.exports = BcryptCompare;
