var express = require("express");
var router = express.Router();

const controllerName = "auth";
const MainModel = require(__path_models + controllerName);
const RegisterValidate = require(__path_validate + "auth.register");
const LoginValidate = require(__path_validate + "auth.login");

const { validateData } = require("../middleware/validate");
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
    console.log(rest);
    res.status(statusCode).json({
      ...rest,
    });
  })
);
module.exports = router;
