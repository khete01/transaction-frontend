import { GeldIcon } from "@/icons/geld";
import Stepp from "../../components/stepper";
import  balanceStyle  from "./style";
import { VectorIcon } from "@/icons/vector";
import router from "next/router";
function Balance() {
  const confirm = () => {
    router.replace("/confirm");
  };
  return (
    <div style={{ ...balanceStyle.container, flexDirection: "column" }}>
      <div style={{ ...balanceStyle.iconBox, flexDirection: "column" }}>
        <GeldIcon />
        <Stepp />
      </div>
      <div style={balanceStyle.box}>
        <div style={{ ...balanceStyle.label, flexDirection: "column" }}>
          <div style={balanceStyle.picDiv}>
            <div style={balanceStyle.circle}>
              <VectorIcon />
            </div>
          </div>
          <label>
            <div style={balanceStyle.title}>
              <h2>Set up your cash Balance</h2>
            </div>
            <input style={balanceStyle.select} placeholder="  Email" />
          </label>
          <p
            style={{
              ...balanceStyle.alt,
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "16px",
              letterSpacing: "0em",
              textAlign: "left",
            }}
          >
            How much cash do you have in your wallet?
          </p>
          <button style={balanceStyle.confirm} onClick={confirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
export default Balance;
