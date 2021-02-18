import { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";

function App() {
  // app state
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);

  let [state, setState] = useState({
    self: null,
    oponent: null,
    gameState: {},
  });

  let [input, setInput] = useState("");
  let [rounds, setRounds] = useState(1);
  let [timer, setTimer] = useState(3);
  let [join, setJoin] = useState("");

  useEffect(() => {
    setSocket(io());
  }, []);

  useEffect(() => {
    console.log("I have been called");
    if (!socket) return;

    socket.onAny((event, ...args) => {
      console.log(event, args);
    });

    return function () {
      socket.offAny((event, ...args) => {
        console.log(event, args);
      });
    };
  });

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
      <p>Or</p>
      <form>
        <label htmlFor="join">Join Lobby</label>
        <input type="text" name="join" value={join} placeholder="Lobby name" />
        <button>Join</button>
      </form>

      <button
        onClick={() => {
          socket.emit("test emmiting", "server running interval");
        }}
      >
        Test emmitting while server is running interval
      </button>
    </div>
  );
}

export default App;
