const socket = io();
socket.on("connect", () => {
  console.log("Socket from client");
});

socket.on("disconnect", () => {
  console.log("disconnect");
});

socket.on("newMessage", (message) => {
  console.log("newMessage", message);
});

socket.emit(
  "createMessage",
  {
    from: "Hy",
    message: "Hello",
  },
  function () {
    console.log("Server got it");
  }
);
// document.getElementById("create-message").addEventListener("click", () => {

// });
