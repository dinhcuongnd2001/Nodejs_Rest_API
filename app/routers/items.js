var express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");

const controllerName = "items";
const MainModel = require(__path_models + controllerName);

router.get("/", async (req, res, next) => {
  try {
    const data = await MainModel.listItem({}, { task: "all" });
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const data = await MainModel.listItem(
      { id: req.params.id },
      { task: "one" }
    );
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

router.post("/add", async (req, res, next) => {
  try {
    let params = [];
    params.id = makeId();
    params.name = req.body.name;
    params.status = req.body.status;
    const data = await MainModel.create(params);
    res.status(201).json({
      success: true,
      notice: "them thanh cong",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
});

router.put("/edit/:id", async (req, res, next) => {
  try {
    console.log(req.params.id);
    const data = await MainModel.editItem(req.params, req.body, {
      task: "edit",
    });

    res.status(200).json({
      success: true,
      notice: "Update thanh cong",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const data = await MainModel.deleteItem(req.params, { task: "one" });
    res.status(200).json({
      success: true,
      notice: "Xoa thanh cong",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
});

module.exports = router;

const makeId = () => {
  return uuidv4();
};
