// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React components
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Billing page components
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";
import Sidenav from "examples/Sidenav";
import shieldImage from "../../images/secure-shield.png";
import warningImage from "../../images/warning.png";
import grid from "../../images/grid.png";
import qrcode from "../../images/qr-code.png";
import QRCode from "react-qr-code";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingGif from "../../assets/images/loader/loading-gif.gif";

// Soft UI Dashboard React routes
// import routes from "routes";

function Payment({ brand, routes }) {
  const [subScriptionStatus, setSubScriptionStatus] = useState();
  const [subScriptionInfo, setSubScriptionInfo] = useState("");
  const [subMsg, setSubMsg] = useState("");
  const [copyICon, setCopyIcon] = useState(true);
  const [loading, setLoading] = useState(false);
  const [subLoading, setSubLoading] = useState(false);
  const [basicSubType, setBasicSubType] = useState(false);
  const [standrdSubType, setStandrdSubType] = useState(false);
  const [premiumSubType, setPremiumSubType] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  // function openModal() {
  //   setSubScriptionModalOpen(!subScriptionModalOpen);
  // }

  function copyToClipboard() {
    navigator.clipboard.writeText(loggedInUser.userDetails.paymentAddress);
    setCopyIcon(!copyICon);
    setTimeout(() => {
      setCopyIcon(copyICon);
    }, 5000);
  }

  console.log("From line 55", loggedInUser);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/dashboard/authentication/sign-in");
    }
    getUsersSubscriptionStatus();
  }, []);

  async function payForSub(subId) {
    setSubLoading(true);
    console.log(subId, subLoading);
    const response = await fetch("https://sportbetpredict.onrender.com/api/purchase/subscription", {
      method: "POST",
      body: JSON.stringify({
        subscription_id: subId,
        user_payment_address: `${loggedInUser.userDetails.paymentAddress}`,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    });
    console.log(response)
    if (response) {
      setBasicSubType(false)
      setStandrdSubType(false)
      setPremiumSubType(false)
      setSubLoading(false);
      console.log(subLoading)
      getUsersSubscriptionStatus();
    }
    const data = await response.json();
    console.log(data.message)
    setSubMsg(data.message);
    setTimeout(() => {
      setSubMsg();
    }, 5000);
    console.log(data);
  }
  console.log(subMsg)

  async function getUsersSubscriptionStatus() {
    setLoading(true);
    const response = await fetch(
      "https://sportbetpredict.onrender.com/api/account/user/sub-status",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedInUser.token}`,
        },
      }
    );
    if (response) {
      setLoading(false);
    }
    const data = await response.json();
    console.log(data);
    setSubScriptionInfo(data);
    setSubScriptionStatus(data.subStatus);
  }

  return (
    <DashboardLayout>
      {subMsg && (
        <div className="subModal">
          {subMsg === "You still have an active subscription." ? (
            <i className="fa-solid fa-xmark"></i>
          ) : subMsg === "Subscription purchased successfully." ? (
            <i className="fa-solid fa-check"></i>
          ) : (
            <i className="fa-solid fa-xmark"></i>
          )}
          <div className="subModalContent">{subMsg}</div>
        </div>
      )}
      <DashboardNavbar />
      <Sidenav brand={brand} brandName="Arbsking" routes={routes} />
      <div className="paymentContainer">
        <SoftBox mt={4}>
          <SoftBox mb={1.5}>
            <Grid container spacing={3}>
              {subScriptionStatus && subScriptionStatus ? (
                <Grid item xs={12} lg={6}>
                  <Grid item xs={12}>
                    <div className="subscription">
                      <img src={shieldImage} className="shieldImage" />
                      <div className="subscriptionText">
                        <h2>Active Subscription</h2>
                        <p>
                          {new Date(subScriptionInfo.userSub.subACreatedAt).toString().slice(3, 11)}{" "}
                          -{new Date(subScriptionInfo.userSub.expiringDate).toString().slice(3, 11)}
                        </p>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              ) : (
                <>
                  {subScriptionInfo && subScriptionInfo.userSubStatus === "No Subscription" ? (
                    <Grid item xs={12} lg={6}>
                      <div className="subscription">
                        <img src={grid} className="gridImage" />
                        <div className="subscriptionText">
                          <h2>{subScriptionInfo.userSubStatus}</h2>
                          <p>Subscribe to continue placing bets</p>
                        </div>
                      </div>
                    </Grid>
                  ) : subScriptionInfo.userSubStatus === "Expired" ? (
                    <Grid item xs={12} lg={6}>
                      <div className="subscription">
                        <img src={warningImage} className="expiredImage" />
                        <div className="subscriptionText">
                          <h2>{subScriptionInfo.userSubStatus}</h2>
                          <p>Subscribe to continue placing bets</p>
                        </div>
                      </div>
                    </Grid>
                  ) : (
                    loading && (
                      <Grid item xs={12} lg={6}>
                        <div className="subscription" style={{ fontSize: "24px" }}>
                          <i class="fa-solid fa-spinner fa-spin"></i>
                          <p style={{ marginBottom: "0", fontSize: "16px" }}>
                            Getting subscription status
                          </p>
                        </div>
                      </Grid>
                    )

                    //   <div className="subscription">
                    //     <div className="loadingGif">
                    //       {loading && (
                    //         <div
                    //           style={{
                    //             display: "flex",
                    //             alignItems: "center",
                    //             gap: "20px",
                    //             justifyContent: "center",
                    //           }}
                    //         >
                    //           <img src={LoadingGif} width={"30%"} style={{ marginTop: "0" }} />
                    //           <p>Getting subscription status</p>
                    //         </div>
                    //       )}
                    //     </div>
                    //   </div>
                  )}
                </>
              )}
            </Grid>
          </SoftBox>
          <SoftBox>
            <div className="makePayment">
              <h2>MAKE PAYMENT</h2>
              <ul style={{ textAlign: "left" }}>
                <li>
                  Copy your wallet address or scan the barcode below to get the wallet address.
                </li>
                <li>Using any of the crypto payment app, pay into the wallet address.</li>
                <li>
                  After payment has been made, refresh the balance or the page to reflect your
                  current acount balance.
                </li>
                <li>
                  From our available plans below, you can now purchase any plan of your choice.
                </li>
                <li>Our mode of payments is BUSD, USDT (BEP-20).</li>
              </ul>

              <div className="qrCodeAndAddress">
                <div className="qrCode">
                  <QRCode
                    value={loggedInUser && loggedInUser.userDetails.paymentAddress}
                    size="100"
                  />
                </div>
                <div className="addressAndCopy">
                  <input
                    type="text"
                    value={loggedInUser && loggedInUser.userDetails.paymentAddress}
                    disabled
                  />
                  {copyICon ? (
                    <i className="fa-regular fa-copy" onClick={copyToClipboard}></i>
                  ) : (
                    <div>
                      <i className="fa-solid fa-check"></i>
                      <small>Copied</small>
                    </div>
                  )}
                </div>
              </div>
              <p className="makePaymentBottomText" style={{ lineHeight: "30px" }}>
                Please visit the link below to read more on how to make crypto payments<br></br>{" "}
                <a
                  href="https://bitpay.com/blog/how-to-pay-with-crypto/"
                  style={{ textDecoration: "underline" }}
                  target="_blank"
                >
                  Read More
                  <i className="fa-solid fa-arrow-right" style={{ marginLeft: "5px" }}></i>
                </a>
              </p>
              <div className="whatsApplinkNumbers">
                <p>
                  If you don't know how to make payment to the designated address independently, we
                  offer you an alternative solution of engaging one of our esteemed verified
                  vendors.
                  <br />
                  You can contact them via the WhatsApp contacts below
                </p>
                <div>
                  <i class="fa-brands fa-whatsapp"></i>
                  <a target="_blank" href="https://wa.me/message/QWVCK5JG65EKH1">
                    Vendor 1
                  </a>
                </div>
              </div>
            </div>
          </SoftBox>

          <SoftBox mb={1.5}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={4}>
                <Grid item xs={12}>
                  <div className="subscriptionPlans" style={{ padding: "10px" }}>
                    <h3>Basic</h3>
                    <div className="priceAndDuration">
                      <div>
                        <h2>$5</h2>
                        <p>Weekly</p>
                      </div>
                      <div>
                        <h2>$12</h2>
                        <p>Monthly</p>
                      </div>
                    </div>
                    <ul style={{ textAlign: "start" }}>
                      <li>
                        <i class="fa-solid fa-circle-check"></i>
                        <p>Access to the betting arbitrage opportunity provider.</p>
                      </li>
                      <li>
                        <i class="fa-solid fa-circle-check"></i>
                        <p>Utilization of the arbitrage calculator for football matches.</p>
                      </li>
                      <li>
                        <i class="fa-solid fa-circle-check"></i>
                        <p>
                          Scanning and comparison of opportunities across 15 sports betting
                          bookmakers.
                        </p>
                      </li>
                      <li>
                        <i class="fa-solid fa-circle-check"></i>
                        <p>Daily updates on potential arbitrage opportunities.</p>
                      </li>
                      <li>
                        <i class="fa-solid fa-circle-check"></i>
                        <p>Entry-level community access for discussions and sharing tips.</p>
                      </li>
                    </ul>
                      <button onClick={() => setBasicSubType(true)}>Subscribe</button>
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={12} lg={4}>
                <div className="subscriptionPlans second">
                  <h3>Standard</h3>
                  <div className="priceAndDuration">
                    <div>
                      <h2>$10</h2>
                      <p>Weekly</p>
                    </div>
                    <div>
                      <h2>$30</h2>
                      <p>Monthly</p>
                    </div>
                  </div>
                  <ul style={{ textAlign: "start" }}>
                    <li>
                      <i class="fa-solid fa-circle-check"></i>
                      <p>All features from the Basic Tier.</p>
                    </li>
                    <li>
                      <i class="fa-solid fa-circle-check"></i>
                      <p>Expanded coverage to include a variety of sports, beyond just football.</p>
                    </li>
                    <li>
                      <i class="fa-solid fa-circle-check"></i>
                      <p>Scanning and comparison across 30 sports betting bookmakers.</p>
                    </li>
                    <li>
                      <i class="fa-solid fa-circle-check"></i>
                      <p>Access to premium community features and advanced tips.</p>
                    </li>
                  </ul>
                    <button onClick={() => setStandrdSubType(true)}>Subscribe</button>
                </div>
              </Grid>
              <Grid item xs={12} lg={4}>
                <div className="subscriptionPlans third">
                  <h3>Premium</h3>
                  <div className="priceAndDuration">
                    <div>
                      <h2>$20</h2>
                      <p>Weekly</p>
                    </div>
                    <div>
                      <h2>$70</h2>
                      <p>Monthly</p>
                    </div>
                  </div>
                  <ul style={{ textAlign: "start", fontSize: "15px" }}>
                    <li>
                      <i class="fa-solid fa-circle-check"></i>
                      <p>All features from the mixed Tier.</p>
                    </li>
                    <li>
                      <i class="fa-solid fa-circle-check"></i>
                      <p>Priority access to real-time arbitrage opportunities.</p>
                    </li>
                    <li>
                      <i class="fa-solid fa-circle-check"></i>
                      <p>Exclusive investment strategy webinars and workshops.</p>
                    </li>
                    <li>
                      <i class="fa-solid fa-circle-check"></i>
                      <p>Personalized subscription plans that cater to different budget levels.</p>
                    </li>
                  </ul>
                    <button onClick={() => setPremiumSubType(true)}>Subscribe</button>
                </div>
              </Grid>
            </Grid>
          </SoftBox>
        </SoftBox>
      </div>
      {basicSubType && (
        <div className="subTypeModalBg">
          {subLoading ?
          <div className="subTypeModal" style={{ position: "relative" }}>
          
          <h4 style={{ marginBottom: "25px", fontWeight: "400", textAlign:"center",  color: "#344767" }}>
            Purchasing Sub Please wait
          </h4>
          <div
            className="subPrice"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize:"22px" }}></i>
          </div>
        </div>
        :
        <div className="subTypeModal" style={{ position: "relative" }}>
            <i
              className="ri-close-circle-fill"
              style={{
                fontSize: "30px",
                textTransform: "uppercase",
                position: "fixed",
                top: "3%",
                right: "3%",
                cursor: "pointer",
              }}
              onClick={() => setBasicSubType(false)}
            ></i>
            <h4 style={{ marginBottom: "25px", fontWeight: "400", textAlign:"center",  color: "#344767" }}>
              Choose Subscription Plan
            </h4>
            <div
              className="subPrice"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <button onClick={()=> payForSub("64de6ac96f116424c6454124")}>$5 / week</button>
              <p style={{ margin: "0" }}>Or</p>
              <button onClick={()=> payForSub("64690b1694617642d7b9ef9f")}>$12 / Month</button>
            </div>
          </div>
            }
        </div>
      )}
      {standrdSubType && (
        <div className="subTypeModalBg">
          {subLoading ?
          <div className="subTypeModal" style={{ position: "relative" }}>
          
          <h4 style={{ marginBottom: "25px", fontWeight: "400", textAlign:"center",  color: "#344767" }}>
            Purchasing Sub Please wait
          </h4>
          <div
            className="subPrice"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize:"22px" }}></i>
          </div>
        </div>
        :
          <div className="subTypeModal" style={{ position: "relative" }}>
            <i
              className="ri-close-circle-fill"
              style={{
                fontSize: "30px",
                textTransform: "uppercase",
                position: "fixed",
                top: "3%",
                right: "3%",
                cursor: "pointer",
              }}
              onClick={() => setStandrdSubType(false)}
            ></i>
            <h4 style={{ marginBottom: "25px", fontWeight: "400", textAlign:"center", color: "#344767" }}>
              Choose Subscription Plan
            </h4>
            <div
              className="subPrice"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <button onClick={()=> payForSub("64de6c356f116424c6454125")}>$10 / week</button>
              <p style={{ margin: "0" }}>Or</p>
              <button onClick={()=> payForSub("64de6c406f116424c6454126")}>$30 / Month</button>
            </div>
          </div>
          }
        </div>
      )}
      {premiumSubType && (
        <div className="subTypeModalBg">
          {subLoading ?
          <div className="subTypeModal" style={{ position: "relative" }}>
          
          <h4 style={{ marginBottom: "25px", fontWeight: "400", textAlign:"center",  color: "#344767" }}>
            Purchasing Sub Please wait
          </h4>
          <div
            className="subPrice"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize:"22px" }}></i>
          </div>
        </div>
        :
          <div className="subTypeModal" style={{ position: "relative" }}>
            <i
              className="ri-close-circle-fill"
              style={{
                fontSize: "30px",
                textTransform: "uppercase",
                position: "fixed",
                top: "3%",
                right: "3%",
                cursor: "pointer",
              }}
              onClick={() => setPremiumSubType(false)}
            ></i>
            <h4 style={{ marginBottom: "25px", fontWeight: "400", textAlign:"center", color: "#344767" }}>
              Choose Subscription Plan
            </h4>
            <div
              className="subPrice"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <button onClick={()=> payForSub("64de6ca56f116424c6454128")}>$20 / week</button>
              <p style={{ margin: "0" }}>Or</p>
              <button onClick={()=> payForSub("64de6c996f116424c6454127")}>$70 / Month</button>
            </div>
          </div>
          }
        </div>
      )}
      <div className="fotter">
        <Footer />
      </div>
    </DashboardLayout>
  );
}

export default Payment;
