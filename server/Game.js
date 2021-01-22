/*
The game object will have users, the specific socket room
the rounds and throw time

client will take each pick from user,
game will send result back
*/
const Player = require("./Player");

class Game {
  constructor(room) {
    this.room = room;
    this.players = {};
    this.state = {};
  }

  // state is the rounds and throw time
  init(state) {
    this.state = { ...state };
  }

  // add a player to the game
  addNewPlayer(name, socket) {
    this.players[socket.id] = new Player(socket.id, name);
  }

  // remove player

  //onPlayerUpdate() player has selected hand type from client
  onPlayerUpdate() {}

  // send information of game state
  update() {}
}
