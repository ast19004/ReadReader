import { Modal, Typography, Box } from "@mui/material";
import { grid } from "@mui/system";

import EditUserForm from "./EditUserForm";


const style = {
    display: 'grid',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    '@media(min-width: 450px)': {
        top: '25%',
        width: '400px',
      }
};

const EditUserModal = (props) => {
    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <EditUserForm onClose={props.onClose}/>
        </Box>   
        </Modal>
    );
};

export default EditUserModal;