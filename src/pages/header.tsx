import BlueCard from "@/components/blueCard";
import Cards from "@/components/cards";

function Header({ transactions }) {
  // if (!Array.isArray(transactions)) {
  //   return;
  // }

  // const expenseTransactions = transactions.filter(
  //   (transaction) => transaction.transactionType === "expense"
  // );

  // const totalExpenseAmount = expenseTransactions.reduce(
  //   (total, transaction) => total + transaction.amount,
  //   0
  // );

  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", gap: "50px" }}
    >
      <BlueCard />
      <Cards amount={1} title={"Your income"} text={"Your income amount"} />
      <Cards amount={1} title={"Your expense"} text={"Your expense amount"} />
    </div>
  );
}

export default Header;
