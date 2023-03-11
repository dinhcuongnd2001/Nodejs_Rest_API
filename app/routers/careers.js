var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");

const controllerName = "careers";
const MainModel = require(__path_models + controllerName);
const MainValidate = require(__path_validate + controllerName);
const { validateData } = require("../middleware/validate");

const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/ErrorResponse");

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const data = await MainModel.listItem(req.query, { task: "all" });
    res.status(201).json({
      success: true,
      data: data,
    });
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const data = await MainModel.listItem(
      { id: req.params.id },
      { task: "one" }
    );
    console.log("data ::", data);
    res.status(201).json({
      success: true,
      data: data,
    });
  })
);

router.post(
  "/add",
  MainValidate.CreateValidator(),
  validateData,
  asyncHandler(async (req, res, next) => {
    const data = await MainModel.create(req.body);
    res.status(201).json({
      success: true,
      notice: "them thanh cong",
      data: data,
    });
  })
);

router.put(
  "/edit/:id",
  MainValidate.EditValidator(),
  validateData,
  asyncHandler(async (req, res, next) => {
    console.log(req.params.id);
    const data = await MainModel.editItem(req.params, req.body, {
      task: "edit",
    });

    res.status(200).json({
      success: true,
      notice: "Update thanh cong",
      data: data,
    });
  })
);

router.delete(
  "/delete/:id",
  asyncHandler(async (req, res, next) => {
    const data = await MainModel.deleteItem(req.params, { task: "one" });
    res.status(200).json({
      success: true,
      notice: "Xoa thanh cong",
      data: data,
    });
  })
);

module.exports = router;
