import { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";

import Landing from "./views/Landing";
import Game from "./views/Game";
import Lobby from "./views/Lobby";

function App() {
  // app state
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);

  let [state, setState] = useState({
    self: null,
    opponent: null,
    game: {},
    gameStarted: false,
    view: "landing",
    lobbyName: "",
  });

  useEffect(() => {
    setSocket(io({ autoConnect: false }));
  }, []);

  useEffect(() => {
    console.log("I have been called, I am useEffect with socket listeners");
    if (!socket) return;

    socket.onAny((event, ...args) => {
      console.log("I am the any listener");
      console.log(event, args);
    });

    // socket will emmit the creation of the lobby,
    // send the player object (self), openent, lobby name, and game state and other
    // connected players

    socket.on("lobbyCreated", (data) => {
      console.log(data);
      let { self, lobbyName, game } = data;

      setState({
        ...state,
        self,
        lobbyName,
        game,
        view: "lobby",
      });
    });

    socket.on("playerJoined", (data) => {
      console.log("player joined");
      console.log(data);

      let { self, opponent, lobbyName, game } = data;

      setState({
        ...state,
        self,
        opponent,
        lobbyName,
        game,
        view: "lobby",
      });
    });

    socket.on("gameStart", (data) => {
      let { self, opponent, lobbyName, game } = data;

      setState({
        ...state,
        self,
        opponent,
        lobbyName,
        game,
        view: "game",
        gameStarted: true,
      });
    });

    socket.on("roundEnd", function () {
      console.log("round ended");
    });

    return function () {
      socket.removeAllListeners();
    };
  });

  const handleLobbyCreate = (data) => {
    console.log(data);
    socket.connect();
    socket.emit("createLobby", data);
  };

  const handleLobbyJoin = (data) => {
    console.log(data);

    socket.connect();
    socket.emit("playerJoined", data);
  };

  const handleGameStart = () => {
    socket.emit("gameStart");
  };

  // handtype button
  const handlePlayerAction = (data) => {
    socket.emit("playerAction", data);
  };

  let currentView = null;

  switch (state.view) {
    case "landing":
      currentView = (
        <Landing
          handleLobbyCreate={handleLobbyCreate}
          handleLobbyJoin={handleLobbyJoin}
        />
      );
      break;
    case "game":
      currentView = (
        <Game
          self={state.self}
          opponent={state.opponent}
          game={state.game}
          handlePlayerAction={handlePlayerAction}
        />
      );
      break;
    case "lobby":
      currentView = (
        <Lobby
          lobbyState={{
            self: state.self,
            opponent: state.opponent,
            game: state.game,
            lobbyName: state.lobbyName,
          }}
          handleGameStart={handleGameStart}
        />
      );
      break;
    default:
      currentView = <Landing />;
  }
  return <div>{currentView}</div>;
}

export default App;
