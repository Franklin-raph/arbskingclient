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
import { useEffect, useState, useRef } from "react";

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

// RTL layout components
import BuildByDevelopers from "layouts/rtl/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/rtl/components/WorkWithTheRockets";
import Projects from "layouts/rtl/components/Projects";
import OrderOverview from "layouts/rtl/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/rtl/data/reportsBarChartData";
import gradientLineChartData from "layouts/rtl/data/gradientLineChartData";

// Soft UI Dashboard React contexts
import { useSoftUIController, setDirection } from "context";
import Sidenav from "examples/Sidenav";
import { number } from "prop-types";
import { useLocation } from "react-router-dom";

function RTL({ brand, routes }) {
  const [, dispatch] = useSoftUIController();
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const [stake, setStake] = useState(0);
  const [totals, setTotals] = useState({ payout: 0, profit: 0, roi: 0 });
  const [dashboardOdds, setDashboardOdds] = useState();
  const [checkIfCalculateIsClicked, setCheckIfCalculateIsClicked] = useState(false);

  const location = useLocation();
  console.log(location.state);
  
  const [odds, setOdds] = useState([]);
  const [bms, setBms] = useState([]);
  
  useEffect(() => {
    if (location.state === null) {
      setOdds([
        { odd: 0, stake: 0, payout: 0 },
        { odd: 0, stake: 0, payout: 0 },
      ]);
    } else {
      // console.log(location.state.bms.split(", "));
      const oddsArray = location.state.value.split(",").map((str) => parseFloat(str.trim()));
      const bmArray = location.state.bms.split(", ")
      console.log(oddsArray)
      console.log(bmArray)

      if (oddsArray.length === 2) {
        console.log(oddsArray.length);
        const obj = {
          odd1: oddsArray[0],
          odd2: oddsArray[1],
        };
        setOdds([
          { odd: obj.odd1, stake: 0, payout: 0 },
          { odd: obj.odd2, stake: 0, payout: 0 },
        ]);

        const bmObj = {
          bm1: bmArray[0],
          bm2: bmArray[1]
        };
        setBms([
          {bm:bmObj.bm1},
          {bm:bmObj.bm2}
        ])
        return;

      } else if (oddsArray.length === 3) {
        console.log(oddsArray.length);
        const obj = {
          odd1: oddsArray[0],
          odd2: oddsArray[1],
          odd3: oddsArray[2],
        };
        setOdds([
          { odd: obj.odd1, stake: 0, payout: 0 },
          { odd: obj.odd2, stake: 0, payout: 0 },
          { odd: obj.odd3, stake: 0, payout: 0 },
        ]);
        return;
      }
    }
  }, []);

  const handleAddBetDiv = () => {
    if (odds.length === 4) return;
    setOdds([...odds, { odd: 0, stake: 0, payout: 0 }]);
  };

  function calculateTotalArbitrage() {
    setCheckIfCalculateIsClicked(true);
    const totalOdds = odds.map((val) => 1 / val.odd).reduce((x, y) => x + y, 0);
    const newOdds = odds.map((val) => {
      const newVal = val;
      newVal.stake = stake ? stake * Math.abs(1 / newVal.odd / totalOdds) : 0;
      newVal.payout = newVal.odd * newVal.stake;
      return newVal;
    });

    const totalPayout = odds.map((val) => val.payout).reduce((x, y) => x + y, 0);
    const profit = (totalPayout - odds.length * stake) / odds.length;
    const roi = (profit / stake) * 100;
    const payout = totalPayout / odds.length;

    setOdds(newOdds);
    setTotals({ profit, roi, payout });
  }

  function updateOdd(value, index) {
    const newOdds = odds;
    newOdds[index].odd = value;
    setOdds(newOdds);
  }

  function resetInputValues() {
    odds.map((odd, index) => {
      document.querySelector("#odd-input-" + index).value = "";
    });
    document.querySelector("#stake-input").value = "";
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Sidenav brand={brand} brandName="Arbsking" routes={routes} />
      <div className="abitragePart">
        <h2>ARBITRAGE CALCULATOR | SUREBET CALCULATOR</h2>
        <p>
          Use this calculator to determine stakes and profits for 2-3 way arbitrage opportunities!
          Auto-round surebet stakes to avoid suspicion with the bookmakers! Instructions written
          below the calculator.
        </p>
      </div>
      <div className="arbitrageCalculator">
        <h5 style={{ textAlign: "center", marginBottom: "2rem" }}>
          Use the Arbitrage Calculator here
        </h5>
        <div className="upperArbitrageCalculator">
          <div className="topHeader"></div>
          {odds.map((odd, index) => (
            <div key={index}>
              <div className="singleBet">
                <div className="betInput">
                  <div>
                    <p>Bet {index + 1}</p>
                    {/* {bms.map(bm =>(<p>{bm}</p>))} */}
                    {/* {console.log(odd.bm)} */}
                    <input
                      type="number"
                      id={"odd-input-" + index}
                      placeholder={`Please Enter Bet ${index + 1} Odds`}
                      onChange={(e) => {
                        const value = Number(isNaN(e.target.value) ? 0 : e.target.value);
                        updateOdd(value, index);
                      }}
                      defaultValue={odd.odd ? odd.odd : ""}
                    />
                  </div>
                </div>
                <p className={checkIfCalculateIsClicked ? `calculatedValue` : `unCalculatedValue`}>
                  {odd.stake ? odd.stake : ""}
                </p>
                <p className={checkIfCalculateIsClicked ? `calculatedValue` : `unCalculatedValue`}>
                  {odd.payout ? odd.payout : ""}
                </p>
              </div>
            </div>
          ))}

          <div className="singleBet">
            <div className="betInput">
              <div>
                <p>Stake</p>
                <input
                  type="text"
                  placeholder="Please Enter Stake"
                  id="stake-input"
                  onChange={(e) => {
                    const value = Number(!isNaN(e.target.value) ? e.target.value : 0);
                    setStake(value);
                  }}
                />
              </div>
            </div>
            <p className="calculatedValue stakeP" style={{ backgroundColor: "#fff" }}></p>
            <p className="calculatedValue stakeP" style={{ backgroundColor: "#fff" }}></p>
          </div>
        </div>
        <div className="lowerArbitrageCalculator">
          <div className="controls">
            <button onClick={handleAddBetDiv}>
              <i className="fa-solid fa-circle-plus"></i>MORE BETS
            </button>
            <button
              onClick={(e) => {
                setOdds([
                  { odd: 0, stake: 0, payout: 0 },
                  { odd: 0, stake: 0, payout: 0 },
                ]);
                setStake(0);
                setTotals({ payout: 0, profit: 0, roi: 0 });
                resetInputValues();
              }}
            >
              <i className="fa-solid fa-rotate"></i>RESET
            </button>
            <button
              onClick={() => {
                calculateTotalArbitrage();
              }}
            >
              <i className="fa-solid fa-calculator"></i>CALCULATE
            </button>
          </div>
          <div className="finalCalculation">
            <div>
              Total Payout: <span>₦‎{totals.payout.toFixed(2) || "0.00"}</span>
            </div>
            <div>
              Total Profit: <span>₦‎{totals.profit.toFixed(2) || "0.00"}</span>
            </div>
            <div>
              ROI: <span>{totals.roi.toFixed(2) || "0.00"}%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="fotter">
        <Footer />
      </div>
    </DashboardLayout>
  );
}

export default RTL;
