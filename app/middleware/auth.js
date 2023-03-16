const { PRIVATE_KEY } = require("../configs/system");
const asyncHandler = require("../middleware/async");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/ErrorResponse");
const protect = asyncHandler((req, res, next) => {
  let token = "";
  if (
    req.headers.authorization
    // req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) return next(new ErrorResponse(401, "Let's Login Please"));
  try {
    const decode = jwt.verify(token, PRIVATE_KEY);
    next();
  } catch (error) {
    return next(new ErrorResponse(401, "Let's Login Please"));
  }
});

module.exports = protect;
