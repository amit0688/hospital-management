const RatingText = ({ textColor, tempRating, rating, maxRating, message }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "4vh",
      }}
    >
      <p style={{ color: textColor, margin: 0 }}>
        {tempRating || rating || ""}
      </p>
      <p style={{ textTransform: "capitalize", color: textColor, margin: 0 }}>
        {message?.length === maxRating
          ? message[tempRating ? tempRating - 1 : rating - 1]
          : ""}
      </p>
    </div>
  );
};

// RatingText.propTypes = {
//   textColor: PropTypes.string,
//   tempRating: PropTypes.number,
//   rating: PropTypes.number,
//   maxRating: PropTypes.number,
//   message: PropTypes.array,
// };

export default RatingText;