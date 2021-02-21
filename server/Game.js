/*
The game object will have users, 
the rounds and throw time are part of state

for each round, the player picks a handtype
  evaluate round results
  update player scores based on round evaluation
  decrement round
end


*/

const PLAYER_ONE_WON = 1;
const PLAYER_TWO_WON = 2;
const DRAW = 3;

const Player = require("./Player");

class Game {
  constructor(rounds, throwTime) {
    this.players = [];
    this.rounds = rounds;
    this.throwTime = throwTime;
  }

  getPlayerById(id) {
    let player = null;

    this.players.forEach((p) => {
      if (p.id === id) player = p;
    });

    return player;
  }

  // add a player to the game
  // takes the name and id from the socket
  addNewPlayer(name, id) {
    this.players.push(new Player(id, name));
  }

  // remove player
  removePlayer(id) {}

  // player selected their handtype
  onPlayerUpdate(id, newHandType) {
    // update the player by the unique socket id
    this.getPlayer(id).updateHandtype(newHandType);
  }

  /*
    round funtion, i want rounds to be timeout events
    each clinet has the lobby chosen throw time
    so the eval round function should be a timeout event that starts based on round
    start, ticks, then sends round evaluation after the timer to the lobby
    should probably use promises?
  */

  // update round
  updateRound() {}

  evaluateRound() {
    // evaluate the round based on the two players hand types
    let playerOne = this.players[0];
    let playerTwo = this.players[1];

    let result;
    // if either player has not picked
    // round is forfieted by unresponsive player

    // rock = 1, paper = 2, scissors = 3
    // pOne picked rock
    if (playerOne.handType === 1) {
      if (playerTwo.handType === 1) {
        result = "tie";
      } else if (playerTwo.handType === 2) {
        playerTwo.updateScore("win");
        result = "playerTwo";
      } else if (playerTwo.handType === 3) {
        //player one won
        playerOne.updateScore("win");
        result = "playerOne";
      }
      // pOne picked paper
    } else if (playerOne.handType === 2) {
      if (playerTwo.handType === 1) {
        // player one won
        playerOne.updateScore("win");
        result = "playerOne";
      } else if (playerTwo.handType === 2) {
        // tie
        result = "tie";
      } else if (playerTwo.handType === 3) {
        // player two won
        playerTwo.updateScore("win");
        result = "playerTwo";
      }
      // picked scissors
    } else if (playerOne.handType === 3) {
      if (playerTwo.handType === 1) {
        // player two won
        playerTwo.updateScore("win");
        result = "playerTwo";
      } else if (playerTwo.handType === 2) {
        // player one won
        playerOne.updateScore("win");
        result = "playerOne";
      } else if (playerTwo.handType === 3) {
        // tie
        result = "tie";
      }
    }

    return result;
  }

  endRound() {
    this.rounds--;
  }
}

module.exports = Game;
