import React, { useEffect, useState } from "react";
import axios from "axios";
import Records from "./lastRecords";
import styles from "../styles/latestRecords.module.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function LatestRecords() {
  const [transactions, setTransactions] = useState([]);
  const [showIncome, setShowIncome] = useState(false);
  const [showExpense, setShowExpense] = useState(false);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://transaction-backend-houf.onrender.com/get-income"
      );
      setTransactions(response.data);
    };
    fetchData();
  }, []);

  const handleRadioChange = (event) => {
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
          </RadioGroup>
        </FormControl>
        <div>
          <div className={styles.box}>Today</div>
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
  );
}

export default LatestRecords;
