import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

const TroubleLoggingInPage = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(id, token);
  }, []);

  async function resetPassword() {
    if (!email || !password) {
      setErrorMsg("Please fill in the fields");
      setTimeout(() => {
        setErrorMsg("");
      }, 5000);
      return;
    }
    setLoading(true);
    const response = await fetch(
      "https://sportbetpredict.onrender.com/api/account/user/logged-out",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
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
        data.message
      );
    }

    if (!response.ok) {
      setErrorMsg(
        data.message
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
            <a href="/dashboard/authentication/sign-in">Continue to Login</a>
          </div>
        )}
        {errorMsg && (
          <div className="errorBg">
            <p className="emailError">{errorMsg}</p>
          </div>
        )}
        <p>Trouble Logging In?</p>
       <div>
        <label>Email</label>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="arbsking@gmail.com"
        />
       </div>
        <div>
          <label>Password</label>
          <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        </div>
        {!loading ? (
          <button className="resetPasswordBtn" onClick={(e) => resetPassword()}>
            Submit
          </button>
        ) : (
          <button className="resetPasswordBtn">
            <i className="fa-solid fa-spinner"></i> Submit
          </button>
        )}
      </div>
    </>
  );
};

export default TroubleLoggingInPage;
