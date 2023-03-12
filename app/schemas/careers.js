const mongoose = require("mongoose");
const databaseConfig = require(__path_configs + "database");

var schema = new mongoose.Schema({
  name: String,
  title: String,
  like: Number,
  dislike: Number,
});

schema.virtual("restaurants", {
  ref: "items",
  localField: "_id",
  foreignField: "careers",
});

// Set Object and Json property to true, default is set to false

schema.set("toObject", { virtuals: true });
schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model(databaseConfig.col_items[1], schema);
