/**
=========================================================
* Soft UI Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useEffect } from "react";

import AuthApi from "../../../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth-context/auth.context";

function SignOut() {
  const navigate = useNavigate();
  // const { setUser } = useAuth();
  // let { user } = useAuth();

  const handleLogout = async () => {
    alert("Logged out")
    // await AuthApi.Logout(user);
    // await setUser(null);
    console.log("dfgjk")
    localStorage.clear();
    // return navigate("/dashboard/authentication/sign-in");
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return null;
}

export default SignOut;
