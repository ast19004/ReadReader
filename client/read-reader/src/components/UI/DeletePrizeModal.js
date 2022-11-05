import { Modal, Box, Typography } from "@mui/material";

import ConfirmPrizeDelete from "./ConfirmPrizeDelete";

const style = {
  display: "grid",
  justifyContent: "center",
  position: "absolute",
  maxHeight: "80%",
  overflow: "auto",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  "@media(min-width: 450px)": {
    width: "400px",
  },
};

const DeletePrizeModal = (props) => {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h4"
          component="h2"
          sx={{ textAlign: "center" }}
        >
          Delete Prize:
        </Typography>
        <ConfirmPrizeDelete
          onClose={props.onClose}
          prizeId={props.prizeId}
          prizeName={props.prizeName}
        />
      </Box>
    </Modal>
  );
};

export default DeletePrizeModal;
