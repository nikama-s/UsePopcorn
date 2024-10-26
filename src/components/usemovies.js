import { useState, useEffect } from "react";
import { KEY } from "./App";

export function useMovies(query, page = 1) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
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
    },
    [query, page]
  );
  return { movies, isLoading, error };
}
