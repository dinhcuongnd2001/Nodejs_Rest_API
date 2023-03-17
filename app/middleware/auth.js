const { PRIVATE_KEY } = require("../configs/system");
const asyncHandler = require("../middleware/async");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/ErrorResponse");
const UserModel = require("../models/users");
const protect = asyncHandler(async (req, res, next) => {
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
    req.user = await UserModel.listItem({ id: decode.id }, { task: "one" });
    next();
  } catch (error) {
    return next(new ErrorResponse(401, "Let's Login Please"));
  }
});

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorResponse(401, "Yout Cann't access here!"));
    }
    next();
  };
};

module.exports = {
  protect,
  authorize,
};
