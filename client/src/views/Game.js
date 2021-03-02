import { useEffect, useState } from "react";

import Button from "../components/Button/Button";
import Logo from "../components/Logo/Logo";

const Game = (props) => {
  console.log("game component", props);

  const [gameState, setGameState] = useState({
    game: props.game,
    self: props.self,
    opponent: props.opponent,
  });
  const [playerSelected, setPlayerSelected] = useState(false);

  let { socket } = props;

  useEffect(() => {
    socket.on("some game update", (data) => {
      // do something. we have the game state, no need to update higher up the tree
      setGameState({
        ...gameState,
        self: data.self,
        opponent: data.opponent,
        game: data.game,
      });
    });

    return function () {
      socket.off("some game update");
    };
  });

  // handtype button
  const handlePlayerAction = (data) => {
    socket.emit("playerAction", data);
    setPlayerSelected(true);
  };

  // rock = 1, paper = 2, scissors = 3
  const translateHandType = (hand) => {
    let translate = "";
    switch (hand) {
      case 0:
        translate = "Waiting...";
        break;
      case 1:
        translate = "Rock";
        break;
      case 2:
        translate = "Paper";
        break;
      case 3:
        translate = "Scissors";
        break;
      default:
        translate = "Dude something broke";
    }

    return translate;
  };

  let { game, opponent, self } = gameState;

  return (
    <div>
      <header className="header header--game">
        <div className="logo">
          <Logo />
        </div>
        <div className="score">
          <h2>Score</h2>
          <div>
            <h3>You: {self.score}</h3>
            <h3>Opponent: {opponent.score}</h3>
          </div>
        </div>
      </header>
      <h4>Rounds left: {game.rounds}</h4>
      <h4>Round Timer: WILL WORK ON THIS IN A BIT</h4>
      {playerSelected ? (
        <div className="round-end">
          <div className="self">
            <h3>{self.username}</h3>
            <Button
              className={`circle ${translateHandType(
                self.handType
              ).toLowerCase()}`}
              disabled={true}
            />
          </div>
          <div className="opponent">
            <h3>{opponent.username}</h3>
            <Button
              className={`circle ${translateHandType(
                opponent.handType
              ).toLowerCase()}`}
              disabled={true}
            />
          </div>
        </div>
      ) : (
        <div>
          <Button
            handleClick={() => handlePlayerAction(1)}
            className="circle rock"
          />
          <Button
            handleClick={() => handlePlayerAction(2)}
            className="circle paper"
          />
          <Button
            handleClick={() => handlePlayerAction(3)}
            className="circle scissors"
          />
        </div>
      )}
    </div>
  );
};

export default Game;
