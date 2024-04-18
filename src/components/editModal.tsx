/* eslint-disable max-lines */
import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import axios from "axios";
import style from "../styles/edit.module.css";
import ColorToggleButton from "./typeButton";
import { Dispatch, SetStateAction } from "react";

const styles = {
  button: {
    backgroundColor: "#0166FF",
  },
  type: {
    display: "flex",
  },
  note: {
    width: "250px",
    height: "150px",
  },
  formSection: {
    flex: 1,
    padding: "0 20px",
  },
  formContainer: {
    display: "flex",
    gap: "20px",
  },
  submit: {
    backgroundColor: "#0166FF",
    borderRadius: "20px",
  },
};

const categories = ["Food", "Shopping", "Bills", "Clothing"];

interface Transactions {
  createdAt: Date;
  category: string;
  amount: number;
  transactionType: string;
  note: string;
  _id: string;
}

interface EditModalProps {
  transactions: Transactions;
  setTransactions: Dispatch<SetStateAction<Transactions[]>>;
}

export default function EditModalDialog({
  transactions,
  setTransactions,
}: EditModalProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [amount, setAmount] = React.useState<number>(transactions.amount);
  const [category, setCategory] = React.useState<string>(transactions.category);
  const [date, setDate] = React.useState<string>();
  const [type, setType] = React.useState<string>("expense");
  const [note, setNote] = React.useState<string>(transactions.note);
  const [categoryModalOpen, setCategoryModalOpen] =
    React.useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpen(false);
    await editTransactions();
  };

  const userId = localStorage.getItem("user");
  console.log(userId);
  const newTransaction = {
    userId: userId,
    category: category,
    amount: amount,
    createdAt: date,
    note: note,
    transactionType: type,
  };

  const editTransactions = async () => {
    try {
      const response = await axios.put(
        `https://transaction-backend-houf.onrender.com/edit/${transactions._id}`,
        newTransaction
      );
      setTransactions((prevTransactions) => {
        const updatedTransactions = prevTransactions.map((transaction) =>
          transaction._id === transactions._id ? response.data : transaction
        );
        return updatedTransactions;
      });
    } catch (error) {
      console.error("Error editing transaction:", error);
    }
  };

  const openCategoryModal = () => {
    setCategoryModalOpen(true);
  };

  const closeCategoryModal = () => {
    setCategoryModalOpen(false);
  };

  const selectCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
    closeCategoryModal();
  };

  return (
    <React.Fragment>
      <Button
        className={style.button}
        style={styles.button}
        variant="outlined"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        Edit
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <div style={styles.type}>
            <ColorToggleButton setType={setType} type={type} />
          </div>
          <form onSubmit={handleSubmit} style={styles.formContainer}>
            <div style={styles.formSection}>
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Amount</FormLabel>
                  <Input
                    autoFocus
                    required
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <Input
                    required
                    value={category}
                    onClick={openCategoryModal}
                    readOnly
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Date</FormLabel>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </FormControl>
                <Button type="submit" style={styles.submit}>
                  Save Changes
                </Button>
              </Stack>
            </div>
            <div style={styles.formSection}>
              <FormControl>
                <FormLabel>Note</FormLabel>
                <TextareaAutosize
                  style={styles.note}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </FormControl>
            </div>
          </form>
        </ModalDialog>
      </Modal>
      <Modal open={categoryModalOpen} onClose={closeCategoryModal}>
        <ModalDialog>
          <Stack spacing={2}>
            {categories.map((cat) => (
              <Button key={cat} onClick={() => selectCategory(cat)}>
                {cat}
              </Button>
            ))}
          </Stack>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
