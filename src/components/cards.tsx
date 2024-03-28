import React from "react";
import styles from "../styles/cards.module.css";
import { Income } from "@/icons/income";

interface CardsProps {
  title: string;
  amount: number;
  text: string;
}

const Cards: React.FC<CardsProps> = ({ title, amount, text }) => {
  return (
    <div>
      <div className={styles.card}>
        <div className={styles.box1}>
          <div className={styles.dot}></div>
          <p className={styles.title}>{title}</p>
        </div>
        <div className={styles.box2}>
          <div className={styles.miniBox1}>
            <h2 className={styles.amountNum}>{amount}</h2>
            <p className={styles.amount}>{text}</p>
          </div>
          <div className={styles.iconBox}>
            <Income />
            <h3 className={styles.percentage}>from last month</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
