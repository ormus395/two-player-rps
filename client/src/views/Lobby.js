import Button from "../components/Button/Button";
import Logo from "../components/Logo/Logo";

// lobby receives the player (self), the game state (game object), and openent (null on first render)
const Lobby = (props) => {
  let { self, opponent, game, lobbyName } = props.lobbyState;
  console.log(props);
  console.log(self, opponent, game);
  return (
    <div>
      <header className="header header--game">
        <div className="logo">
          <Logo />
        </div>
        <div className="round-rules">
          <h3>Rounds: {game.rounds}</h3>
          <h3>Throw Time: {game.throwTime}</h3>
        </div>
      </header>
      <div className="lobby-container">
        <h2>Players</h2>
        <div className="lobby__players">
          <p>You: {self.username}</p>
          <p>Opponent: {opponent ? opponent.username : "Waiting for player"}</p>
        </div>
        <Button
          className="btn"
          handleClick={props.handleGameStart}
          disabled={!opponent}
        >
          Start Game
        </Button>
      </div>

      <div className="copy-link">
        <p>send lobby id to a friend: {lobbyName}</p>
        <Button
          className="btn"
          handleClick={() => {
            navigator.clipboard.writeText(lobbyName);
          }}
        >
          Copy Me
        </Button>
      </div>
    </div>
  );
};

export default Lobby;
