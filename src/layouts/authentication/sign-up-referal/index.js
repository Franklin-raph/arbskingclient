/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// react-router-dom components
import { Link, useNavigate, useParams } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import GithubSocial from "layouts/authentication/components/Socials/github";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import { RotatingLines } from "react-loader-spinner";

import AuthApi from "../../../api/auth";

import { useAuth } from "auth-context/auth.context";

function SignUp() {
  const navigate = useNavigate();

  const [agreement, setAgremment] = useState(true);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  const { user } = useAuth();

  useEffect(() => {
    // localStorage.clear();
    getReferalInfo();
  }, []);

  const getReferalInfo = async () => {
    const response = await fetch(
      `https://sportbetpredict.onrender.com/api/register-referred/${params.id}`
    );
    const data = await response.json();
  };

  const handleSetAgremment = () => setAgremment(!agreement);

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log({ ...formData, referral_id: params.id });
    e.preventDefault();
    if (Object.keys(formData).length !== 5 && formData.constructor === Object) {
      setError("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    const response = await fetch("https://sportbetpredict.onrender.com/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, referral_id: params.id }),
    });
    if (response) {
      setIsLoading(false);
      localStorage.clear();
    }
    const data = await response.json();
    if (response.ok) {
      setSuccess(data.message);
      console.log(data);
      // localStorage.setItem("user", JSON.stringify(data));
      // navigate("/dashboard");
    } else {
      console.log(data);
      setError(data.message);
    }
    // AuthApi.Register(formData)
    //   .then((response) => {
    //     if (response.data.success) {
    //       return navigate("/authentication/sign-in");
    //     } else {
    //       setError(response.data.msg);
    //     }
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       return setError(error.response.data.msg);
    //     }
    //     return setError("There has been an error.");
    //   });
  };

  const handleRedirect = () => navigate("/dashboard");
  // Registration Successful. A Confirmation Email as been sent to frank123@gmial.com
  // franknew22222
  return (
    <>
      {success && (
        <div className="registrationSuccessMessageBg">
          <p className="registrationSuccessMessage">
            <i className="fa-solid fa-check"></i>
            {success}
            <button
              style={{ marginTop: "10px" }}
              onClick={() => {
                setSuccess(false);
                navigate("/dashboard/authentication/sign-in");
              }}
            >
              Ok
            </button>
          </p>
        </div>
      )}

      <BasicLayout title="Welcome!" image={curved6}>
        {isLoading ? (
          <SoftBox display="flex" justifyContent="center">
            <RotatingLines
              strokeColor="black"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          </SoftBox>
        ) : user && user.token ? (
          <Card>
            <h3 style={{ textAlign: "center" }}>You are already signed in.</h3>
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" buttonColor="info" fullWidth onClick={handleRedirect}>
                {`Let's go`}
              </SoftButton>
            </SoftBox>
          </Card>
        ) : (
          <Card>
            <SoftBox p={3} mb={1} textAlign="center">
              <SoftTypography variant="h5" fontWeight="medium">
                Register with
              </SoftTypography>
            </SoftBox>
            <Separator />
            <SoftBox pt={2} pb={3} px={3}>
              <SoftBox component="form" role="form">
                <SoftBox mb={2}>
                  <SoftInput
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    onChange={handleFormData}
                    required
                  />
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftInput
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    onChange={handleFormData}
                    required
                  />
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftInput
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleFormData}
                    required
                  />
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftInput
                    type="email"
                    name="email"
                    onChange={handleFormData}
                    placeholder="Email"
                    required
                  />
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftInput
                    type="password"
                    name="password"
                    onChange={handleFormData}
                    placeholder="Password"
                    required
                  />
                </SoftBox>
                <p style={{ fontSize: "13px", margin: "2px 0" }}>Referal Code</p>
                <SoftBox mb={2}>
                  <SoftInput disabled type="text" name="email" value={params.id} required />
                </SoftBox>
                <SoftBox display="flex" alignItems="center">
                  <Checkbox checked={agreement} onChange={handleSetAgremment} />
                  <SoftTypography
                    variant="button"
                    fontWeight="regular"
                    onClick={handleSetAgremment}
                    sx={{ cursor: "poiner", userSelect: "none" }}
                  >
                    &nbsp;&nbsp;I agree the&nbsp;
                  </SoftTypography>
                  <SoftTypography
                    component="a"
                    href="#"
                    variant="button"
                    fontWeight="bold"
                    textGradient
                  >
                    Terms and Conditions
                  </SoftTypography>
                </SoftBox>
                <SoftBox mt={2} mb={2} textAlign="center">
                  <h6
                    style={{
                      fontSize: ".8em",
                      color: "red",
                      textAlign: "center",
                      fontWeight: 400,
                      transition: ".2s all",
                    }}
                  >
                    {error}
                  </h6>
                </SoftBox>
                <SoftBox mt={4} mb={1}>
                  <SoftButton variant="gradient" color="dark" onClick={handleSubmit} fullWidth>
                    sign up
                  </SoftButton>
                </SoftBox>
                <SoftBox mt={3} textAlign="center">
                  <SoftTypography variant="button" color="text" fontWeight="regular">
                    Already have an account?&nbsp;
                    <SoftTypography
                      component={Link}
                      to="/dashboard/authentication/sign-in"
                      variant="button"
                      color="dark"
                      fontWeight="bold"
                      textGradient
                    >
                      Sign in
                    </SoftTypography>
                  </SoftTypography>
                </SoftBox>
              </SoftBox>
            </SoftBox>
          </Card>
        )}
      </BasicLayout>
    </>
  );
}

export default SignUp;
