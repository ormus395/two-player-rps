import { useState } from "react";
import "./App.css";

import { io } from "socket.io-client";
const socket = io();

socket.emit("test", "hello server");

function App() {
  // app state
  let [state, setState] = useState({
    self: null,
    oponent: null,
    gameState: {},
  });

  let [input, setInput] = useState("");
  let [rounds, setRounds] = useState(1);
  let [timer, setTimer] = useState(3);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleRoundSelect = (e) => {
    setRounds(e.target.value);
  };

  const handleTimerSelect = (e) => {
    setTimer(e.target.value);
  };

  const handleLobbyCreate = (e) => {
    e.preventDefault();

    socket.emit("createLobby", {
      username: input,
      rounds: rounds,
      throwTime: timer,
    });
  };

  return (
    <div>
      <h1>Rock Paper Scissors</h1>
      <form onSubmit={(e) => handleLobbyCreate(e)}>
        <label htmlFor="username">Enter username: </label>
        <input
          name="username"
          type="text"
          value={input}
          onChange={(e) => handleInput(e)}
        />

        <label htmlFor="rounds">Enter rounds: </label>
        <select
          name="rounds"
          id="rounds"
          value={rounds}
          onChange={(e) => handleRoundSelect(e)}
        >
          <option value="1">1</option>
          <option value="3">3</option>
          <option value="5">5</option>
        </select>
        <label htmlFor="timer">Select time limit for throw: </label>
        <select name="timer" id="timer">
          <option value="3">3 Seconds</option>
          <option value="5">5 Seconds</option>
          <option value="7">7 Seconds</option>
        </select>
        <button>Create Lobby</button>
      </form>
    </div>
  );
}

export default App;
