import React, { Dispatch, SetStateAction } from "react";
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

interface Transactions {
  createdAt: Date;
  category: string;
  amount: number;
  transactionType: string;
  note: string;
  _id: string;
}

interface DeleteConfirmationModalProps {
  transactions: Transactions;
  setTransactions: Dispatch<SetStateAction<Transactions[]>>;
}

function DeleteConfirmationModal({
  transactions,
  setTransactions,
}: DeleteConfirmationModalProps) {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://transaction-backend-houf.onrender.com/delete/${transactions._id}`
      );
      console.log("Deleted!");
      setTransactions((prevTransactions) =>
        prevTransactions.filter(
          (transaction: { _id: string }) => transaction._id !== transactions._id
        )
      );
    } catch (error) {
      console.error(error);
    }
    setOpen(false);
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>
        <DeleteForever style={{ color: "black" , cursor: "pointer"}} />
      </div>
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
