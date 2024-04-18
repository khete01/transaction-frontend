import Navbar from "@/components/navbar";
import Header from "./header";
import List from "./List";
import Chart from "./chart";
import style from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
interface Transactions {
  createdAt: Date;
  category: string;
  amount: number;
  transactionType: string;
  note: string;
  _id: string;
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const router = useRouter();
  useEffect(() => {
    const isUserLoggedIn = () => {
      const user = localStorage.getItem("user");
      if (!user) {
        router.replace("/login");
      }
    };
    const fetchData = async () => {
      const userId = localStorage.getItem("user");
      try {
        const response = await axios.get(
          `https://transaction-backend-houf.onrender.com/get-income/${userId}`
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    isUserLoggedIn();
    fetchData();
  }, [router]);

  return (
    <div className={style.body}>
      <Navbar />
      <div className={style.container}>
        <Header transactions={transactions} />
        <Chart transactions={transactions} />
        <List transactions={transactions} setTransactions={setTransactions} />
      </div>
    </div>
  );
}
