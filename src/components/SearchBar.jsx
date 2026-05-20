import React from "react";

function SearchBar({ updateSearch }) {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="search movie using title"
        onChange={(event) => {updateSearch(event.target.value)}}
      />
    </div>
  );
}

export default SearchBar;
