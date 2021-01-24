/*
The game object will have users, 
the rounds and throw time are part of state

for each round, the player picks a handtype
  evaluate round results
  update player scores based on round evaluation
  decrement round
end


*/
const Player = require("./Player");

class Game {
  constructor() {
    this.players = {};
    this.state = {};
  }

  // state is the rounds and throw time
  init(state) {
    this.state = { ...state };
  }

  // add a player to the game
  // takes the name and id from the socket
  addNewPlayer(name, id) {
    this.players[id] = new Player(id, name);
  }

  // remove player
  removePlayer(id) {}

  // player selected their handtype
  onPlayerUpdate(id, newHandType) {
    // update the player by the unique socket id
    this.players[id].updateHandtype(newHandType);
  }

  /*
    round funtion, i want rounds to be timeout events
    each clinet has the lobby chosen throw time
    so the eval round function should be a timeout event that starts based on round
    start, ticks, then sends round evaluation after the timer to the lobby
    should probably use promises?
  */
  evaluateRound() {
    // evaluate the round based on the two players hand types
    return this.players;
  }
  // need to update the game state
  update() {
    return this.state;
  }
}

module.exports = Game;
