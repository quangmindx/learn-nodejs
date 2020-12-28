const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", (socket) => {
  socket.emit("newMessage", {
    from: "admin",
    message: "Welcome to the chat app",
    createdAt: new Date().getTime(),
  });

  socket.broadcast.emit("newMessage", {
    from: "admin",
    message: "New user joined!",
    createdAt: new Date().getTime(),
  });

  socket.on("createMessage", (message) => {
    io.emit("newMessage", {
      from: message.from,
      message: message.message,
      createdAt: new Date().getTime(),
    });

    // socket.broadcast.emit("newMessage", {
    //   from: message.from,
    //   message: message.message,
    //   createdAt: new Date().getTime(),
    // });
  });

  socket.on("disconnect", (socket) => {
    console.log("disconnection");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port `, PORT);
});
