import LatestRecords from "@/components/latestRecords";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import style from "@/styles/records.module.css";

function RecordsPage() {
  return (
    <div className={style.container}>
      <Navbar />
      <div className={style.body}>
        <Sidebar  />
        <LatestRecords />
      </div>
    </div>
  );
}
export default RecordsPage;
