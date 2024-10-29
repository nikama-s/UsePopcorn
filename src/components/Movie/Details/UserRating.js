import StarRating from "./StarRating";

export default function UserRating({
  isWatched,
  setUserRating,
  userRating,
  handleAdd,
  watchedUserRating,
}) {
  return (
    <div className="rating">
      {!isWatched ? (
        <>
          <StarRating
            maxRating={10}
            size={26}
            borderColor="black"
            onSetRating={setUserRating}
          />
          {userRating && (
            <button className="btn-add" onClick={handleAdd}>
              Add to List
            </button>
          )}
        </>
      ) : (
        <p>You rated this movie {watchedUserRating} ⭐</p>
      )}
    </div>
  );
}
