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
import { RotatingLines } from "react-loader-spinner";
// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import GithubSocial from "layouts/authentication/components/Socials/github";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

import AuthApi from "../../../api/auth";
import { useAuth } from "../../../auth-context/auth.context";
import { API_SERVER } from "config/constant";

function SignIn() {
  const navigate = useNavigate();

  const [rememberMe, setRememberMe] = useState(true);
  const [formData, setFormData] = useState({
    // username: "Test172",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitFormData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // try {

    // } catch (error) {

    // }
    const response = await fetch("https://sportbetpredict.onrender.com/api/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if (response) {
      setIsLoading(false);
    }
    const data = await response.json();
    console.log("Message", data);
    // if (!response.ok) {
    // }
    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/dashboard");
    } else {
      setError(data.error || data.message);
    }
  };

  const toggleInput = () => {
    setInputType(inputType === "password" ? "text" : "password");
    setShowPassword(!showPassword);
  };

  // const handleRedirect = () => {
  //   return navigate("/dashboard");
  // };

  return (
    <CoverLayout
      title="Welcome back"
      description="Please enter your username and password to sign in"
      image={curved9}
    >
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
      ) : (
        <>
          <Separator />
          <SoftBox component="form" role="form" position="relative">
            <SoftBox mb={2}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Username
                </SoftTypography>
              </SoftBox>
              <SoftInput
                type="text"
                name="username"
                value={formData?.username}
                onChange={handleFormData}
                placeholder="Username"
              />
            </SoftBox>
            <SoftBox mb={1}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Password
                </SoftTypography>
              </SoftBox>

              <div className="password-and-eye-for-login">
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
            </SoftBox>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <div></div>
              <Link to="/dashboard/forgotpassword" style={{ fontSize: "14px", color: "#344767" }}>
                Forgot Password?
              </Link>
            </div>
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
              <SoftButton variant="gradient" color="info" onClick={submitFormData} fullWidth>
                sign in
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Don&apos;t have an account?
                <a href="/dashboard/authentication/sign-up" style={{ marginLeft: "7px" }}>
                  Sign up
                </a>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </>
      )}
    </CoverLayout>
  );
}

export default SignIn;
