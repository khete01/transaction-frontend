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

const categories = ["Food", "shopping", "bills", "clothing"];

export default function BasicModalDialog() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [type, setType] = React.useState<string>("expense");
  const [amount, setAmount] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("");
  const [date, setDate] = React.useState<string>("");
  const [note, setNote] = React.useState<string>("");
  const [categoryModalOpen, setCategoryModalOpen] =
    React.useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTransaction = {
      userId: 1001,
      category: category,
      amount: amount,
      createdAt: new Date(date),
      note: note,
      transactionType: type,
    };

    createTransaction(newTransaction);
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

  const createTransaction = async (newTransaction: JSON) => {
    try {
      await axios.post(
        "http://localhost:8080/create-transaction",
        newTransaction
      );

      console.log("success!");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <React.Fragment>
      <Button
        style={styles.button}
        variant="outlined"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        Record
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <div style={styles.type}>
            <button
              style={Object.assign({}, styles.button, {
                backgroundColor: type === "expense" ? "#0166FF" : "gray",
              })}
              onClick={() => setType("expense")}
              className={type === "expense" ? "active" : ""}
            >
              Expense
            </button>
            <button
              style={Object.assign({}, styles.button, {
                backgroundColor: type === "income" ? "#16A34A" : "gray",
              })}
              onClick={() => setType("income")}
              className={type === "income" ? "active" : ""}
            >
              Income
            </button>
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
                <Button type="submit" style={styles.submit}>
                  Add Record
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
