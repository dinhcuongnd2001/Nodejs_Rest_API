// const http = require("http");

// const course = [
//   {
//     id: 1,
//     name: "nodeJs",
//   },
//   {
//     id: 2,
//     name: "ReactJs",
//   },
// ];

// const server = http.createServer((req, res) => {
//   // res.setHeader("Content-type", "application/json");
//   // res.setHeader("X-Powered-By", "Node.js");

//   // res.statusCode = 404;

//   res.writeHead(404, {
//     "Content-type": "application/json",
//     "X-Powered-By": "Node.js",
//   });
//   res.end(
//     JSON.stringify({
//       success: false,
//       error: "Not Found",
//       data: null,
//     })
//   );
// });

// const PORT = 3055;
// server.listen(PORT, () => {
//   console.log(`server is running on port ${PORT}`);
// });

const express = require("express");
const app = express();

app.use(express.json());

let courses = [
  {
    id: 1,
    name: "nodeJs",
  },
  {
    id: 2,
    name: "ReactJs",
  },
];

app.get("/", (req, res) => {
  res.send(courses);
});

app.get("/api/course/:id", (req, res) => {
  // res.send(course);
  const course = courses.find((each) => each.id == req.params.id);
  if (!course) res.status(404).send("No Course Found");
  else res.send(course);
});

app.post("/api/course/add", (req, res) => {
  const newCourse = req.body;
  courses.push(newCourse);

  res.send(
    JSON.stringify({
      success: true,
      notice: " You have add successfully",
      data: courses,
    })
  );
});

app.put("/api/course/edit/:id", (req, res) => {
  const course = courses.find((each) => each.id == req.params.id);
  course.name = req.body.name;
  res.send(
    JSON.stringify({
      success: true,
      notice: " You have edit successfully",
      data: courses,
    })
  );
});

app.delete("/api/course/delete/:id", (req, res) => {
  courses = courses.filter((each) => each.id != req.params.id);
  res.send(
    JSON.stringify({
      success: true,
      notice: "You have delete successfully",
      data: courses,
    })
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
