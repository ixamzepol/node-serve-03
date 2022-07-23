
const config = require('../../config');
const winston = require('winston');

const transports = [];
transports.push(
new winston.transport.Console(),
);

const LoggerInstance = winston.createLogger({
  level: config.log.level,
  format: winston.format.simple(),
  transports
})

module.exports = LoggerInstance;