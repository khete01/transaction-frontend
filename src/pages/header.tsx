import BlueCard from "@/components/blueCard";
import Cards from "@/components/cards";
import React, { useState, useEffect } from "react";

interface Transaction {
  transactionType: string;
  amount: number;
}

interface HeaderProps {
  transactions: Transaction[];
}

function Header({ transactions }: HeaderProps) {
  const [incomeAmount, setIncomeAmount] = useState<number>(0);
  const [expenseAmount, setExpenseAmount] = useState<number>(0);

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
