import BlueCard from "@/components/blueCard";
import Cards from "@/components/cards";
import axios from "axios";
import React, { useState, useEffect } from "react";
function Header() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [incomeAmount, setIncomeAmount] = useState<number>(0);
  const [expenseAmount, setExpenseAmount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/get-income");
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach((transaction) => {
      if (transaction.transactionType === "income") {
        totalIncome += transaction.amount;
      } else if (transaction.transactionType === "expense") {
        totalExpense += transaction.amount;
      }
    });
    setIncomeAmount(totalIncome);
    setExpenseAmount(totalExpense);
  }, [transactions]);

  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", gap: "50px" }}
    >
      <BlueCard />
      <Cards
        amount={incomeAmount}
        title={"Your income"}
        text={"Your income amount"}
      />
      <Cards
        amount={expenseAmount}
        title={"Your expense"}
        text={"Your expense amount"}
      />
    </div>
  );
}

export default Header;
