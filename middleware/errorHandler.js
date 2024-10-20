const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(`Erro: ${err.message}`);
  res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = errorHandler;
