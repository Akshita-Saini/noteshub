function SearchBar() {
    return (
      <div className="search-bar">
        <img
          className="search-bar-icon"
          src="https://api.iconify.design/gg:search.svg"
          alt="search-icon"
        />
        <input className="search-bar-input" placeholder="Search" type="text" />
      </div>
    );
  }
  
  export { SearchBar };
  