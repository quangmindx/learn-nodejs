const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 3000;
const { generateMessage } = require("./utils/message");

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", (socket) => {
  socket.emit("newMessage", generateMessage("admin", "Welcome to chat app"));

  socket.broadcast.emit(
    "newMessage",
    generateMessage("admin", "new user join")
  );

  socket.on("createMessage", (message, callback) => {
    console.log(message);
    io.emit("newMessage", generateMessage(message.from, message.message));
    callback();

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
