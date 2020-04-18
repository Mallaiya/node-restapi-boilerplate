const mongoose = require('mongoose');

const ActivitiesSchema = new mongoose.Schema({
  email: String,
  ip: String,
  api: String,
  method: String,
  family: String,
  userAgent: String,
  time: Date
});

module.exports = ActivitiesSchema;
