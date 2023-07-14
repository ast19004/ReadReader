import { Modal, Box } from "@mui/material";
const AuthInfoModal = (props) => {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ display: "flex", margin: "10% 2%", justifyContent: "center" }}>
        <Box
          component="section"
          sx={{
            backgroundColor: "rgba(245, 245, 245, 0.9)",
            border: "1px solid #0000001a",
            borderRadius: "15px",
            padding: "2% 5%",
          }}
        >
          <Box
            component="h1"
            sx={{
              color: "#1976d2",
            }}
          >
            READ READER
          </Box>
          <Box component="p" sx={{ color: "#666", maxWidth: "500px" }}>
            Created with elementary school children and their guardians in mind,
            this application provides guardians with the ability to track the
            children's daily reading. Each child has their own personal account
            within the guardian's account and is able to 'pay' for rewards based
            on the amount of time they have read. It is up the main user/
            guardian to create possible prizes and to decide upon how much time
            in reading will be required to redeem each prize.
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthInfoModal;
