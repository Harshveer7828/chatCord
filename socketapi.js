const io = require("socket.io")();
const formatMessage = require("./utils/messages.js");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users.js");

const socketapi = {
  io: io,
};

const botname = "ChatCord Bot";
// Add your socket.io logic here!
io.on("connection", function (socket) {
  console.log("A user connected");

  // join room catches the event from the client side
  socket.on("JoinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    // welcome current user
    socket.emit("message", formatMessage(botname, "Welcome to the ChatCord"));

    // user contains an object of properties of the user like id username and room.

    console.log(user.room);
    console.log(user);

    // broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botname, `${user.username} has joined the chat`)
      ); // it send or emit the message all the users excepts that connecting

      
    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // welcome current user

  //   handle the incomming messages form user
  // catches the chat message from the client side
  socket.on("message", (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botname, `${user.username} has left the  chat`)
      );
    }
  });
});
// end of socket.io logic

module.exports = socketapi;
