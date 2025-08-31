import React from "react";

const StarRating = ({ rating, setRating }) => {
  return (
    <div>
      {[1,2,3,4,5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          style={{
            cursor: "pointer",
            color: star <= rating ? "#ffc107" : "#e4e5e9",
            fontSize: "1.5rem",
            marginRight: "5px"
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
