import { useEffect, useState } from "react";
import { KEY } from "../../../App";
import {
  ErrorMessage,
  Loader,
  useKey,
  Statistics,
  UserRating,
} from "../../../components";

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState(null);
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    Type: type,
    totalSeasons,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      type,
      totalSeasons,
      userRating,
    };

    onAddWatched(newWatchedMovie);
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?i=${selectedId}&apikey=${KEY}`
          );
          const data = await res.json();
          setMovie(data);
        } catch (err) {
          setError("Something went wrong");
        } finally {
          setIsLoading(false);
        }
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      document.title = title ? title : "UsePopcorn";

      return function () {
        document.title = "UsePopcorn";
      };
    },
    [title]
  );

  useKey("Escape", onCloseMovie);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`poster of a ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull;
                {runtime}
              </p>
              <p>{genre}</p>
              <p>{type === "series" && `Series - ${totalSeasons} seasons`}</p>
              <Statistics emoji="⭐">{imdbRating} IMDb rating</Statistics>
            </div>
          </header>
          <section>
            <UserRating
              isWatched={isWatched}
              setUserRating={setUserRating}
              userRating={userRating}
              handleAdd={handleAdd}
              watchedUserRating={watchedUserRating}
            />
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            {director !== "N/A" ? <p>Directed by {director}</p> : null}
          </section>
        </>
      )}
    </div>
  );
}
