import styles from "@/styles/sidebar.module.css";
import Checkbox from "./sidebarCheckbox";
import Category from "./sidebarCategory";
import BasicModalDialog from "./createRecords";
function Sidebar() {
  const types = ["All", "Income", "Expense"];
  const categories = [
    "Food & Drinks",
    "Shopping",
    "Housing",
    "Transportation",
    "Vehicle",
  ];

  return (
    <div className={styles.container}>
      <div>
        <h2>Records</h2>
        <BasicModalDialog />
      </div>
      <input className={styles.search} placeholder=" Search"></input>
      <div>
        <h3>Types</h3>
        {types.map((type, index) => (
          <Checkbox key={index} type={type} />
        ))}
      </div>
      <div>
        <h3>Category</h3>
        {categories.map((category, index) => (
          <Category key={index} name={category} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
