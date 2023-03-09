const ErrorResponse = require("../utils/ErrorResponse");
const notify = require("../configs/notify");
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  if (err.name == "CastError") {
    let message = notify.ERROR_CASTERROR;
    error = new ErrorResponse(404, message);
  }
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "SERVER ERROR",
  });
};

module.exports = errorHandler;
