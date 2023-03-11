const mongoose = require("mongoose");
const databaseConfig = require(__path_configs + "database");

var schema = new mongoose.Schema({
  name: String,
  description: String,
  careers: [String],
  Type: [String],
  Local: [String],
  web: String,
  address: String,
  phone: String,
  email: String,
});

module.exports = mongoose.model(databaseConfig.col_items[0], schema);
