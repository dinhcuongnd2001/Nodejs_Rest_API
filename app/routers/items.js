var express = require("express");
var router = express.Router();
const protect = require("../middleware/auth");

const controllerName = "items";
const MainModel = require(__path_models + controllerName);
const MainValidate = require(__path_validate + controllerName);
const { validateData } = require("../middleware/validate");
const { body, validationResult } = require("express-validator");

const asyncHandler = require("../middleware/async");
const MainHandle = require("../utils/HandleObject");

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    let param = [];
    if (req.query.order) param["order"] = req.query.order;
    if (req.query.keySearch) param["keySearch"] = req.query.keySearch;
    if (req.query.status) param["status"] = req.query.status;
    const data = await MainModel.listItem(param, { task: "all" });
    const result = data.map((each) =>
      MainHandle.getFields(each, ["_id", "name", "email", "careers"])
    );
    res.status(201).json({
      success: true,
      metaData: result,
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
    res.status(201).json({
      success: true,
      data: MainHandle.getFields(data, ["_id", "name", "email", "careers"]),
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
  protect,
  MainValidate.EditValidator(),
  validateData,
  asyncHandler(async (req, res, next) => {
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
