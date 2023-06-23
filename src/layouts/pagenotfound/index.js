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
import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";

import Sidenav from "examples/Sidenav";

import Index from "layouts/dashboard/components/Matchcard/Index";
import { useNavigate } from "react-router-dom";
import mancityLogo from "../../images/manu.png";
import LoadingGif from "../../assets/images/loader/loading-gif.gif";
import howtouseimage1 from "../../images/howtouseimage1.jpg";
import howtouseimage2 from "../../images/howtouseimage2.jpg";
import howtouseimage3 from "../../images/howtouseimage3.jpg";
import ArbskingLogo from "../../images/Arbsking_Dashboard_Logo.png";

function Dashboard({ brand, routes }) {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/dashboard/authentication/sign-in");
    }
  }, []);

  return (
    <DashboardLayout>
      {/* <Sidenav brand={brand} brandName="Arbsking" routes={routes} /> */}
      {/* <DashboardNavbar /> */}
      <div className="dasboardContainer error-page">
        <img src={ArbskingLogo} width="25%" style={{ marginBottom:"1rem" }}/>
        <h3>404 | Page Not Found</h3>
        <p>Looking for <a href="https://arbsking.com">arbsking.com</a>?</p>
      </div>
      {/* <div className="fotter">
        <Footer />
      </div> */}
    </DashboardLayout>
  );
}

export default Dashboard;
