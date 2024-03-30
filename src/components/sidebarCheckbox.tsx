import React from "react";

function Checkbox({ type }) {
  const checkBoxStyles = {
    borderRadius: "50px",
  };

  return (
    <div>
      <input type="checkbox" name={type} value={type} style={checkBoxStyles} />
      <label htmlFor={type}>{type}</label>
    </div>
  );
}

export default Checkbox;
