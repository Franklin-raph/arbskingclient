import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

const PasswordResetPage = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(id, token);
  }, []);

  async function resetPassword() {
    if (!password || !password2) {
      setErrorMsg("Please fill in the fields");
      setTimeout(() => {
        setErrorMsg("");
      }, 5000);
      return;
    }
    if (password !== password2) {
      setErrorMsg("Please both password fields must match");
      setTimeout(() => {
        setErrorMsg("");
      }, 5000);
      return;
    }
    setLoading(true);
    const response = await fetch(
      "https://sportbetpredict.onrender.com/api/forgotpassword/reset-password",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id: id, token: token, password: password }),
      }
    );
    const data = await response.json();
    console.log(data);
    if (response) {
      setLoading(false);
      console.log(response);
    }
    if (response.ok) {
      setSuccessMsg(
        "Password has been reset successfully use the button below to continue to the login page"
      );
    }

    if (!response.ok) {
      setErrorMsg(
        "This link appears to be expired, invalid or already used please resend your password reset request to get a new link or contact our customer care service"
      );
      setTimeout(() => {
        setErrorMsg("");
      }, 10000);
    }
  }
  return (
    <>
      <DefaultNavbar />
      <div className="passwordResetDiv">
        {successMsg && (
          <div className="passwordResetSuccess">
            <i className="fa-solid fa-check"></i>
            <p>{successMsg}</p>
            <a href="/authentication/sign-in">Continue to Login</a>
          </div>
        )}
        {errorMsg && (
          <div className="errorBg">
            <p className="emailError">{errorMsg}</p>
          </div>
        )}
        <p>Reset Password</p>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="password"
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="Confirm Password"
        />
        {!loading ? (
          <button className="resetPasswordBtn" onClick={(e) => resetPassword()}>
            Reset Password
          </button>
        ) : (
          <button className="resetPasswordBtn">
            <i className="fa-solid fa-spinner"></i> Reset Password
          </button>
        )}
      </div>
    </>
  );
};

export default PasswordResetPage;
