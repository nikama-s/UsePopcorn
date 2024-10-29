import Statistics from "../../Reusable/Statistics";

export default function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <Statistics emoji="⭐️">{movie.imdbRating}</Statistics>
        <Statistics emoji="🌟">{movie.userRating}</Statistics>
        <Statistics emoji="⏳">
          {movie.type === "series"
            ? `S${movie.totalSeasons}`
            : `${movie.runtime} min`}{" "}
        </Statistics>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
