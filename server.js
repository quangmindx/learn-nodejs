const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", (socket) => {
  console.log("connection", socket.id);
});

io.on("disconnect", (socket) => {
  console.log("disconnection");
});

server.listen(PORT, () => {
  console.log(`Server running on port `, PORT);
});
