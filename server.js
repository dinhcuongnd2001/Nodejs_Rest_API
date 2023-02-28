const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

const pathConfig = require("./path");
global.__base = __dirname + "/";
global.__path_app = __base + pathConfig.folder_app + "/";

// console.log(__dirname);

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

// let courses = [
//   {
//     id: 1,
//     name: "nodeJs",
//   },
//   {
//     id: 2,
//     name: "ReactJs",
//   },
// ];

// app.get("/", (req, res) => {
//   res.send(courses);
// });

// app.get("/api/course/:id", (req, res) => {
//   // res.send(course);
//   const course = courses.find((each) => each.id == req.params.id);
//   if (!course) res.status(404).send("No Course Found");
//   else res.send(course);
// });

// app.post("/api/course/add", (req, res) => {
//   const newCourse = req.body;
//   courses.push(newCourse);

//   res.send(
//     JSON.stringify({
//       success: true,
//       notice: " You have add successfully",
//       data: courses,
//     })
//   );
// });

// app.put("/api/course/edit/:id", (req, res) => {
//   const course = courses.find((each) => each.id == req.params.id);
//   course.name = req.body.name;
//   res.send(
//     JSON.stringify({
//       success: true,
//       notice: " You have edit successfully",
//       data: courses,
//     })
//   );
// });

// app.delete("/api/course/delete/:id", (req, res) => {
//   courses = courses.filter((each) => each.id != req.params.id);
//   res.send(
//     JSON.stringify({
//       success: true,
//       notice: "You have delete successfully",
//       data: courses,
//     })
//   );
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
