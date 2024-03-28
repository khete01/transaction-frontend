import DeleteConfirmationModal from "./DeleteConfirmationModal";
import styles from "../styles/lastRecords.module.css";
import { HouseIcon } from "@/icons/houseIcon";
// import { PenIcon } from "@/icons/penIcon";
// import EditModalDialog from "./editModal";
import React from "react";

interface Transactions {
  createdAt: Date;
  category: string;
  amount: number;
  transactionType: string;
  note: string;
}

interface RecordsProps {
  transactions: Transactions;
}

function Records({ transactions }: RecordsProps) {
  const createdAtDate = new Date(transactions.createdAt);
  const timeDifference = Date.now() - createdAtDate.getTime();
  let timeAgo: string;

  if (timeDifference < 24 * 60 * 60 * 1000) {
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
    timeAgo = hoursAgo > 1 ? `${hoursAgo} hours ago` : `${hoursAgo} hour ago`;
  } else {
    const daysAgo = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    const remainingHours = Math.floor(
      (timeDifference % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
    );
    timeAgo =
      remainingHours > 0 ? `${daysAgo} days ago` : `${daysAgo} days ago`;
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
                <DeleteConfirmationModal transactions={transactions} />

                {/* <EditModalDialog /> */}
              </div>
            </>
          ) : (
            <>
              <p className={styles.expense}>-</p>
              <p className={styles.amount} style={{ color: "red" }}>
                {transactions.amount}
              </p>
              <div className={styles.iconBox}>
                <DeleteConfirmationModal transactions={transactions} />
                {/* <EditModalDialog /> */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Records;
