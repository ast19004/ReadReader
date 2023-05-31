const AddPrizeImage = (props) => {
  return !props.file ? (
    <img
      src={props.defaultImage}
      alt="Gift wrapped with a bow"
      style={{ marginBottom: "2rem", maxHeight: "125px" }}
    />
  ) : (
    <img
      src={props.previewUrl}
      alt="Preview"
      style={{
        marginBottom: "2rem",
        maxWidth: "300px",
        maxHeight: "125px",
      }}
    />
  );
};

export default AddPrizeImage;
