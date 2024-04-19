import { GeldIcon } from "@/icons/geld";
import Stepp from "../../components/stepper";
import ConfirmStyle from "./style";
import router from "next/router";
import { SignIcon } from "@/icons/signIcon";
function Confirmation() {
  const confirm = () => {
    router.replace("/");
  };
  return (
    <div style={{ ...ConfirmStyle.container, flexDirection: "column" }}>
      <div style={{ ...ConfirmStyle.iconBox, flexDirection: "column" }}>
        <GeldIcon />
        <Stepp />
      </div>
      <div style={ConfirmStyle.box}>
        <div style={{ ...ConfirmStyle.label, flexDirection: "column" }}>
          <div style={ConfirmStyle.picDiv}>
            <div style={ConfirmStyle.circle}>
              <SignIcon />
            </div>
          </div>

          <div style={ConfirmStyle.title}>
            <h2>Good job!</h2>
          </div>

          <p
            style={{
              ...ConfirmStyle.alt,
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "24px",
              letterSpacing: "0em",
              textAlign: "left",
            }}
          >
            Your very first account has been created. Now continue to dashboard
            and start tracking
          </p>
          <button style={ConfirmStyle.confirm} onClick={confirm}>
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
export default Confirmation;
