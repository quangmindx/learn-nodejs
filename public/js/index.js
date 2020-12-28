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

// document.getElementById("create-message").addEventListener("click", () => {

// });
