export default function Pages({ page, setPage, moviesLength }) {
  const isShownLeft = page > 1;
  const isShownRight = moviesLength === 10;
  const isShownPage = isShownLeft || isShownRight;

  return (
    <div className="buttons">
      {isShownLeft ? (
        <button onClick={() => setPage(page - 1)}>&larr;</button>
      ) : (
        <button className="placeholder"></button>
      )}

      {isShownPage && <p>Page {page}</p>}

      {isShownRight ? (
        <button onClick={() => setPage(page + 1)}>&rarr;</button>
      ) : (
        <button className="placeholder"></button>
      )}
    </div>
  );
}
