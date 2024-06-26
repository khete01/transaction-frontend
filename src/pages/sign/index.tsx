/* eslint-disable max-lines */
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useState } from "react";
import { GeldIcon } from "@/icons/geld";
import styles from "@/styles/signStyles.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { ChangeEvent } from "react";
import { TailSpin } from "react-loader-spinner";
function Sign() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [required, setRequired] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChangename = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    if (name.length < 4) {
      setNameError("name must be more than 4 characters");
    } else {
      setNameError("");
    }
    setName(name);
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

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    if (email.includes("@")) {
      setEmailError("");
    } else {
      setEmailError("Please enter valid email");
    }
    setEmail(email);
  };

  const handleChangeConfirmPassword = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const confirmPassword = event.target.value;
    if (confirmPassword.length < 8) {
      setConfirmPasswordError("Password must be more than 8 characters");
    } else {
      setConfirmPasswordError("");
    }
    setConfirmPassword(confirmPassword);
  };
  const handleSignup = () => {
    if (
      name === "" ||
      confirmPassword === "" ||
      email === "" ||
      password === ""
    ) {
      setRequired("Please enter all inputs");
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords doesn't match");
    } else {
      setLoading(true);
      axios
        .post("https://transaction-backend-houf.onrender.com/sign", {
          email: email,
          password: password,
          name: name,
        })
        .then(() => {
          setLoading(false);
          router.push("/login");
        })
        .catch((err) => {
          console.log(err.message);
          setRequired("Email address is already used");
          setLoading(false);
        });
    }
  };
  const login = () => {
    router.replace("/login");
  };
  return (
    <div className={styles.container}>
      <div className={styles.win1}>
        <div className={styles.box}>
          <div className={styles.titleBox}>
            <GeldIcon />
          </div>
          <div
            className={styles.textBox}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <h2 style={{ fontFamily: "roboto" }}>Create Geld account</h2>
            <p style={{ fontFamily: "roboto" }}>
              Sign up below to create your Wallet account
            </p>
          </div>
          <div className={styles.inpDiv} style={{ flexDirection: "column" }}>
            <input
              placeholder=" Name"
              className={styles.inp}
              onChange={handleChangename}
            />
            <div className={styles.required} style={{ color: "red" }}>
              {nameError}
            </div>
            <input
              placeholder=" Email"
              className={styles.inp}
              onChange={handleChangeEmail}
            />
            <div className={styles.required} style={{ color: "red" }}>
              {emailError}
            </div>
            <input
              placeholder=" Password"
              className={styles.inp}
              onChange={handleChangePassword}
              type="password"
            />
            <div className={styles.required} style={{ color: "red" }}>
              {passwordError}
            </div>
            <input
              placeholder=" Re-Password"
              className={styles.inp}
              onChange={handleChangeConfirmPassword}
              type="password"
            />
            <div className={styles.required} style={{ color: "red" }}>
              {confirmPasswordError}
            </div>
            <div className={styles.required} style={{ color: "red" }}>
              <p className={styles.required} style={{ color: "red" }}>
                {required}
              </p>
            </div>
            {loading ? (
              <TailSpin color="black" radius={"10px"} />
            ) : (
              <button className={styles.button} onClick={handleSignup}>
                Sign up
              </button>
            )}
            <div className={styles.logInDiv}>
              <p>Already have account?</p>{" "}
              <p
                className={styles.logButton}
                onClick={login}
                style={{ cursor: "pointer" }}
              >
                Log in
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.win2}></div>
    </div>
  );
}
export default Sign;
