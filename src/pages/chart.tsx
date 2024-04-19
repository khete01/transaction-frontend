"use client"
import React from "react";
import BarChart from "@/components/barChart";
import Dashboard from "@/components/charts";

interface Transactions {
  createdAt: Date;
  category: string;
  amount: number;
  transactionType: string;
  note: string;
  _id: string;
}

interface ChartProps {
  transactions: Transactions[];
}

function Chart({ transactions }: ChartProps) {
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", gap: "50px" }}
    >
      <BarChart transactions={transactions}/>
      <Dashboard transactions={transactions} />
    </div>
  );
}

export default Chart;
