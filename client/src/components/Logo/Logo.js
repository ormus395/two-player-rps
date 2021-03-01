import logo from "../../assets/images/logo.svg";
import "./Logo.css";
console.log(logo);

const Logo = (props) => {
  return <img src={logo} alt="My logo" />;
};

export default Logo;
