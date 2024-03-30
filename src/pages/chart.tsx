import BarChart from "@/components/barChart";
import Dashboard from "@/components/charts";

function Chart() {
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", gap: "50px" }}
    >
      <BarChart />
      <Dashboard />
    </div>
  );
}
export default Chart;
