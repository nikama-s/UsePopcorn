import WatchedMovie from "./WatchedMovie";

export default function WatchedMovieList({ watched, onDeleteWathced }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWathced={onDeleteWathced}
        />
      ))}
    </ul>
  );
}
