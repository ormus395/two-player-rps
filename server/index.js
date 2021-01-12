/* todos:
   allow user to connect to existing room based on req query param
   if room is full tell client
   make endpoint for game rules
   create socket emits for RPS game
*/

const express = require("express");
const app = require("express")();
const http = require("http").Server(app);
const path = require("path");
const io = require("socket.io")(http);
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.static("public"));

// registered rooms
let rooms = [];

// send index html to client
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "public/index.html"));
});

// this woll be the endpoint to create a private room
// will get the username and unique id from the client
// to generate a unique user
// creates random room name [should be random and unique]

// room will have a name and user count
// user count will be used to keep people from joing when limit is met
app.post("/create-room", (req, res) => {
  // username will come from req.body
  // rando generate room name, push to rooms array if it doesnt exist
  // if does exist, check rooms capacity
  // if two, no connect, tell client no
  // connect to room

  let user = { username: req.body.name, id: null };
  let room = Math.random().toString().substr(2, 8);
  if (rooms.includes(room)) {
    room = Math.random().toString().substr(2, 8);
  }

  rooms.push(room);

  res.json({
    user: user,
    room: room,
    message: "Successful creation of lobby",
  });
});

io.on("connection", (socket) => {
  // main connection happens when user hits create room
  // connects to a lobby that allows the people to create rules to RPS game

  // on joinRoom event, get the given room name
  // if it exists and isnt capped out, join
  console.log("User connected to main application");
  // on a join room event
  socket.on("joinRoom", (args) => {
    // get room from args, and user object
    console.dir(args);
    let user = args.user;
    user.id = socket.id;
    let room = args.room;
    let userCount = (async function () {
      let userIds = await io.in(room).allSockets();
      return userIds;
    })();
    console.log(user, room);
    userCount.then((res) => {
      if (res.size === 2) {
        socket.emit("room full");
      } else {
        socket.join(room);
        console.log("joined room");
        io.to(room).emit("user connected", { user, room });
      }
    });
    /*
      socket counts for room
      // all sockets in the main namespace
      const ids = await io.allSockets();

      // all sockets in the "chat" namespace
      const ids = await io.of("/chat").allSockets();

      // all sockets in the "chat" namespace and in the "general" room
      const ids = await io.of("/chat").in("general").allSockets();
   */
  });

  socket.on("disconnecting", () => {
    console.log(socket.rooms); // the Set contains at least the socket ID
  });

  socket.on("disconnect", () => {
    // socket.rooms.size === 0
    console.log("user disconnected");
    console.log(socket.rooms.size);
  });
});

http.listen(3000, () => {
  console.log("listening on 3000");
});
