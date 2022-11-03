import { Modal, Box, Typography } from "@mui/material";

import SessionsHistory from "../../pages/Reader/Sessions/SessionsHistory";

const style = {
  display: "grid",
  justifyContent: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  boxShadow: 24,
  maxHeight: "80%",
  overflow: "auto",
  p: 4,
  "@media(min-width: 450px)": {
    width: "400px",
  },
};

const ReaderHistoryModal = (props) => {
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
          {props.readerName}'s Reading History
        </Typography>
        <SessionsHistory token={props.token} readerId={props.readerId} />
      </Box>
    </Modal>
  );
};

export default ReaderHistoryModal;
