import { GeldIcon } from "@/icons/geld";
import Stepp from "../../components/stepper";
import  styles  from "@/styles/balance.module.css"
import { VectorIcon } from "@/icons/vector";
import router from "next/router";
function Balance() {
  const confirm = () => {
    router.replace("/confirm");
  };
  return (
    <div className={styles.container }>
      <div className={styles.iconBox }>
        <GeldIcon />
        <Stepp />
      </div>
      <div className={styles.box}>
        <div className={styles.label }>
          <div className={styles.picDiv}>
            <div className={styles.circle}>
              <VectorIcon />
            </div>
          </div>
          <label>
            <div className={styles.title}>
              <h2>Set up your cash Balance</h2>
            </div>
            <input className={styles.select} placeholder="  Email" />
          </label>
          <p
            style={{
              color: "#475569",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "16px",
              letterSpacing: "0em",
              textAlign: "left",
            }}
          >
            How much cash do you have in your wallet?
          </p>
          <button className={styles.confirm} onClick={confirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
export default Balance;
