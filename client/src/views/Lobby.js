import Button from "../components/Button/Button";
// lobby receives the player (self), the game state (game object), and openent (null on first render)
const Lobby = (props) => {
  let { self, opponent, game, lobbyName } = props.lobbyState;
  console.log(props);
  console.log(self, opponent, game);
  return (
    <div>
      <header>
        <h3>Rounds: {game.rounds}</h3>
        <h3>Throw Time: {game.throwTime}</h3>
      </header>
      <div>
        <p>You: {self.username}</p>
      </div>
      <div>Opponent: {opponent ? opponent.username : "Waiting for player"}</div>

      <Button
        className="btn"
        handleClick={props.handleGameStart}
        disabled={!opponent}
      >
        Start Game
      </Button>
      <div>
        <p>send lobby id to a friend: {lobbyName}</p>
      </div>
    </div>
  );
};

export default Lobby;
