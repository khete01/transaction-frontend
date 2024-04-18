/* eslint-disable max-lines */
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const colors = ["#1C64F2", "#E74694", "#FDBA8C", "#16BDCA", "#F2901C"];

interface Transactions {
  createdAt: Date;
  category: string;
  amount: number;
  transactionType: string;
  note: string;
  _id: string;
}
interface Expenses {
  [category: string]: number;
}

function Dashboard({ transactions }: { transactions: Transactions[] }) {
  const expensesTransactions = transactions.filter(
    (transaction) => transaction.transactionType === "expense"
  );

  const expenses: Expenses = expensesTransactions.reduce<Expenses>(
    (acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    },
    {}
  );

  const categories = Object.keys(expenses);
  const expensesArray = Object.values(expenses);

  const sum: number = expensesArray.reduce((a: number, b: number) => a + b, 0);

  const dataSet = {
    labels: categories,
    datasets: [
      {
        data: expensesArray,
        backgroundColor: colors,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "588px",
        borderRadius: "12px",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        <h3 style={{ fontFamily: "Roboto", fontWeight: "600" }}>Expenses</h3>
        <p>Total: {sum}$</p>
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "#F5F5F5",
          height: "1px",
          margin: "10px 0",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Doughnut
          data={dataSet}
          options={options}
          style={{ maxHeight: "156px", maxWidth: "156px" }}
        />
        <Labels categories={categories} expenses={expensesArray} sum={sum} />
      </div>
    </div>
  );
}
const Labels = ({
  categories,
  expenses,
  sum,
}: {
  categories: string[];
  expenses: number[];
  sum: number;
}) => {
  return (
    <div>
      {categories.map((category, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{ display: "flex", alignItems: "center", width: "150px" }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: colors[index],
                margin: "5px",
                borderRadius: "50%",
              }}
            />
            <p
              style={{
                marginRight: "10px",
                fontFamily: "Roboto",
                fontWeight: "400",
              }}
            >
              {category}
            </p>
          </div>
          <div
            style={{ width: "100px", fontFamily: "Roboto", fontWeight: "400" }}
          >
            {expenses[index]}$
          </div>
          <div
            style={{ width: "100px", fontFamily: "Roboto", fontWeight: "400" }}
          >
            {((expenses[index] * 100) / sum).toFixed(2)}%
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
