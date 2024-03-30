import CardPic from "../../public/Large.png";
import styles from "../styles/blueCard.module.css";
function BlueCard() {
  return (
    <div
      style={{
        backgroundImage: `url(${CardPic.src})`,
        width: "384px",
        height: "216px",
        position: "relative",
      }}
    >
      <div className={styles.cardBox}>
        <p className={styles.text}>Cash</p>
        <p className={styles.number}>10,000,000</p>
      </div>
    </div>
  );
}
export default BlueCard;
