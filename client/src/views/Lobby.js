// lobby receives the player (self), the game state (game object), and openent (null on first render)
const Lobby = (props) => {
  let { self, openent, game, lobbyName } = props.lobbyState;
  console.log(props);
  console.log(self, openent, game);
  return (
    <div>
      <header>
        <h3>Rounds: {game.rounds}</h3>
        <h3>Throw Time: {game.throwTime}</h3>
      </header>
      <div>
        <p>You: {self.username}</p>
      </div>
      <div>{openent ? openent.username : "Waiting for player"}</div>

      <button disabled={!openent}>Start Game</button>
      <div>
        <p>send lobby id to a friend: {lobbyName}</p>
      </div>
    </div>
  );
};

export default Lobby;
