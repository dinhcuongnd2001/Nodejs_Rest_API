var express = require("express");
var router = express.Router();

const controllerName = "auth";
const MainModel = require(__path_models + controllerName);
const RegisterValidate = require(__path_validate + "auth.register");
const LoginValidate = require(__path_validate + "auth.login");
const ResetPassword = require(__path_validate + "auth.resetPassword");

const { validateData } = require("../middleware/validate");
const { protect } = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

const asyncHandler = require("../middleware/async");
const MainHandle = require("../utils/HandleObject");

router.post(
  "/register",
  RegisterValidate.CreateValidator(),
  validateData,
  asyncHandler(async (req, res, next) => {
    const token = await MainModel.create(req.body);
    res.status(201).json({
      success: true,
      notice: "Register Successfull",
      token,
    });
  })
);

router.post(
  "/login",
  LoginValidate.CreateValidator(),
  validateData,
  asyncHandler(async (req, res, next) => {
    const { statusCode, ...rest } = await MainModel.login(req.body);
    res.status(statusCode).json({
      ...rest,
    });
  })
);

router.get(
  "/me",
  protect,
  asyncHandler(async (req, res, next) => {
    res.status(200).json({
      success: "true",
      user: req.user,
    });
  })
);

router.post(
  "/forgotPassword",
  asyncHandler(async (req, res, next) => {
    // console.log(req.body);
    const { statusCode, ...rest } = await MainModel.forgotPassword(req.body);
    res.status(statusCode).json(rest);
  })
);

router.post(
  "/resetPassword/:resetToken",
  ResetPassword.ValidatePassword(),
  validateData,
  asyncHandler(async (req, res, next) => {
    const { statusCode, ...rest } = await MainModel.resetPassword({
      resetToken: req.params.resetToken,
      password: req.body.password,
    });
    res.status(statusCode).json(rest);
  })
);
module.exports = router;
