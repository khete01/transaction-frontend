import { GeldIcon } from "@/icons/geld";
import Stepp from "../../components/stepper";
import styles from "../../styles/confirm.module.css"
import router from "next/router";
import { SignIcon } from "@/icons/signIcon";
function Confirmation() {
  const confirm = () => {
    router.replace("/");
  };
  return (
    <div className={styles.container}>
      <div className={styles.iconBox}>
        <GeldIcon />
        <Stepp />
      </div>
      <div className={styles.box}>
        <div className={styles.label}>
          <div className={styles.picDiv}>
            <div className={styles.circle}>
              <SignIcon />
            </div>
          </div>

          <div className={styles.title}>
            <h2>Good job!</h2>
          </div>

          <p
            style={{
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
          <button className={styles.confirm} onClick={confirm}>
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
export default Confirmation;
