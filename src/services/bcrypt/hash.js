/**
 * Bcrypt Generate Hash Service
 */
const BCRYPT = require('bcrypt');

class BcryptHash {
  static generateHash(value, round = 12) {
    return BCRYPT.hashSync(value, round);
  }
}

module.exports = BcryptHash;
