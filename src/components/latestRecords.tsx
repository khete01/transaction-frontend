import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/latestRecords.module.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Records from "./lastRecords";

interface Transactions {
  createdAt: Date;
  category: string;
  amount: number;
  transactionType: string;
  note: string;
  _id: string;
}

function LatestRecords() {
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [showIncome, setShowIncome] = useState(false);
  const [showExpense, setShowExpense] = useState(false);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("user");
      const response = await axios.get(
        `https://transaction-backend-houf.onrender.com/get-income/${userId}`
      );
      setTransactions(response.data);
    };
    fetchData();
  }, []);

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setShowIncome(value === "Income");
    setShowExpense(value === "Expense");
    setShowAll(value === "All");
  };

  const filterTransactions = () => {
    let filteredTransactions = transactions;
    if (!showAll) {
      filteredTransactions = transactions.filter(
        (transaction) =>
          (showIncome && transaction.transactionType !== "expense") ||
          (showExpense && transaction.transactionType !== "income")
      );
    }
    return filteredTransactions;
  };

  return (
    <div className={styles.container}>
      <div className={styles.typeBox}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={showAll ? "All" : showIncome ? "Income" : "Expense"}
            onChange={handleRadioChange}
            name="radio-buttons-group"
          >
            <div className={styles.FormControl}>
              <FormControlLabel value="All" control={<Radio />} label="All" />
              <FormControlLabel
                value="Income"
                control={<Radio />}
                label="Income"
              />
              <FormControlLabel
                value="Expense"
                control={<Radio />}
                label="Expense"
              />
            </div>
          </RadioGroup>
        </FormControl>
        <div>
          <div className={styles.scrollContainer}>
            {filterTransactions().map((transaction, index) => (
              <Records
                key={index}
                transactions={transaction}
                setTransactions={setTransactions}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LatestRecords;
