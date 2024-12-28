import { useEffect, useState } from "react";
import {
  WatchedMovieList,
  WatchedSummary,
  MovieDetails,
  MovieList,
  ListBox,
  Loader,
  ErrorMessage,
  NavBar,
  useLocalStorage,
  Pages,
} from "./components";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const KEY = "64100630";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [watched, setWatched] = useLocalStorage([], "watched");

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWathed(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        setMovies([]);
        const res = await fetch(
          `https://www.omdbapi.com/?s=${
            query ? query.trim() : "game"
          }&apikey=${KEY}&page=${page}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
    return function () {
      controller.abort();
    };
  }, [query, page]);

  return (
    <>
      <NavBar
        setQuery={setQuery}
        query={query}
        movies={movies}
        setPage={setPage}
      />

      <main className="main">
        <ListBox>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {!isLoading && (
            <Pages page={page} setPage={setPage} moviesLength={movies.length} />
          )}
        </ListBox>

        <ListBox>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWathed}
              watched={watched}
              key={selectedId}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </ListBox>
      </main>
    </>
  );
}
