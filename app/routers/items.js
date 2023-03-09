var express = require("express");
var router = express.Router();

const controllerName = "items";
const MainModel = require(__path_models + controllerName);
const asyncHandler = require("../middleware/async");

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    let param = [];
    if (req.query.order) param["order"] = req.query.order;
    if (req.query.keySearch) param["keySearch"] = req.query.keySearch;
    if (req.query.status) param["status"] = req.query.status;
    const data = await MainModel.listItem(param, { task: "all" });
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
    res.status(201).json({
      success: true,
      data: data,
    });
  })
);

router.post(
  "/add",
  asyncHandler(async (req, res, next) => {
    let params = [];
    params.name = req.body.name;
    params.status = req.body.status;
    const data = await MainModel.create(params);
    res.status(201).json({
      success: true,
      notice: "them thanh cong",
      data: data,
    });
  })
);

router.put(
  "/edit/:id",
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
