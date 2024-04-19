"use client"
import Records from "@/components/lastRecords";
import style from "../styles/list.module.css";
import React, { Dispatch, SetStateAction } from "react";

type Transactions = {
  createdAt: Date;
  category: string;
  amount: number;
  transactionType: string;
  note: string;
  _id: string;
};

interface listComponentProps {
  transactions: Transactions[];
  setTransactions: Dispatch<SetStateAction<Transactions[]>>;
}
const List = ({ transactions, setTransactions }: listComponentProps) => {
  const sortedTransactions = transactions.slice().sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    return dateB - dateA;
  });

  const lastTenTransactions = sortedTransactions.slice(0, 5);

  return (
    <div className={style.container}>
      <div>
        <div className={style.box}>Last records</div>
        {lastTenTransactions.map((transaction, index) => (
          <Records
            key={index}
            transactions={transaction}
            setTransactions={setTransactions}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
