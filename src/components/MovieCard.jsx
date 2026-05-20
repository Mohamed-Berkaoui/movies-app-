import React from "react";

function MovieCard({ movie }) {
  const movieGenre = movie.genre.split(",");
  return (
    <div className="movie-card">
      <img src={movie.poster} />
      <div className="content">
        <h4>{movie.title}</h4>
        <div className="genre">
          {movieGenre.map((genre) => (
            <span>{genre}</span>
          ))}
        </div>
        <p>imdb Rate: {movie.imdbRating}</p>
        <p>Year: {movie.year}</p>
        <p>runtime: {movie.runtime}</p>
      </div>
    </div>
  );
}

export default MovieCard;
