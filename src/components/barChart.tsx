import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Transactions {
  createdAt: Date;
  category: string;
  amount: number;
  transactionType: string;
  note: string;
  _id: string;
}
function BarChart({ transactions }: { transactions: Transactions[] }) {
  const incomeAmount: { [label: string]: number } = {};
  const expenseAmount: { [label: string]: number } = {};

  transactions.forEach((transaction) => {
    const label = transaction.createdAt.toLocaleString("en-us", {
      year: "numeric",
      month: "long",
    });

    if (transaction.transactionType === "income") {
      if (!incomeAmount[label]) {
        incomeAmount[label] = 0;
      }
      incomeAmount[label] += transaction.amount;
    } else if (transaction.transactionType === "expense") {
      if (!expenseAmount[label]) {
        expenseAmount[label] = 0;
      }
      expenseAmount[label] += transaction.amount;
    }
  });

  const labels = Array.from(
    new Set(
      transactions.map((transaction) =>
        transaction.createdAt.toLocaleString("en-us", {
          year: "numeric",
          month: "long",
        })
      )
    )
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: labels.map((label) => incomeAmount[label] || 0),
        backgroundColor: "#84CC16",
        borderRadius: 20,
        barThickness: 20,
      },
      {
        label: "Expense",
        data: labels.map((label) => expenseAmount[label] || 0),
        backgroundColor: "#F97316",
        borderRadius: 20,
        barThickness: 20,
      },
    ],
  };

  return (
    <div style={{ maxHeight: "400px", maxWidth: "800px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "600px",
          height: "360px",
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
            fontFamily: "Roboto",
            fontWeight: "600",
          }}
        >
          <h3>Income - Expenses</h3>
          {/* <p>Total: {sum}$</p> */}
        </div>
        <Bar
          style={{ height: "300px", width: "580px" }}
          data={data}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default BarChart;
