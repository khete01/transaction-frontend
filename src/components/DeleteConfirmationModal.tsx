import React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import axios from "axios";

function DeleteConfirmationModal(transactions) {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/delete/${transactions._id}`);
      console.log("Deleted!");
    } catch (error) {
      console.error(error);
    }
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="black"
        endDecorator={<DeleteForever />}
        onClick={() => setOpen(true)}
      ></Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>Are you sure you want to delete?</DialogContent>
          <DialogActions>
            <Button variant="outlined" color="danger" onClick={handleDelete}>
              Delete
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
}

export default DeleteConfirmationModal;
