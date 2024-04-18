import DeleteConfirmationModal from "./DeleteConfirmationModal";
import styles from "../styles/lastRecords.module.css";
import { HouseIcon } from "@/icons/houseIcon";
import React, { Dispatch, SetStateAction } from "react";
import EditModalDialog from "./editModal";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

interface Transactions {
  createdAt: Date;
  category: string;
  amount: number;
  transactionType: string;
  note: string;
  _id: string;
}

interface RecordsProps {
  transactions: Transactions;
  setTransactions: Dispatch<SetStateAction<Transactions[]>>;
}
function Records({ transactions, setTransactions }: RecordsProps) {
  const createdAtDate = new Date(transactions.createdAt);
  const timeDifference = Date.now() - createdAtDate.getTime();
  let timeAgo: string;

  const daysAgo = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
  const weeksAgo = Math.floor(daysAgo / 7);
  const monthsAgo = Math.floor(daysAgo / 30);
  const yearsAgo = Math.floor(daysAgo / 365);

  if (yearsAgo > 0) {
    timeAgo = yearsAgo > 1 ? `${yearsAgo} years ago` : `${yearsAgo} year ago`;
  } else if (monthsAgo > 0) {
    timeAgo =
      monthsAgo > 1 ? `${monthsAgo} months ago` : `${monthsAgo} month ago`;
  } else if (weeksAgo > 0) {
    timeAgo = weeksAgo > 1 ? `${weeksAgo} weeks ago` : `${weeksAgo} week ago`;
  } else {
    timeAgo = daysAgo > 1 ? `${daysAgo} days ago` : `${daysAgo} day ago`;
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.records}>
          <div className={styles.circle}>
            <HouseIcon />
          </div>
          <div className={styles.text}>
            <h3 className={styles.title} style={{ color: "black" }}>
              {transactions.category}
            </h3>
            <p className={styles.date}>{timeAgo}</p>
          </div>
        </div>
        <p className={styles.note}>{transactions.note}</p>
        <div className={styles.amountDiv}>
          {transactions.transactionType === "income" ? (
            <>
              <p className={styles.income} style={{ color: "#84cc16" }}>
                +
              </p>
              <p className={styles.amount} style={{ color: "#84cc16" }}>
                {transactions.amount}
              </p>
              <div className={styles.iconBox}>
                <DeleteConfirmationModal
                  transactions={transactions}
                  setTransactions={setTransactions}
                />
                <EditModalDialog
                  transactions={transactions}
                  setTransactions={setTransactions}
                />
              </div>
            </>
          ) : (
            <>
              <p className={styles.expense}>-</p>
              <p className={styles.amount} style={{ color: "red" }}>
                {transactions.amount}
              </p>
              <div className={styles.iconBox}>
                <DeleteConfirmationModal
                  transactions={transactions}
                  setTransactions={setTransactions}
                />
                <EditModalDialog
                  transactions={transactions}
                  setTransactions={setTransactions}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Records;
