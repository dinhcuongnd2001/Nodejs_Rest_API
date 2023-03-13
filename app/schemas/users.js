const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const databaseConfig = require(__path_configs + "database");

var schema = new mongoose.Schema({
  username: String,
  email: String,
  role: String,
  password: String,
});

schema.pre("save", async function (next) {
  const saltRound = 10;
  const newPassword = await bcrypt.hash(this.password, saltRound);
  this.password = newPassword;
  next();
});

module.exports = mongoose.model(databaseConfig.col_users, schema);
