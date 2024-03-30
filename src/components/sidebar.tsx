import React from "react";
import sidebarStyles from "@/styles/sidebar.module.css"; // Rename the imported styles

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
    <div className={sidebarStyles.container}>
      <div>
        <h2>Records</h2>
        <BasicModalDialog />
      </div>
      <input className={sidebarStyles.search} placeholder=" Search"></input>
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
