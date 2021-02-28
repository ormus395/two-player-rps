import "./Button.css";

const Button = (props) => {
  return (
    <button
      onClick={() => {
        console.log("clicked");
        console.log(props);
        props.handleClick?.();
      }}
      className={props.className}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
