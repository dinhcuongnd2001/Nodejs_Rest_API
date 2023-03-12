var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const MainHandle = require("../utils/HandleObject");

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

router.put(
  "/like/:id",
  asyncHandler(async (req, res, next) => {
    const data = await MainModel.listItem(
      { id: req.params.id },
      { task: "one" }
    );
    const career = await MainModel.event(req.params, data.like + 1, {
      task: "like",
    });

    const updateCareer = await MainModel.listItem(
      { id: req.params.id },
      { task: "one" }
    );

    res.status(200).json({
      message: "success",
      metaData: MainHandle.getFields(updateCareer, [
        "id",
        "name",
        "title",
        "like",
      ]),
    });
  })
);

router.put(
  "/dislike/:id",
  asyncHandler(async (req, res, next) => {
    const data = await MainModel.listItem(
      { id: req.params.id },
      { task: "one" }
    );
    const dislike = data.dislike + 1;
    const career = await MainModel.event(req.params, dislike, {
      task: "dislike",
    });

    const updateCareer = await MainModel.listItem(
      { id: req.params.id },
      { task: "one" }
    );

    res.status(200).json({
      message: "success",
      metaData: MainHandle.getFields(updateCareer, [
        "id",
        "name",
        "title",
        "like",
        "dislike",
      ]),
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
