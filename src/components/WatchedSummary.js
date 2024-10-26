import { average } from "./App";
import Statistics from "./Statistics";

export default function WatchedSummary({ watched }) {
  const avgImdbRating = average(
    watched.map((movie) => movie.imdbRating).filter(Boolean) || 0
  );
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(
    watched.map((movie) => movie.runtime).filter(Boolean) || 0
  );

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <Statistics emoji="#️⃣">{watched.length} movies</Statistics>
        <Statistics emoji="⭐️">{avgImdbRating.toFixed(2)}</Statistics>
        <Statistics emoji="🌟">{avgUserRating.toFixed(2)}</Statistics>
        <Statistics emoji="⏳">{avgRuntime.toFixed(2)} min</Statistics>
      </div>
    </div>
  );
}
