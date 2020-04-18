/**
 * Activity Logs Middleware
 */

/**
 * Dependancy Imports
 */
const { getClientIp } = require('request-ip');

/**
 * Custom Imports
 */
const MONGOOSE_MODEL = require('../databases/mongo/model');
const { JWT_DECODE } = require('../services/jwt');
const { BadRequestError } = require('../utils/error');

module.exports = (req, res, next) => {
  try {
    const CREDENTIALS =
      req.headers && req.headers['authorization'] && req.headers['authorization'].includes('Bearer')
        ? JWT_DECODE.decode(req.headers['authorization'].split(' ')[1])
        : null;
    const activities = {
      email: CREDENTIALS && CREDENTIALS.user ? CREDENTIALS.user.email : 'Unknown',
      ip: getClientIp(req),
      api: req.originalUrl,
      method: req.method,
      family: req.connection.remoteFamily,
      userAgent: req.headers['user-agent'],
      time: new Date()
    };
    const document = MONGOOSE_MODEL.activities(activities);
    document.save();
    return next();
  } catch (err) {
    return res.status(BadRequestError.code).json(BadRequestError);
  }
};
