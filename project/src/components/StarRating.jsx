import { Star, StarHalf } from "lucide-react";
import { useState } from "react";

const starRating = ({ defaultValue }) => {
  const [rating, setRating] = useState(defaultValue || null);
  const [hover, setHover] = useState(null);

  return (
    <div className="flex space-x-0.5">
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              name="stars"
              className="hidden"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <Star
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              className="cursor-pointer"
              fill={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              strokeWidth={1}
            />
          </label>
        );
      })}
    </div>
  );
};
export default starRating;
