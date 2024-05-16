const containerStyle = {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    width: "70%",
    padding: "20px 0",
    margin: "0 auto",
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    border: "4px solid #944E63",
  };
  
  const RatingContainer = ({ children }) => {
    return <div style={containerStyle}>{children}</div>;
  };
  
  // RatingContainer.propTypes = {
  //   children: PropTypes.node,
  // };
  
  export default RatingContainer;