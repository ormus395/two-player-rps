/* todos:
   allow user to connect to existing room based on req query param
   if room is full tell client
   make endpoint for game rules
   create socket emits for RPS game
*/

/*
   room will have room name
   number of users connected

*/

const express = require("express");
const app = require("express")();
const http = require("http").Server(app);
const path = require("path");
const io = require("socket.io")(http);
const bodyParser = require("body-parser");

// const Room = require("./Room");
const User = require("./User");

app.use(bodyParser.json());
app.use(express.static("public"));

// registered rooms
let rooms = [];

// created users
let users = [];
function filterByRoom(room) {
  // returns the users associated with the specific room
  return users.filter((user) => user.room === room);
}
// send index html to client
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "public/index.html"));
});

io.on("connection", (socket) => {
  console.log("User connected to main app");

  // create a private room
  socket.on("createRoom", (username, cb) => {
    console.log("create room event");
    console.log(`user: ${username}`);
    // create a room name, rando string
    let roomName = Math.random().toString().substr(2, 8);
    // const room = new Room(roomName);
    const user = new User(socket.id, username, roomName);

    // keeps track of connectes users
    users.push(user);

    // room.addUser(user);
    // rooms.push(room);
    // join the room
    socket.join(user.room);

    // works a lot like request response cycle
    cb({
      status: "ok",
      message: "Room created",
      // need to filter this
      // only send users connectes to the created room
      users: filterByRoom(user.room),
      room: roomName,
    });
  });

  // client join toom request, used for other part connecting to private lobby
  socket.on("joinRoom", ({ username, room }) => {
    // need to check for empty roomname
    // get the username and the room name from the client
    console.log("join room event");
    console.log(`user: ${username}, roomname: ${room}`);

    let user = new User(socket.id, username, room);
    users.push(user);

    // join room
    socket.join(user.room);

    // sends to all users connected to room except sender
    io.in(user.room).emit("userJoined", {
      message: `The user: ${user.username} has joined`,
      // only send users connected to room
      users: filterByRoom(user.room),
    });

    console.log(socket.rooms);
  });

  /* game logic for room */
  /*
      socket counts for room
      // all sockets in the main namespace
      const ids = await io.allSockets();

      // all sockets in the "chat" namespace
      const ids = await io.of("/chat").allSockets();

      // all sockets in the "chat" namespace and in the "general" room
      const ids = await io.of("/chat").in("general").allSockets();
   */

  // going to need to make server side game logic
  socket.on("gameStart", (args) => {
    // create variabled for game logic
    // receives rounds and throw time
    // emit gameStarted event
    // can get room name from socket id
    // that emitted the event
    // use this id to filter users
    // get room name, and emit to that
    // room from user id
    let room;

    users.forEach((user) => {
      if (user.id === socket.id) {
        room = user.room;
      }
    });

    io.in(room).emit("gameStarted", {
      users: filterByRoom(room),
      rounds: args.rounds,
      throwTime: args.throwTime,
    });
  });

  // takes handtypes from client
  // once all users of a room have picked
  // emit the handspicked event
  socket.on("handPicked", (args) => {
    console.log(args.handType);
    let user = users.filter((user) => user.id === socket.id)[0];
    user.handType = args.handType;

    let opponent = users.filter((o) => {
      if (user.room === o.room) {
        if (user.id !== o.id) {
          return o;
        }
      }
    })[0];
    // sending to all clients in "game" room except sender

    if (opponent.handType) {
      console.log(" I aran");
      socket.to(user.room).emit("handsPicked", {
        opponent: opponent,
      });
    }
  });

  socket.on("disconnecting", () => {
    console.log(socket.rooms); // the Set contains at least the socket ID
    // need to inform users lobby that they are disconnecting
  });

  socket.on("disconnect", () => {
    // socket.rooms.size === 0
    console.log("user disconnected");
    console.log(socket.rooms.size);
    // need to tell the lobby a user disconnected
  });
});

http.listen(3000, () => {
  console.log("listening on 3000");
});
