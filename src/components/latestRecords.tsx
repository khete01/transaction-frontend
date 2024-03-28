import styles from "../styles/latestRecords.module.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Records from "./lastRecords";
function LatestRecords() {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8080/get-income");
      setTransactions(response.data);
    };
    fetchData();
  }, []);

  console.log(transactions);
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.box}>Today</div>
        {transactions.map((transactions, index) => (
          <Records key={index} transactions={transactions} />
        ))}
      </div>
    </div>
  );
}

export default LatestRecords;
