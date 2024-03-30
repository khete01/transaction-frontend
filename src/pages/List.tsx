import Records from "@/components/lastRecords";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "../styles/list.module.css";
function List() {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8080/get-income");
      setTransactions(response.data);
    };
    fetchData();
  }, []);
  const lastTenTransactions = transactions.slice(0, 5);
  console.log(transactions);
  return (
    <div className={style.container}>
      <div>
        <div className={style.box}>Last records</div>
        {lastTenTransactions.map((transactions, index) => (
          <Records key={index} transactions={transactions} />
        ))}
      </div>
    </div>
  );
}

export default List;
