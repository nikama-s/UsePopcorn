export function Pages({ page, setPage, movies }) {
  return (
    <div className="buttons">
      {page > 1 ? (
        <button onClick={() => setPage(page - 1)}>&larr;</button>
      ) : (
        <button className="placeholder"></button>
      )}

      {(page > 1 || movies.length > 0) && <p>Page {page}</p>}

      {movies.length === 10 ? (
        <button onClick={() => setPage(page + 1)}>&rarr;</button>
      ) : (
        <button className="placeholder"></button>
      )}
    </div>
  );
}
