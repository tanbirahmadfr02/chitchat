/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../ForgotPassword/ForgotPassword.css";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { DNA } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

const ForgotPassword = () => {
  const reGexEmail =
    /[a-zA-Z0-9]{0,}([.]?[a-zA-Z0-9]{1,})[@](gmail.com|hotmail.com|yahoo.com)/;
  const auth = getAuth();
  let [value, setValue] = useState("");
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState("");
  let navigate = useNavigate();

let handleChange = (e)=>{
  setValue(e.target.value)
  setError('')
}

  let handleSubmit = () => {
    if (!value) {
      setError("please Enter a Email");
    } else if (!reGexEmail.test(value)) {
      setError("please Enter a valid email");
    } else {
      sendPasswordResetEmail(auth, value)
        .then(() => {
          setLoading(true);
          toast.success("Please check your inbox", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
          });
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error.message);
        });
    }
  };
  return (
    <>
      <div className="forgotMain">
        <div className="forgotBox">
          <div className="img">
            <div className="overlay">
              <h3>Forgot Password</h3>
            </div>
          </div>
          <div className="input-box">
            <p className="label">Email Adress</p>
            <input
              onChange={handleChange}
              className="input"
              type="email"
            />
            {error && (
              <Alert severity="error" className="alert">
                {error}
              </Alert>
            )}
            {loading ? (
              <div className="loader">
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
              <button className="forgotBtn submitBtn" onClick={handleSubmit}>Submit</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
