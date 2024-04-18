import { NavbarIcon } from "@/icons/navbarIcon";
import { CompStyles } from "./style";
import { useRouter } from "next/router";
import BasicModalDialog from "./createRecords";
function Navbar() {
  const router = useRouter();
  const changeToRecords = () => {
    router.replace("/records");
  };
  const changeToDashboard = () => {
    router.replace("/");
  };
  return (
    <div style={CompStyles.body}>
      <div style={CompStyles.container}>
        <div style={CompStyles.box1}>
          <NavbarIcon />
          <div style={CompStyles.buttonsDiv}>
          <button style={CompStyles.button} onClick={() => changeToDashboard()}>
            <h2 style={CompStyles.dashboard}>Dashboard</h2>
          </button>
          <button style={CompStyles.button} onClick={() => changeToRecords()}>
            <h2 style={CompStyles.recordButton}>Records</h2>
          </button>
        </div>
        </div>
        <div style={CompStyles.box2}>
          <BasicModalDialog />
        </div>
      </div>
    </div>
  );
}
export default Navbar;
