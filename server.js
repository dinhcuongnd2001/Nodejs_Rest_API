const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./app/middleware/error");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const pathConfig = require("./path");
global.__base = __dirname + "/";
global.__path_app = __base + pathConfig.folder_app + "/";

global.__path_schemas = __path_app + pathConfig.folder_schemas + "/";
global.__path_models = __path_app + pathConfig.folder_models + "/";
global.__path_routers = __path_app + pathConfig.folder_routers + "/";
global.__path_configs = __path_app + pathConfig.folder_configs + "/";
global.__path_validate = __path_app + pathConfig.folder_validate + "/";
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

// error hanlder

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
