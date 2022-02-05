import logo from "../images/post-it.png";
import { ReactComponent as MenuIcon }  from "../images/menu-icon.svg";

function Header() {
  return (
    <div className="header">
      <MenuIcon className="menu-icon"/>
      <img className="brand-logo" src={logo} alt="brand-logo"/>
      <span className="brand-name"> Notes Hub </span>
    </div>
  );
}

export { Header };

