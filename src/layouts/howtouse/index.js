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
import howtouseimage1 from "../../images/howtouseimage1.jpg"
import howtouseimage2 from "../../images/howtouseimage2.jpg"
import howtouseimage3 from "../../images/howtouseimage3.jpg"
import { Link } from "react-router-dom";

function Dashboard({ brand, routes }) {
  const [arbs, setArbs] = useState();
  const [arbsInvalid, setArbsInvalid] = useState("");
  const [arbsTotal, setArbsTotal] = useState("");
  const [arbsAvg, setArbsAvg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [marketInfo, setMarketInfo] = useState(false);
  const [bookmarkers, setBookmarkers] = useState();
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const { size } = typography;
  const { chart, items } = reportsBarChartData;

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/dashboard/authentication/sign-in");
    }
  }, []);

  return (
    <DashboardLayout>
      <Sidenav brand={brand} brandName="Arbsking" routes={routes} />
      <DashboardNavbar />
      <div className="dasboardContainer how-to-use-arbsking">
        <h5 className="text-center mb-5">How to use Arbsking</h5>
        <p>Welcome to <b>ArbsKing</b>.</p> 
        <p>After you have completed your registration process, you will need to deposit then purchase a subscription of your choice in other to start earning.</p>
       <h5>Depositing</h5>
       <p>Our payment method is pretty simple to use, follow these few steps to deposit into your account;</p>
       <li>Go to the make payments nav.</li>
       <li>Copy your payment address or scan the barcode that’s provided for you.</li>
       <li>Open any crypto payment app of your choice and deposit any amount of your choice using USD or BUSD</li>
       <li>After payment has been made, go to your dashboard and refresh your balance. You should see your updated balance.</li>
      
       <h5>Purchasing Subscription</h5>
       <p>We offer three different subscription plans;</p>
       <li>$12 - 1 month</li>
       <li>$65 - 6 months</li>
       <li>$130 - 1 year</li>
       <p>After you deposited into your account, you can now purchase any subscription of your choice.</p>
      
      <h5>Arbitrage Opportunities</h5>
      <p>Now to start earning, after purchasing a subscription of your choice, you will see arbitrage opportunities on your dashboard.  Let’s take it step by step on how to enter one of the opportunities and earn from it.</p>
      <img src={howtouseimage1} style={{ boxShadow:"0 0 20px #ddd" }}/>
      <p>This part shows the date and time the match will happen, the arbitrage opportunities shown usually last for a day.</p>
      <img src={howtouseimage1} style={{ boxShadow:"0 0 20px #ddd" }}/>
      <p>These are the team playing against each other. In this example, Tottenham will play Manchester City by 3:36pm on the 21st.</p>
      <img src={howtouseimage1} style={{ boxShadow:"0 0 20px #ddd" }}/>
      <p>This part is the percentage profit you’ll earn when you enter this opportunity correctly. To calculate the net profit and stakes you can click on the calculate at the top right or use the sidebar “Arbitrage Calculator”.</p>
      <img src={howtouseimage1} style={{ boxShadow:"0 0 20px #ddd" }}/>
      <p>The bookmakers are the betting platform where you play the market also shown here. You can click on the bookmakers to go directly to their site. Few steps you’ll need to follow; </p>
      <li>You can click on the bookmaker’s name to go to their platform, in this example; "Betking". If that doesn’t work, you can always visit their site directly.</li>
      <li>Then on their platform, you find the market with the odd show on the opportunity.</li>
      <li>In other to enter the opportunity correctly, you’ll need to use the arbitrage calculator where you input the odds show and the amount you intend to enter on the opportunity. </li>
      <li>The arbitrage calculator will output the amount you’ll need to play on each bet in other to get the percentage opportunity.</li>
      <p>For example, if you intended on entering <b>#1000</b> for the opportunity above,</p>
      <img src={howtouseimage2} style={{ boxShadow:"0 0 20px #ddd" }}/>
      <p>From the output of the calculator, you can see the net profit is <b>10.18%</b> of the <b>#1000</b> you entered.</p>
      <p>From the calculator, you’ll have to play <b>#324.05</b> from the first output for the first bookmaker <b>(Betbonanza)</b> and market <b>(over 1.5 2nd team)</b>, and <b>#675.9</b> from the second output for the second bookmaker <b>(Betking)</b> and market <b>(under 1.5 2nd team)</b>.</p>
      <p>Both of these bets will give you <b>10.18%</b> of your bet that is <b>#1101.7</b>. Keep in mind that in arbitrage one of the outcomes has to lose for one to enter, that is <b>over 1.5</b> and <b>under 1.5</b> can’t happen at the same time.</p>
      <h6>Arbitrage Calculator</h6>
      <img src={howtouseimage3} style={{ boxShadow:"0 0 20px #ddd" }}/>
      <p>The arbitrage calculator is provided for you to use and calculate every arbitrage opportunity in other to know what amount to be played on the different market in the opportunity, also to tell the %profit and net profit to be made from that opportunity.</p>
      <p>From the example above, the first odd from an opportunity is <b>2.5</b>, the second is <b>4.0</b>. Assuming you intend to enter <b>#1000</b> for that opportunity, the net profit would be <b>#538</b> because that’s a <b>53.8%</b> opportunity.</p>
      <p>The <b>#615</b> is the amount you’re to play on the first market with the <b>2.5 odds</b>, while the <b>#385</b> is for the second market with the <b>4.0 odds</b>.</p>
      <p>It is important note that, you should approximate values before betting. Like <b>#615.384615384</b> to <b>#615</b> or <b>#616</b>.</p>
      </div>
      <div className="fotter">
        <Footer />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
