import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";

function Stepp() {
  return (
    <Stepper sx={{ width: "100%" }}>
      <Step>
        <StepLabel>Currency</StepLabel>
      </Step>
      <Step>
        <StepLabel>Balance</StepLabel>
      </Step>
      <Step>
        <StepLabel>Finish</StepLabel>
      </Step>
    </Stepper>
  );
}

export default Stepp;
