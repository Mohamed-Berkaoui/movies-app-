import React from "react";

function GenreFilter({ allGenre ,updateGenre}) {
  return (
    <div className="genre">
      <button onClick={()=>updateGenre("all")}>all</button>
      {allGenre.map((genre) => (
        <button onClick={()=>updateGenre(genre)}>{genre}</button>
      ))}
    </div>
  );
}

export default GenreFilter;
