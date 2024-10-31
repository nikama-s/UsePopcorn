import StarRating from "./StarRating";
import { useState, useEffect } from "react";

function getStarSize() {
  const rootStyle = getComputedStyle(document.documentElement);
  return parseInt(rootStyle.getPropertyValue("--star-size"));
}

export default function UserRating({
  isWatched,
  setUserRating,
  userRating,
  handleAdd,
  watchedUserRating,
}) {
  const [starSize, setStarSize] = useState(getStarSize());

  useEffect(() => {
    function handleResize() {
      setStarSize(getStarSize());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="rating">
      {!isWatched ? (
        <>
          <StarRating
            maxRating={10}
            size={starSize}
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
