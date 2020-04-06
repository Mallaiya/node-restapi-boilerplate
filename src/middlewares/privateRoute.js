/* eslint-disable complexity */
/**
 * Private Route Middleware
 */

/**
 * Custom Imports
 */
const { JWT_TOKEN, JWT_VERIFY, JWT_DECODE } = require('../services/jwt');
const { AuthorizationError, InternalServerError } = require('../utils/error');

module.exports = async (req, res, next) => {
  try {
    if (
      !req.headers ||
      !req.headers['authorization'] ||
      !req.headers['authorization'].includes('Bearer') ||
      !req.headers['refresh-token']
    ) {
      throw new AuthorizationError({ code: 401, message: 'Invalid Authorization', type: 'EXTERNAL' });
    }
    const ACCESS_TOKEN = req.headers['authorization'].split(' ')[1];
    const { user } = await JWT_VERIFY.verify(ACCESS_TOKEN);
    if (!user) {
      throw new AuthorizationError({ code: 401, message: 'Invalid Authorization', type: 'EXTERNAL' });
    }
    const { id, firstName, lastName, email } = user;

    if (!id || !firstName || !lastName || !email) {
      throw new AuthorizationError({ code: 401, message: 'Invalid Authorization', type: 'EXTERNAL' });
    }
    // Valid token means set user credentials details in request
    req.headers.credential = { ...user };
    return next();
  } catch (error) {
    // Token Expired means genrate new token by validating
    if (error.name === 'TokenExpiredError') {
      const TOKEN_PAYLOAD = {
        accessToken: req.headers['authorization'].split(' ')[1],
        refreshToken: req.headers['refresh-token']
      };
      const [accessToken, refreshToken] = await JWT_TOKEN.generateTokens(TOKEN_PAYLOAD);
      // Set tokens by expose headers
      res.set('Access-Control-Expose-Headers', 'x-access-token, x-refresh-token');
      res.set('x-access-token', accessToken);
      res.set('x-refresh-token', refreshToken);
      const { user } = JWT_DECODE.decode(accessToken);
      req.headers.credential = { ...user };
      return next();
    }
    if (error.type === 'EXTERNAL' && error.code === 401) {
      delete error.type;
      return res.status(error.code).json(error);
    }
    global.logger.error(error);
    return res.status(InternalServerError.code).json(InternalServerError);
  }
};
