import { useEffect } from "react";

const Game = (props) => {
  console.log("game component", props);

  let you = props.self;
  let opponent = props.opponent;

  let game = props.game;

  return (
    <div>
      <h1>
        Your Score: {you.score} - Your Opponent: {opponent.score}
      </h1>
      <h4>Rounds left: {game.rounds}</h4>
      <h4>Round Timer: WILL WORK ON THIS IN A BIT</h4>
      <div>
        <button onClick={() => props.handlePlayerAction("rock")}>Rock</button>
        <button onClick={() => props.handlePlayerAction("paper")}>Paper</button>
        <button onClick={() => props.handlePlayerAction("scissors")}>
          Scissors
        </button>
      </div>
    </div>
  );
};

export default Game;
