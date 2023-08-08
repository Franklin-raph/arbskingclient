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
import { Link, useNavigate } from "react-router-dom";

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
  const [inputType, setInputType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);

  const { user } = useAuth();
  console.log(user);

  useEffect(() => {
    // localStorage.clear();
  }, []);

  const handleSetAgremment = () => setAgremment(!agreement);

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(Object.keys(formData), formData);
    if (Object.keys(formData).length !== 6 && formData.constructor === Object) {
      console.log("Empty object");
      setError("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    const response = await fetch("https://sportbetpredict.onrender.com/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
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
  };

  const handleRedirect = () => navigate("/dashboard");

  const toggleInput = () => {
    setInputType(inputType === "password" ? "text" : "password");
    setShowPassword(!showPassword);
  };
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
                    type="number"
                    name="Phone Number"
                    onChange={handleFormData}
                    placeholder="Phone Number"
                    required
                  />
                </SoftBox>
                <div className="password-and-eye">
                  <SoftBox mb={2}>
                    <SoftInput
                      type={inputType}
                      name="password"
                      onChange={handleFormData}
                      placeholder="Password"
                      required
                    />
                  </SoftBox>
                  {!showPassword ? (
                    <i className="fa-regular fa-eye" onClick={toggleInput}></i>
                  ) : (
                    <i className="fa-regular fa-eye-slash" onClick={toggleInput}></i>
                  )}
                </div>
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
                      ml={1}
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
