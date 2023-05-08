import { Modal, Box, Typography } from "@mui/material";

import RedeemPrizes from "../../pages/Prize/RedeemPrizes";

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

const EarnedPrizesModal = (props) => {
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
          {props.readerName}'s Earned Prizes
        </Typography>
        <RedeemPrizes readerId={props.readerId} />
      </Box>
    </Modal>
  );
};

export default EarnedPrizesModal;
