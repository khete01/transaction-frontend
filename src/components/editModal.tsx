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
import { ToggleButton } from "@mui/material";
const styles = {
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20px",
    backgroundColor: "#0166FF",
    color: "white",
    width: "100px",
    height: "32px",
    border: "none",
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

interface Transaction {
  amount: number;
  _id: string;
  category: string;
  note: string;
}

interface EditModalProps {
  transactions: Transaction;
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpen(false);
  };
  const newTransaction = {
    userId: 1001,
    category: category,
    amount: amount,
    createdAt: new Date(date),
    note: note,
    transactionType: type,
  };

  const editTransactions = async () => {
    await axios.put(
      `https://transaction-backend-houf.onrender.com/edit/${transactions._id}`,
      newTransaction
    );
    setTransactions((prevTransactions) =>
      prevTransactions.filter(
        (transaction: { _id: string }) => transaction._id !== transactions._id
      )
    );
    setOpen(false);
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
            <ToggleButton
              style={Object.assign({}, styles.button, {
                backgroundColor: type === "expense" ? "#0166FF" : "gray",
              })}
              onClick={() => setType("expense")}
              className={type === "expense" ? "active" : ""}
            >
              Expense
            </ToggleButton>
            <ToggleButton
              style={Object.assign({}, styles.button, {
                backgroundColor: type === "income" ? "#16A34A" : "gray",
              })}
              onClick={() => setType("income")}
              className={type === "income" ? "active" : ""}
            >
              Income
            </ToggleButton>
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
                    onChange={(e) => setAmount(e.target.value)}
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
                <Button
                  type="submit"
                  style={styles.submit}
                  onClick={editTransactions}
                >
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
