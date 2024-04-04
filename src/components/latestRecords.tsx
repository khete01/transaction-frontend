import React, { useEffect, useState } from "react";
import axios from "axios";
import Records from "./lastRecords";
import styles from "../styles/latestRecords.module.css";

function LatestRecords() {
  const [transactions, setTransactions] = useState([]);
  const [showIncome, setShowIncome] = useState(true); // State to track Income checkbox
  const [showExpense, setShowExpense] = useState(true); // State to track Expense checkbox

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8080/get-income");
      setTransactions(response.data);
    };
    fetchData();
  }, []);

  // Function to toggle Income checkbox
  const toggleIncomeCheckbox = () => {
    setShowIncome(!showIncome);
  };

  // Function to toggle Expense checkbox
  const toggleExpenseCheckbox = () => {
    setShowExpense(!showExpense);
  };

  // Filter transactions based on checkbox status
  const filterTransactions = () => {
    let filteredTransactions = transactions;
    if (!showIncome) {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.transactionType !== "income"
      );
    }
    if (!showExpense) {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.transactionType !== "expense"
      );
    }
    return filteredTransactions;
  };

  return (
    <div className={styles.container}>
      <div>
        {/* Income Checkbox */}
        <input
          type="checkbox"
          checked={showIncome}
          onChange={toggleIncomeCheckbox}
        />
        <label>Show Income</label>
      </div>
      <div>
        {/* Expense Checkbox */}
        <input
          type="checkbox"
          checked={showExpense}
          onChange={toggleExpenseCheckbox}
        />
        <label>Show Expense</label>
      </div>
      <div>
        <div className={styles.box}>Today</div>
        {/* Render filtered transactions */}
        {filterTransactions().map((transaction, index) => (
          <Records key={index} transactions={transaction} />
        ))}
      </div>
    </div>
  );
}

export default LatestRecords;
