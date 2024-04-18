/* eslint-disable max-lines */
import { useState } from "react";
import { GeldIcon } from "@/icons/geld";
import { signUpStyles } from "./style";
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
    <div style={signUpStyles.container}>
      <div style={signUpStyles.win1}>
        <div style={{ ...signUpStyles.box, flexDirection: "column" }}>
          <div style={signUpStyles.titleBox}>
            <GeldIcon />
          </div>
          <div style={{ ...signUpStyles.textBox, flexDirection: "column" }}>
            <h2>Create Geld account</h2>
            <p>Sign up below to create your Wallet account</p>
          </div>
          <div style={{ ...signUpStyles.inpDiv, flexDirection: "column" }}>
            <input
              placeholder=" Name"
              style={signUpStyles.inp}
              onChange={handleChangename}
            />
            <div style={signUpStyles.required}>{nameError}</div>
            <input
              placeholder=" Email"
              style={signUpStyles.inp}
              onChange={handleChangeEmail}
            />
            <div style={signUpStyles.required}>{emailError}</div>
            <input
              placeholder=" Password"
              style={signUpStyles.inp}
              onChange={handleChangePassword}
              type="password"
            />
            <div style={signUpStyles.required}>{passwordError}</div>
            <input
              placeholder=" Re-Password"
              style={signUpStyles.inp}
              onChange={handleChangeConfirmPassword}
              type="password"
            />
            <div style={signUpStyles.required}>{confirmPasswordError}</div>
            <div style={signUpStyles.required}>
              <p style={signUpStyles.required}>{required}</p>
            </div>
            {loading ? (
              <TailSpin color="black" radius={"10px"} />
            ) : (
              <button style={signUpStyles.button} onClick={handleSignup}>
                Sign up
              </button>
            )}
            <div style={signUpStyles.logInDiv}>
              <p>Already have account?</p>{" "}
              <p style={signUpStyles.logButton} onClick={login}>
                Log in
              </p>
            </div>
          </div>
        </div>
      </div>
      <div style={signUpStyles.win2}></div>
    </div>
  );
}
export default Sign;
