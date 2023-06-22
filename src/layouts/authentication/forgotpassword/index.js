import React, { useState } from "react";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function forgotPassword() {
    setLoading(true);
    const response = await fetch(
      "https://sportbetpredict.onrender.com/api/forgotpassword/email-auth",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      }
    );
    if (response) {
      setLoading(false);
    }
    const data = await response.json();
    if (response.ok) {
      setSuccessMsg(
        `A one time password reset link has been sent to ${email}, 
        please use the link to reset your password. If you didn't get the link, please resend your request`
      );
      setTimeout(() => {
        setSuccessMsg("");
      }, 10000);
    }

    if (!response.ok) {
      setErrorMsg(data.message);
      setTimeout(() => {
        setErrorMsg("");
      }, 7000);
    }
    console.log(data);
  }

  return (
    <>
      <DefaultNavbar />
      <div className="passwordResetDiv">
        <div className="emailSuccessDiv">
          {successMsg && <p className="emailSuccess">{successMsg}</p>}
        </div>
        {errorMsg && <p className="emailError">{errorMsg}</p>}
        <p>User Reset Password Request</p>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@email.com"
          value={email}
        />
        {!loading ? (
          <button className="resetPasswordBtn" onClick={(e) => forgotPassword()}>
            Reset Password Link
          </button>
        ) : (
          <button className="resetPasswordBtn">
            <i className="fa-solid fa-spinner"></i> Reset Password Link
          </button>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
