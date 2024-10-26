import Statistics from "./Statistics";

export default function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.Title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <Statistics emoji="⭐️">{movie.imdbRating}</Statistics>
        <Statistics emoji="🌟">{movie.userRating}</Statistics>
        <Statistics emoji="⏳">{movie.runtime} min</Statistics>
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
