var express = require("express");
var router = express.Router();

const controllerName = "auth";
const MainModel = require(__path_models + controllerName);
const MainValidate = require(__path_validate + controllerName);
const { validateData } = require("../middleware/validate");
const { body, validationResult } = require("express-validator");

const asyncHandler = require("../middleware/async");
const MainHandle = require("../utils/HandleObject");

router.post(
  "/register",
  MainValidate.CreateValidator(),
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
module.exports = router;
