import { useState } from "react";
import Star from "./Star";
import RatingText from "./RatingText";
// import PropTypes from "prop-types";

const StarRating = ({
  maxRating = 5,
  color = "#FFB900",
  textColor = "#000",
  size = "24",
  defaultRating = 0,
  message = ["terrible", "okay", "good", "best", "excellent"],
  onRatingChange,
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);
  console.log(rating);

  const handleRating = (rate) => {
    setRating(rate);
    onRatingChange?.(rate);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="flex gap-1">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            color={color}
            size={size}
            full={(tempRating ? tempRating : rating) > i}
            onClick={() => handleRating(i + 1)}
            onMouseEnter={() => setTempRating(i + 1)}
            onMouseLeave={() => setTempRating(0)}
          />
        ))}
      </div>
      <RatingText
        textColor={textColor}
        tempRating={tempRating}
        rating={rating}
        maxRating={maxRating}
        message={message}
      />
    </div>
  );
};

// StarRating.propTypes = {
//   maxRating: PropTypes.number,
//   color: PropTypes.string,
//   textColor: PropTypes.string,
//   size: PropTypes.string | PropTypes.number,
//   defaultRating: PropTypes.number,
//   message: PropTypes.array,
//   onRatingChange: PropTypes.func,
// };

export default StarRating;
