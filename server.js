const http = require("http");

const course = [
  {
    id: 1,
    name: "nodeJs",
  },
  {
    id: 2,
    name: "ReactJs",
  },
];

const server = http.createServer((req, res) => {
  // res.setHeader("Content-type", "application/json");
  // res.setHeader("X-Powered-By", "Node.js");

  // res.statusCode = 404;

  res.writeHead(404, {
    "Content-type": "application/json",
    "X-Powered-By": "Node.js",
  });
  res.end(
    JSON.stringify({
      success: false,
      error: "Not Found",
      data: null,
    })
  );
});

const PORT = 3055;
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
