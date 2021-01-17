# two-player-rps

this is a two player rock paper scissors game that utilizes Socket.io to create
private lobbies of two players to throw down rps.

## Description

A program that allows users to create a temp username and private room to play
a two player online Rock Paper Scissors.

### data

      Rooms
      Collection of Room objects

      Room
      An object that has collection of users
      a room name
      user count

      Users
      collectiom of user objects

      User
      username, id, room name

### todos

- [x] Need to work on client connection to existing room (lobby)
- Need to work on canceling connection to a lobby that has 2 people
- [x] Need to create game when lobby owner hits start
- Need to figure out how to build game when lobby owner hits start
- Need to figure out how to create a lobby owner (probably auth token, socket.io allows auth)
- Need to create special emits and broadcasts for RPS game
- Need to work on RPS logic that has been modified for a two player game using sockets to communicate back and forth
