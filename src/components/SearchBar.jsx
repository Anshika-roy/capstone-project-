// src/components/SearchBar.jsx
//
// A "controlled component": the input's value comes from a prop
// (searchTerm) and every keystroke is reported back to the parent
// via the onSearchChange callback prop. The SearchBar itself holds
// no state -- the Explore page owns the state (this is called
// "lifting state up").

import "./SearchBar.css";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input
        type="text"
        placeholder="Search destinations (e.g. Goa, Kerala)..."
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        aria-label="Search destinations"
      />
    </div>
  );
}

export default SearchBar;
