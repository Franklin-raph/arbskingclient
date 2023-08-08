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
import { Link } from "react-router-dom";

function Dashboard({ brand, routes }) {
  const [arbs, setArbs] = useState();
  const [arbsInvalid, setArbsInvalid] = useState("");
  const [arbsTotal, setArbsTotal] = useState("");
  const [arbsAvg, setArbsAvg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [marketInfo, setMarketInfo] = useState(false);
  const [noSubModal, setNoSubModal] = useState(false);
  const [bookmarkers, setBookmarkers] = useState();
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isPhoneNumberSaved, setIsPhoneNumberSaved] = useState(false)
  const [phoneNumberLoading, setPhoneNumberLoading] = useState(false)
  const [phoneNumberMsg, setPhoneNumberMsg] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const { size } = typography;
  const { chart, items } = reportsBarChartData;

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/dashboard/authentication/sign-in");
    }
    getOpportunities();
  }, []);

  async function getOpportunities() {
    setIsLoading(true);
    setSelectedCompany("all");
    const response = await fetch("https://sportbetpredict.onrender.com/api/account/arbs", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    });
    const data = await response.json();
    if (response) {
      setIsLoading(false);
      setIsPhoneNumberSaved(data.isPhoneNumberSaved)
    }
    if (response.status === 401) {
      setArbsInvalid([{
        age : "8h",
        bookmakers : "Pari​match, 18​Bet, 18​Bet",
        bookmakersLink : "https://en.surebet.com/nav/bookie/parimatch, https://en.surebet.com/nav/bookie/18bet, https://en.surebet.com/nav/bookie/18bet",
        league : "Macao - Division 1",
        marketExplaination : "Total over 6 - goals, Total under 6.5 - goals, Total under 5.5 - goals",
        markets : "Over 6, Under 6.5, Under 5.5",
        matchTime : "16/07, 10:00",
        odds : "2.12, 3.00, 5.00",
        profit : 34.7,
        teams : "CPK FC – Sporting Macau",
        _id : "64b2952fc117be4b9d02c0e4",
      }]);
      setArbs(null);
    }

    if (response.ok) {
      
      console.log(data);
      setArbs(data);
      data.arbs.map((bookmaker) => {
        setBookmarkers(bookmaker.bookmakers.split(","));
      });
      // Field to retrieve and sum
      const field = "profit";

      // Calculate the sum
      const sum = data.arbs.reduce(
        (accumulator, currentValue) => accumulator + currentValue[field],
        0
      );
      setArbsTotal(sum);

      setArbsAvg(sum / data.arbs.length);
    }
  }

  async function getNigerianOpportunities() {
    setIsLoading(true);
    const response = await fetch("https://sportbetpredict.onrender.com/api/account/arbs/nigerian", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    });
    if (response) {
      setIsLoading(false);
    }
    if (response.status === 401) {
      setArbsInvalid("");
      setArbs(null);
    }

    if (response.status === 404) {
      setArbsInvalid("No available Nigerian to Nigerian bookmakers opportunities at the moment.");
      setArbs(null);
    }

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setArbs(data);
      data.arbs.map((bookmaker) => {
        setBookmarkers(bookmaker.bookmakers.split(","));
      });
      // Field to retrieve and sum
      const field = "profit";

      // Calculate the sum
      const sum = data.arbs.reduce(
        (accumulator, currentValue) => accumulator + currentValue[field],
        0
      );
      setArbsTotal(sum);

      setArbsAvg(sum / data.arbs.length);
    }
  }

  async function getNigerianForeignOpportunities() {
    setIsLoading(true);
    const response = await fetch(
      "https://sportbetpredict.onrender.com/api/account/arbs/nigerian-foreign",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedInUser.token}`,
        },
      }
    );
    if (response) {
      setIsLoading(false);
    }
    if (response.status === 401) {
      setArbsInvalid("");
      setArbs(null);
    }

    if (response.status === 404) {
      setArbsInvalid("No available Nigerian to Foreign bookmakers opportunities at the moment.");
      setArbs(null);
    }

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setArbs(data);
      data.arbs.map((bookmaker) => {
        setBookmarkers(bookmaker.bookmakers.split(","));
      });
      // Field to retrieve and sum
      const field = "profit";

      // Calculate the sum
      const sum = data.arbs.reduce(
        (accumulator, currentValue) => accumulator + currentValue[field],
        0
      );
      setArbsTotal(sum);

      setArbsAvg(sum / data.arbs.length);
    }
  }

  async function getMyFavouriteBookMakersOpportunities() {
    setIsLoading(true);
    const response = await fetch(
      "https://sportbetpredict.onrender.com/api/account/arbs/favourite-bookmakers",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedInUser.token}`,
        },
      }
    );
    if (response) {
      console.log(response);
      setIsLoading(false);
    }
    if (response.status === 401) {
      setArbsInvalid("");
      setArbs(null);
    }

    if (response.status === 404) {
      setArbsInvalid("No available opportunities for my favourite bookmakers at the moment.");
      setArbs(null);
    }

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setArbs(data);
      data.arbs.map((bookmaker) => {
        setBookmarkers(bookmaker.bookmakers.split(","));
      });
      // Field to retrieve and sum
      const field = "profit";

      // Calculate the sum
      const sum = data.arbs.reduce(
        (accumulator, currentValue) => accumulator + currentValue[field],
        0
      );
      setArbsTotal(sum);

      setArbsAvg(sum / data.arbs.length);
    }
  }

  function reloadsArbsOpportunities() {
    getOpportunities();
    setSelectedCompany("all");
  }

  function filterBetCompany(e) {
    setSelectedCompany(e.target.value);
    console.log(selectedCompany);
    if (e.target.value === "nigerian-nigerian") {
      getNigerianOpportunities();
    } else if (e.target.value === "all") {
      getOpportunities();
    } else if (e.target.value === "nigerian-foreign") {
      console.log("ni-fr");
      getNigerianForeignOpportunities();
    } else if (e.target.value === "favouriteBookMakers") {
      console.log("ni-fr");
      getMyFavouriteBookMakersOpportunities();
    }
  }

  function openArbCalculator() {
    navigate("/dashboard/arbitragecalculator");
  }

  function clickedMarketInfo(itemId) {
    setMarketInfo(!marketInfo);
    setSelectedItemId(itemId === selectedItemId ? null : itemId);
  }

  setTimeout(() => {
    setMarketInfo(false);
  }, 7000);

  function openNoSubMsg(){
    setNoSubModal(!noSubModal)
  }

  async function savePhoneNumber(){
    if(phoneNumber.length <= 0){
      setPhoneNumberMsg("Please fill in the field")
      setTimeout(() => {
        setPhoneNumberMsg("")
      },5000)
      return
    }else{
      setPhoneNumberLoading(true)
      const response = await fetch("https://sportbetpredict.onrender.com/api/account/add/phone-number", {
        method:"POST",
        body:JSON.stringify({phoneNumber:phoneNumber}),
        headers : {
          "Content-Type":"application/json",
          Authorization: `Bearer ${loggedInUser.token}`
        }
      })
      const data = await response.json()
      if(response) setPhoneNumberLoading(!phoneNumberLoading)
      if(response.ok){
        setPhoneNumberMsg(data.message)
        
      }
  
      if(!response.ok){
        setPhoneNumber(data.message)
      }
    }
    
  }

  return (
    <DashboardLayout>
      <Sidenav brand={brand} brandName="Arbsking" routes={routes} />
      <DashboardNavbar />
      <div className="dasboardContainer">
        <SoftBox py={3}>
          <SoftBox mb={3} className="desktop-dashboard-view">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} xl={4}>
                <MiniStatisticsCard
                  title={{ text: "Amount Of Opportunities" }}
                  count={arbs && arbs.arbs.length}
                  icon={{ color: "info", component: "paid" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} xl={4}>
                <MiniStatisticsCard
                  title={{ text: "Total Percentage(%)" }}
                  count={arbsTotal && arbsTotal.toFixed(2)}
                  icon={{ color: "info", component: "public" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} xl={4}>
                <MiniStatisticsCard
                  title={{ text: "Average % per Opportunity" }}
                  count={arbsAvg && arbsAvg.toFixed(2)}
                  icon={{ color: "info", component: "emoji_events" }}
                />
              </Grid>
            </Grid>
          </SoftBox>
          <div className="opportunity-and-percent">
            <div>
              <h6>Opp.</h6>
              <p>{arbs && arbs.arbs.length}</p>
            </div>
            <div>
              <h6>Total%</h6>
              <p>{arbsTotal && arbsTotal.toFixed(2)}</p>
            </div>
            <div>
              <h6>Avg%</h6>
              <p>{arbsAvg && arbsAvg.toFixed(2)}</p>
            </div>
          </div>
          <div className="loadingGif">{isLoading && <img src={LoadingGif} />}</div>
          <div className="dashboardFilters">
            <div className="select">
              <select name="languages" id="bet_company" onChange={filterBetCompany}>
                <option value="all">All</option>
                <option value="nigerian-nigerian">Nigerian - Nigerian</option>
                <option value="nigerian-foreign">Nigerian - Foreign</option>
                <option value="favouriteBookMakers">My Favourite BookMakers</option>
              </select>
            </div>
            {!isLoading ? (
              <i
                className="fa-solid fa-arrow-rotate-right"
                style={{ cursor: "pointer" }}
                onClick={() => reloadsArbsOpportunities()}
              ></i>
            ) : (
              <i className="fa-solid fa-spinner fa-spin"></i>
            )}
          </div>

          {noSubModal && 
            <div className="noSubModalBg">
              <div className="noSubModalMsg">
                  <i className="fa-solid fa-xmark" onClick={() => setNoSubModal(!noSubModal)}></i>
                  <p>You do not have an active subscription</p>
                  <button onClick={() => navigate("/dashboard/payments")}>Purchase a sub</button>
              </div>
            </div>
          }

          {arbs === null ?
              <div style={{ textAlign:"center", fontSize:"13px", padding:"10px", color:'#842029', backgroundColor:"#f8d7da", border:"1px solid #f5c2c7", borderRadius:"10px" }}>
                <p style={{ marginBottom:"0" }}>You currently do not have an active subscription.</p>
                <p style={{ marginBottom:"0" }}>The game below can't be played. It's just an examle of how games are displayed on arbsking for active subscribed users</p>
              </div>
           : ""}

          

          {arbs === null ? (
            <p className="noSubMsg">
              {arbsInvalid &&
                arbsInvalid.map((arb, index) => (
                  <div className="matchCard" key={index}>
                    <div className="clubCard">
                      <div className="teamAndLeague">
                        <div className="clubLogoAndBetCompany">
                          <div className="singleClub">
                            <i className="fa-regular fa-futbol fs-5"></i>
                            <p style={{ fontWeight: "bold" }}>
                              {arb.teams.split(" – ").map((team) => team.trim())[0]}
                            </p>
                          </div>
                          <div className="betPatform mx-4">
                            <p>Vs</p>
                          </div>
                          <div className="singleClub">
                            <i className="fa-regular fa-futbol fs-5"></i>
                            <p style={{ fontWeight: "bold" }}>
                              {arb.teams.split(" – ").map((team) => team.trim())[1]}
                            </p>
                          </div>
                        </div>
                        <small className="league">{arb.league}</small>
                      </div>

                      <div className="time-market-calc">
                        <div className="time">
                          <i className="fa-regular fa-clock"></i>
                          <p>{arb.matchTime}.</p>
                        </div>

                        <div>
                          <p className="profit">{arb.profit}%</p>
                        </div>
                        <div>
                          <Link to="#">
                            <i className="fa-solid fa-calculator" onClick={openNoSubMsg}></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="arbs">
                      <div style={{ paddingBottom: "1rem" }}>
                        <p style={{ fontWeight: "bold", fontSize: "17px" }} className="desktop">
                          Book Maker
                        </p>
                        <p style={{ fontWeight: "bold", fontSize: "17px" }} className="mobile">
                          BM
                        </p>
                        {arb &&
                          arb.bookmakers.split(",").map((bookmaker, index) => (
                            <p key={index} style={{ display: "block" }}>
                              {bookmaker}
                            </p>
                          ))}
                      </div>
                      <div>
                        <p
                          style={{
                            fontWeight: "bold",
                            fontSize: "17px",
                            display: "flex",
                            gap: "3px",
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        >
                          Market
                          <i
                            className="fa-solid fa-circle-info"
                            style={{ cursor: "pointer" }}
                            onClick={() => clickedMarketInfo(arb._id)}
                          ></i>
                        </p>
                        {arb &&
                          arb.markets.split(",").map((market, index) => (
                            <p className="text-muted" key={index}>
                              {market}
                            </p>
                          ))}
                      </div>

                      {marketInfo && (
                        <div className="marketInfo">
                          {arb &&
                            arb.marketExplaination
                              .split(",")
                              .map(
                                (market, index) =>
                                  arb._id === selectedItemId && <p key={index}>{market}</p>
                              )}
                        </div>
                      )}

                      <div>
                        <p style={{ fontWeight: "bold", fontSize: "17px" }}>Odds</p>
                        {arb && arb.odds.split(",").map((odd, index) => <p key={index}>{odd}</p>)}
                      </div>
                      <div>
                        <p
                          style={{ fontWeight: "bold", fontSize: "17px" }}
                          className="go-to-mobile"
                        >
                          .
                        </p>
                        <p style={{ fontWeight: "bold", fontSize: "17px" }} className="go-to">
                          Go to
                        </p>
                        {arb &&
                          arb.bookmakersLink.split(",").map((bookmaker, index) => (
                            <p key={index} style={{ display: "block" }}>
                              <a href="#" onClick={openNoSubMsg}>
                                <i className="fa-solid fa-up-right-from-square"></i>
                              </a>
                            </p>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
            </p>
          ) : (
            <>
              {arbs &&
                arbs.arbs.map((arb, index) => (
                  <div className="matchCard" key={index}>
                    <div className="clubCard">
                      <div className="teamAndLeague">
                        <div className="clubLogoAndBetCompany">
                          <div className="singleClub">
                            <i className="fa-regular fa-futbol fs-5"></i>
                            <p style={{ fontWeight: "bold" }}>
                              {arb.teams.split(" – ").map((team) => team.trim())[0]}
                            </p>
                          </div>
                          <div className="betPatform mx-4">
                            <p>Vs</p>
                          </div>
                          <div className="singleClub">
                            <i className="fa-regular fa-futbol fs-5"></i>
                            <p style={{ fontWeight: "bold" }}>
                              {arb.teams.split(" – ").map((team) => team.trim())[1]}
                            </p>
                          </div>
                        </div>
                        <small className="league">{arb.league}</small>
                      </div>

                      <div className="time-market-calc">
                        <div className="time">
                          <i className="fa-regular fa-clock"></i>
                          <p>{arb.matchTime}</p>
                        </div>

                        <div>
                          <p className="profit">{arb.profit}%</p>
                        </div>
                        <div>
                          <Link to="/dashboard/arbitragecalculator" state={{ value: arb.odds, bms: arb.bookmakers }}>
                            <i className="fa-solid fa-calculator" onClick={openArbCalculator}></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="arbs">
                      <div style={{ paddingBottom: "1rem" }}>
                        <p style={{ fontWeight: "bold", fontSize: "17px" }} className="desktop">
                          Book Maker
                        </p>
                        <p style={{ fontWeight: "bold", fontSize: "17px" }} className="mobile">
                          BM
                        </p>
                        {arb &&
                          arb.bookmakers.split(",").map((bookmaker, index) => (
                            <p key={index} style={{ display: "block" }}>
                              {bookmaker}
                            </p>
                          ))}
                      </div>
                      <div>
                        <p
                          style={{
                            fontWeight: "bold",
                            fontSize: "17px",
                            display: "flex",
                            gap: "3px",
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        >
                          Market
                          <i
                            className="fa-solid fa-circle-info"
                            style={{ cursor: "pointer" }}
                            onClick={() => clickedMarketInfo(arb._id)}
                          ></i>
                        </p>
                        {arb &&
                          arb.markets.split(",").map((market, index) => (
                            <p className="text-muted" key={index}>
                              {market}
                            </p>
                          ))}
                      </div>

                      {marketInfo && (
                        <div className="marketInfo">
                          {arb &&
                            arb.marketExplaination
                              .split(",")
                              .map(
                                (market, index) =>
                                  arb._id === selectedItemId && <p key={index}>{market}</p>
                              )}
                        </div>
                      )}

                      <div>
                        <p style={{ fontWeight: "bold", fontSize: "17px" }}>Odds</p>
                        {arb && arb.odds.split(",").map((odd, index) => <p key={index}>{odd}</p>)}
                      </div>
                      <div>
                        <p
                          style={{ fontWeight: "bold", fontSize: "17px" }}
                          className="go-to-mobile"
                        >
                          .
                        </p>
                        <p style={{ fontWeight: "bold", fontSize: "17px" }} className="go-to">
                          Go to
                        </p>
                        {arb &&
                          arb.bookmakersLink.split(",").map((bookmaker, index) => (
                            <p key={index} style={{ display: "block" }}>
                              <a href={`${bookmaker}`} target="_blank">
                                <i className="fa-solid fa-up-right-from-square"></i>
                              </a>
                            </p>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
            </>
          )}
        </SoftBox>
      </div>

      {isPhoneNumberSaved ? "" :
        <div className="phoneNumberModalBg">
          <div className="phoneNumberModal">
            <label>Phone Number is required</label>
            {phoneNumberMsg && <p>{phoneNumberMsg}</p>}
            <input type="number" placeholder="Phone Number" onChange={(e)=> setPhoneNumber(e.target.value)}/>
            {phoneNumberLoading ? <button><i class="fa-solid fa-spinner fa-spin"></i></button> : <button onClick={savePhoneNumber}>Submit</button>}
          </div>
        </div>
       }
      
      <div className="fotter">
        {/* <Footer /> */}
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
