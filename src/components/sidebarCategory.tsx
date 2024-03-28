import React from "react";

function Category(name) {
  return (
    <div>
      <label htmlFor={name}>{name}</label>
    </div>
  );
}

export default Category;
