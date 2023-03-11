const mongoose = require("mongoose");
const fs = require("fs");
const pathConfig = require("./path");
global.__base = __dirname + "/";
global.__path_app = __base + pathConfig.folder_app + "/";
global.__path_configs = __path_app + pathConfig.folder_configs + "/";

const databaseConfig = require(__path_configs + "database");
mongoose.connect(
  `mongodb+srv://${databaseConfig.username}:${databaseConfig.password}@${databaseConfig.database}.wsuf679.mongodb.net`
);

const ItemSchema = require("./app/schemas/items");
const CarrersSchema = require("./app/schemas/careers");

const careers = JSON.parse(
  fs.readFileSync(`${__dirname}/app/_data/careers.json`, "utf-8")
);

const importData = async () => {
  try {
    await CarrersSchema.create(careers);
    console.log("Data Import");
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    await CarrersSchema.deleteMany({});
    console.log("Delete all careers");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] == "-d") {
  deleteData();
}
