const { GeneralError } = require('../utils/errors');

const errorsHandler = (err, req, res, next) => {
  let status = 500;
  let message = 'Internal error';

  if (err instanceof GeneralError) {
    status = err.getCode();
    message = err.message;
  }

  return res.status(status).json({
    message
  });
}

module.exports = errorsHandler;