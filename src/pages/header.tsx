import BlueCard from "@/components/blueCard";
import Cards from "@/components/cards";

function Header() {
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", gap: "50px" }}
    >
      <BlueCard />
      <Cards amount={1} title={"Your income"} text={"Your income amount"} />
      <Cards amount={1} title={"Your expense"} text={"Your income amount"} />
    </div>
  );
}
export default Header;
