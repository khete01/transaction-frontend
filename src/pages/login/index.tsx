import { GeldIcon } from "@/icons/geld";
import signUpStyles from "./styles";
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
    <div style={signUpStyles.container}>
      <div style={signUpStyles.win1}>
        <div style={{ ...signUpStyles.box, flexDirection: "column" }}>
          <div style={signUpStyles.titleBox}>
            <GeldIcon />
          </div>
          <div style={{ ...signUpStyles.titlediv, flexDirection: "column" }}>
            <h2>Welcome Back</h2>
            <p>Welcome back, Please enter your details</p>
          </div>
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

          <div style={signUpStyles.required}>
            <p style={signUpStyles.required}>{required}</p>
          </div>
          {loading ? (
            <TailSpin color="black" radius={"10px"} />
          ) : (
            <button style={signUpStyles.button} onClick={handleLogin}>
              Login
            </button>
          )}
          <div style={signUpStyles.logInDiv}>
            <p>Don`t have account?</p>{" "}
            <p style={signUpStyles.logButton} onClick={sign}>
              Sign
            </p>
          </div>
        </div>
      </div>
      <div style={signUpStyles.win2}></div>
    </div>
  );
}

export default Login;
