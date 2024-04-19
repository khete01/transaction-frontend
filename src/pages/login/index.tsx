import { GeldIcon } from "@/icons/geld";
import styles from "@/styles/loginStyles.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [required, setRequired] = useState("");

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    if (email.includes("@")) {
      setEmailError("");
    } else {
      setEmailError("Please enter valid email");
    }
    setEmail(email);
  };
  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    if (password.length < 8) {
      setPasswordError("Password must be more than 8 characters");
    } else {
      setPasswordError("");
    }
    setPassword(password);
  };

  const handleLogin = () => {
    if (email === "" || password === "") {
      setRequired("Please enter all inputs");
    } else {
      setLoading(true);
      axios
        .post("https://transaction-backend-houf.onrender.com/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          const user = res.data;
          console.log(user);
          localStorage.setItem("user", user);
          setLoading(false);
          router.replace("/currency");
        })
        .catch((err) => {
          console.log(err);
          setRequired(err.message);
          setLoading(false);
        });
    }
  };
  const sign = () => {
    router.replace("/sign");
  };

  return (
    <div className={styles.container}>
      <div className={styles.win1}>
        <div className={styles.box}>
          <div className={styles.titleBox}>
            <GeldIcon />
          </div>
          <div className={styles.titlediv} style={{flexDirection:"column"}}>
            <h2>Welcome Back</h2>
            <p>Welcome back, Please enter your details</p>
          </div>
          <input
            placeholder=" Email"
            className={styles.inp}
            onChange={handleChangeEmail}
          />
          <div className={styles.required}>{emailError}</div>

          <input
            placeholder=" Password"
            className={styles.inp}
            onChange={handleChangePassword}
            type="password"
          />
          <div className={styles.required}>{passwordError}</div>

          <div className={styles.required}>
            <p className={styles.required}>{required}</p>
          </div>
          {loading ? (
            <TailSpin color="black" radius={"10px"} />
          ) : (
            <button className={styles.button} onClick={handleLogin}>
              Login
            </button>
          )}
          <div className={styles.logInDiv}>
            <p>Don`t have account?</p>{" "}
            <p className={styles.logButton} onClick={sign}>
              Sign
            </p>
          </div>
        </div>
      </div>
      <div className={styles.win2}></div>
    </div>
  );
}

export default Login;
