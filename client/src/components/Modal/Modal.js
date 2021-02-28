import "./Modal.css";

import Button from "../Button/Button";

const Modal = (props) => {
  return (
    <div className={`modal-container ${props.show ? "" : "hidden"}`}>
      <div className="modal">
        <h3>{props.text}</h3>
        <Button className="btn" handleClick={props.handleModal}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default Modal;
