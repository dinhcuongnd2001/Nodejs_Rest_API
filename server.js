const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

const pathConfig = require("./path");
global.__base = __dirname + "/";
global.__path_app = __base + pathConfig.folder_app + "/";

global.__path_schemas = __path_app + pathConfig.folder_schemas + "/";
global.__path_models = __path_app + pathConfig.folder_models + "/";
global.__path_routers = __path_app + pathConfig.folder_routers + "/";
global.__path_configs = __path_app + pathConfig.folder_configs + "/";

const systemConfig = require(__path_configs + "system");
const databaseConfig = require(__path_configs + "database");

mongoose
  .connect(
    `mongodb+srv://${databaseConfig.username}:${databaseConfig.password}@${databaseConfig.database}.wsuf679.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database Connecting");
  })
  .catch((error) => {
    console.log(error);
  });

// setup Router

app.use("/api/v1", require(__path_routers));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
