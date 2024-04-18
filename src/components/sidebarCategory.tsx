import React from "react";
import style from "../styles/category.module.css";
import { AngleRight } from "@/icons/angleRight";
interface CategoryProps {
  name: string;
}

const Category: React.FC<CategoryProps> = ({ name }) => {
  return (
    <div className={style.box}>
      <label htmlFor={name}>{name}</label>
      <AngleRight />
    </div>
  );
};

export default Category;
