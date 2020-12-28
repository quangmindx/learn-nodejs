const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

app.set("view engine", "ejs");

app.get("/home", (req, res) => {
  res.render("home");
});

server.listen(3000, () => {
  console.log("server running on port 3000");
});

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    socket.broadcast.emit("message", data);
  });
});
