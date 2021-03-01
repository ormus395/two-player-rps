import { useEffect, useState } from "react";
import Logo from "../components/Logo/Logo";
import Button from "../components/Button/Button";

const Landing = (props) => {
  const { socket } = props;

  const [values, setValues] = useState({
    username: "",
    rounds: "1",
    throwTime: "3",
    lobby: "",
  });

  const handleLobbyCreate = (data) => {
    console.log(data);
    socket.connect();
    socket.emit("createLobby", data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.id === "join") {
      props.handleLobbyJoin({
        username: values.username,
        lobby: values.lobby,
      });
    } else {
      handleLobbyCreate({
        username: values.username,
        rounds: values.rounds,
        throwTime: values.throwTime,
      });
    }
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <header className="header">
        <div className="logo">
          <Logo />
        </div>
      </header>

      <div className="form-container">
        <form id="create" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="username">Enter username: </label>
          <input
            name="username"
            type="text"
            value={values.username}
            onChange={(e) => handleChange(e)}
            placeholder="username"
          />
          <p>Create Private Lobby</p>
          <label htmlFor="rounds">Enter rounds: </label>
          <select
            name="rounds"
            id="rounds"
            value={values.rounds}
            onChange={(e) => handleChange(e)}
          >
            <option value="1">1</option>
            <option value="3">3</option>
            <option value="5">5</option>
          </select>
          <label htmlFor="throwTime">Select time limit for throw: </label>
          <select
            name="throwTime"
            id="throwTime"
            onChange={(e) => handleChange(e)}
            value={values.timer}
          >
            <option value="3">3 Seconds</option>
            <option value="5">5 Seconds</option>
            <option value="7">7 Seconds</option>
          </select>
          <Button className="btn">Create Lobby</Button>
        </form>
        <p>Or</p>
        <form id="join" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="join">Join Lobby</label>
          <input
            type="text"
            name="lobby"
            value={values.lobby}
            placeholder="Lobby name"
            onChange={(e) => handleChange(e)}
          />
          <Button className="btn">Join</Button>
        </form>
      </div>
    </div>
  );
};

export default Landing;
