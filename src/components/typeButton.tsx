import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface ColorToggleButtonProps {
  type: string;
  setType: (type: string) => void;
}

export default function ColorToggleButton({
  type,
  setType,
}: ColorToggleButtonProps) {
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton
        value="expense"
        onClick={() => setType("expense")}
        className={type === "expense" ? "active" : ""}
      >
        EXPENSE
      </ToggleButton>
      <ToggleButton
        value="income"
        onClick={() => setType("income")}
        className={type === "income" ? "active" : ""}
      >
        INCOME
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
