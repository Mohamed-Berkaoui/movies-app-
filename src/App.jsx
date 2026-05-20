import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import GenreFilter from "./components/GenreFilter";
import MovieGrid from "./components/MovieGrid";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(function () {
    setLoading(true);
    fetch("https://fooapi.com/api/movies")
      .then((res) => res.json())
      .then((json) => setMovies(json.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  function updateSearch(data) {
    setSearch(data);
  }

  const allGenreArray = movies
    .map((movie) => movie.genre)
    .map((genrestr) => genrestr.split(","));
  let allGenre = [];
  allGenreArray.forEach((element) => {
    allGenre.push(...element);
  });
  allGenre = allGenre.map((ele) => ele.trim());
  console.log("🚀 ~ App ~ allGenre:", allGenre);

  allGenre = [...new Set(allGenre)];

  function updateGenre(genre) {
    setGenre(genre);
  }

  const filterdMovie = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase()),
  );
  const veryFilterdMovies = filterdMovie.filter((movie) =>
    genre == "all" ? true : movie.genre.includes(genre),
  );

  return (
    <>
      <SearchBar updateSearch={updateSearch} />
      <GenreFilter allGenre={allGenre} updateGenre={updateGenre} />
      <MovieGrid movies={veryFilterdMovies} />
    </>
  );
}

export default App;
