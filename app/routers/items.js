var express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");

const controllerName = "items";
const MainModel = require(__path_models + controllerName);

router.get("/", (req, res, next) => {
  res.send("Get all Item");
});

router.get("/:id", (req, res, next) => {
  res.send("Get one item with id: " + req.params.id);
});

router.post("/add", async (req, res, next) => {
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
});

router.put("/edit/:id", (req, res, next) => {
  res.send("edit item with id = " + req.params.id);
});

router.delete("/delete/:id", (req, res, next) => {
  res.send("delete item with id = " + req.params.id);
});

module.exports = router;

const makeId = () => {
  return uuidv4();
};
