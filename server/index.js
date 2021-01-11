const express = require("express");
const app = require("express")();
const http = require("http").Server(app);
const path = require("path");
const io = require("socket.io")(http);
const bodyParser = require("body-parser");

// creates dynamic namespaces based on digits
let namespaces = io.of(/^\/\d+$/);

// my solution to keeping instances of existing namespaces
// when a name space is created, push to here
let existingNames = [];

// only allow two users to a namespace
let userCount = 0;

// allows parsing bodys from request
app.use(bodyParser.json());
app.use(express.static("public"));

// send index html to client
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "public/index.html"));
});

// get name from the client
// create temp user
// create dynamic namespace
// send namespace to client
// along with the link for other user to connect
app.post("/rps", (req, res) => {
  console.log(existingNames);
  // client will check for a search param
  // if search param exists
  // client will grab it from the uri
  // attach it to a lobby parameter in the body

  // if the parameter is not null, meaning it exists
  // dont create another loby, send the existing loby name to the client
  // with the namespaces information, like connected users ect
  // client will build the lobby

  if (req.body.lobby) {
    if (existingNames.includes(req.body.lobby) === false) {
      res.status(401).json({ message: "lobby does not exist" });
    }
    // see of the lobby is an existing namespace
    // if it doesnt match, deny connection
    // let client know
    //otherwise send the nspUri to the client for connection
    // send other needed data too
  } else {
    // create random namespace name
    let random = Math.random().toString().substr(2, 8);
    existingNames.push(random);

    res.json({ name: req.body.name, nspUri: random });
  }
});

// app.get("/rps", (req, res) => {
//   // get nspUri from query param
//   // if it matches an nsp in namespaces send the
// });

namespaces.on("connection", (socket) => {
  const ns = socket.nsp;

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
  console.log("User connected to namespace");
});

io.on("connection", (socket) => {
  console.log("User connected");

  // for each connection, put it into a ro
});

http.listen(3000, () => {
  console.log("listening on 3000");
});
