const mongoose = require("mongoose");
const databaseConfig = require(__path_configs + "database");

var schema = new mongoose.Schema({
  username: String,
  email: String,
  role: String,
  password: String,
});

module.exports = mongoose.model(databaseConfig.col_users, schema);
