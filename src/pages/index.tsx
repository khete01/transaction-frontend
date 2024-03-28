import Navbar from "@/components/navbar";
import Header from "./header";
import List from "./List";
import Chart from "./chart";
import style from "../styles/Home.module.css";
export default function Home() {
  return (
    <div className={style.body}>
      <Navbar />
      <div>
        <div className={style.container}>
          <Header />
          <Chart />
          <List />
        </div>
      </div>
    </div>
  );
}
