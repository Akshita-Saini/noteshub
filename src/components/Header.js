import logo from "../images/post-it.png";

function Header() {
  return (
    <div className="header">
      <svg className="menu-icon" width="1em" height="1em" viewBox="0 0 24 24"><path d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2z" fill="currentColor"></path>
      </svg>
      <img className="brand-logo" src={logo} alt=""/>
      <span className="brand-name" > Notes Hub </span>
    </div>
  );
}

export { Header };

