import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { useEffect, useState } from "react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];
const incomeAmount = {};
const expenseAmount = {};
const data = {
  labels,
  datasets: [
    {
      label: "Income",
      data: labels.map(() => {
        return incomeAmount * 3000000;
      }),
      backgroundColor: "#84CC16",
      borderRadius: "30",
    },
    {
      label: "Expense",
      data: labels.map(() => {
        return expenseAmount * 3000000;
      }),
      backgroundColor: "#F97316",
      borderRadius: "30",
    },
  ],
};

function BarChart() {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8080/get-income");
      setTransactions(response.data);
    };
    fetchData();
  }, []);
  if (transactions.transactionType == "income") {
  }
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
