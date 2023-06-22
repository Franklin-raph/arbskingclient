import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import LoadingGif from "../../../assets/images/loader/loading-gif.gif";

const EmailConfirmPage = () => {
  const params = useParams();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    confirmEmail();
  }, []);

  async function confirmEmail() {
    setIsLoading(true);
    const response = await fetch(
      `https://sportbetpredict.onrender.com/api/email-confirmation/${params.id}/${params.token}`
      );
      const data = await response.json();
      if(response){
        setIsLoading(false);
      }
      if (response.ok) {
      setSuccessMessage(data.message);
    }
    if (!response.ok) {
      console.log(data);
      setErrorMessage(data.message);
    }
  }
  return (
    <>
      <DefaultNavbar />
      <div className="emailConfirmationDiv">
        <div className="loadingGif">{isLoading && <img src={LoadingGif} width={"50%"} style={{ marginTop:"0" }}/>}</div>
        {successMessage && (
          <>
            <i className="fa-solid fa-check"></i>
            <h5>Verified</h5>
            <p>{successMessage}</p>
            <a href="/dashboard/authentication/sign-in">Continue to Login</a>
          </>
        )}
        {errorMessage && (
          <>
            <i className="fa-solid fa-xmark"></i>
            <h5>Already Verified</h5>
            <p>{errorMessage}</p>
            <a href="/dashboard/authentication/sign-in">Continue to Login</a>
          </>
        )}
      </div>
    </>
  );
};

export default EmailConfirmPage;
