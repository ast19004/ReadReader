import { Modal, Box, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AuthInfoModal = (props) => {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          display: "flex",
          margin: "10% 2%",
          justifyContent: "center",
          outline: "none",
        }}
      >
        <Box
          component="section"
          sx={{
            backgroundColor: "rgba(245, 245, 245, 0.9)",
            border: "1px solid #0000001a",
            borderRadius: "15px",
            boxShadow: "6px 6px 8px rgba(0,0,0, 0.3)",
            padding: "2% 5%",
          }}
        >
          <Box
            component="section"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography
              component="h1"
              sx={{
                color: "#1976d2",
                fontSize: "36px",
              }}
            >
              READ READER
            </Typography>
            <Button onClick={props.onClose}>
              <CloseIcon sx={{ opacity: "0.7" }} />
            </Button>
          </Box>
          <Box
            component="p"
            sx={{
              color: "#666",
              maxWidth: "500px",
              lineHeight: "24px",
              marginTop: "0.4rem",
            }}
          >
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
