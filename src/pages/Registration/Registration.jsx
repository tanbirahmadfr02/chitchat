/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import regImg from "../../assets/registrationsImg.jpg";
import "../Registration/Registration.css";
import Image from "../../Layout/Image";
import Heading from "../../Layout/Heading";
import Paragraph from "../../Layout/Paragraph";
import Input from "../../Layout/Input";
import Alert from "@mui/material/Alert";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { DNA } from "react-loader-spinner";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let [showPass, setShowPass] = useState(false);
  let [loading, setLoading] = useState(false);
  let [regData, setRegData] = useState({
    email: "",
    name: "",
    password: "",
  });
  let [regError, setRegError] = useState({
    email: "",
    name: "",
    password: "",
  });

  let handleChange = (e) => {
    setRegData({ ...regData, [e.target.name]: e.target.value });
    setRegError({ ...regError, [e.target.name]: "" });
  };

  let handleSubmit = () => {
    const reGexEmail =
      /[a-zA-Z0-9]{0,}([.]?[a-zA-Z0-9]{1,})[@](gmail.com|hotmail.com|yahoo.com)/;

    const reGexPass =
      /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

    if (!regData.email) {
      setRegError({ ...setRegError, email: "Email is required" });
    } else if (!regData.name) {
      setRegError({ ...setRegError, name: "Name is required" });
    } else if (!reGexEmail.test(regData.email)) {
      setRegError({ ...setRegError, email: "Type a valid Email" });
    } else if (!regData.password) {
      setRegError({ ...setRegError, password: "Password is required" });
    } else {
      setLoading(true);
      createUserWithEmailAndPassword(auth, regData.email, regData.password)
        .then((userCredential) => {
          setLoading(false);
          sendEmailVerification(auth.currentUser).then(() => {
            toast.success("Registration successful, please check your email to verify your account", {
              position: "top-center",
              autoClose: 3000,
              theme: "dark",
            });
            navigate("/login");
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (error.message.includes("email-already-in-use")) {
            setRegError({ ...regError, email: "Email is already exist!" });
          }
          setLoading(false);
        });
    }
  };

  return (
    <>
      <section>
        <Grid container spacing={4}>
          <Grid xs={6}>
            <div className="regBox">
              <div>
                <Heading
                  className="heading"
                  tag={true}
                  as="h1"
                  text="Get started with easily register"
                />
              </div>
              <Paragraph
                className={"paragraph"}
                text={"Free register and you can enjoy it"}
              />
              <div className="from-box">
                <div className="input-box">
                  <p className="label">Email Adress</p>
                  <Input
                    className={"input"}
                    type={"Email"}
                    name={"email"}
                    onChange={handleChange}
                  />
                  {regError.email && (
                    <Alert severity="error" className="alert">
                      {regError.email}
                    </Alert>
                  )}
                </div>
                <div className="input-box">
                  <p className="label">Full Name</p>
                  <Input
                    className={"input"}
                    type={"text"}
                    name={"name"}
                    onChange={handleChange}
                  />
                  {regError.name && (
                    <Alert severity="error" className="alert">
                      {regError.name}
                    </Alert>
                  )}
                </div>
                <div className="input-box">
                  <p className="label">Password</p>
                  <div className="passBox">
                    <Input
                      className={"input"}
                      type={showPass ? "text" : "password"}
                      name={"password"}
                      onChange={handleChange}
                    />
                    {showPass ? (
                      <div
                        className="showPass"
                        onClick={() => setShowPass(!showPass)}
                      >
                        <IoMdEyeOff />
                      </div>
                    ) : (
                      <div
                        className="showPass"
                        onClick={() => setShowPass(!showPass)}
                      >
                        <IoMdEye />
                      </div>
                    )}
                  </div>
                  {regError.password && (
                    <Alert severity="error" className="alert">
                      {regError.password}
                    </Alert>
                  )}
                </div>
                {loading ? (
                  <div style={{ textAlign: "center", width: "368px" }}>
                    <DNA
                      visible={true}
                      height="60"
                      width="60"
                      ariaLabel="dna-loading"
                      wrapperStyle={{}}
                      wrapperClass="dna-wrapper"
                    />
                  </div>
                ) : (
                  <button onClick={handleSubmit}>Sign up</button>
                )}
              </div>
              <p className="signIn">
                Already have an account ?{" "}
                <Link className="link">
                  <span>Sign Up</span>
                </Link>
              </p>
            </div>
          </Grid>
          <Grid xs={6}>
            <div>
              <Image className={"regImg"} src={regImg} />
            </div>
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export default Registration;
