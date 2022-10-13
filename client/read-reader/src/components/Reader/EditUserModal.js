import { Modal } from "@mui/material";

const EditUserModal = (props) => {
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Form></Form>
        </Modal>
    );
};

export default EditUserModal;