import { SearchBar } from "./index";

function Header() {
  return (
    <div className="header">
      <span className="header-search-icon">&#9776;</span>
      Reminders
      <SearchBar />
    </div>
  );
}

export { Header };

