import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

import { useEffect, useState } from "react";

// Images
// import homeDecor1 from "assets/images/home-decor-1.jpg";
// import homeDecor2 from "assets/images/home-decor-2.jpg";
// import homeDecor3 from "assets/images/home-decor-3.jpg";
// import team1 from "assets/images/team-1.jpg";
// import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";
import Sidenav from "examples/Sidenav";

function Overview({ brand, routes }) {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [showPasswordTab, setShowPasswordTab] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);

  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [withdrawalAddress, setWithdrawalAddress] = useState("");
  const [msg, setMsg] = useState("");
  const [withdrawalAddressMsg, setWithdrawalAddressMsg] = useState(
    "Add or Edit your withdrawal address"
  );
  const [successMsg, setSuccessMsg] = useState("");
  const [hoverState, setHoverState] = useState(false);
  const [copyICon, setCopyIcon] = useState(true);

  // console.log();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/authentication/sign-in");
    }
  }, []);

  async function changePassword() {
    console.log(loggedInUser.token);
    if (oldpassword.length <= 0 || newpassword.length <= 0) {
      setMsg("Please the fields can not be left empty");
      setTimeout(() => {
        setMsg("");
      }, 5000);
      return;
    } else {
      setLoading(true);
      const resp = await fetch("https://sportbetpredict.onrender.com/api/changepassword", {
        method: "POST",
        body: JSON.stringify({ oldpassword, newpassword }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedInUser.token}`,
        },
      });
      if (resp) {
        setLoading(false);
      }
      const data = await resp.json();
      if (resp.ok) {
        console.log(data);
        setSuccessMsg(data.message);
        setTimeout(() => {
          setSuccessMsg("");
        }, 5000);
      }
      if (!resp.ok) {
        setMsg(data.message);
        setTimeout(() => {
          setMsg("");
        }, 5000);
      }
    }
  }

  async function changeWithdrawalAddress() {
    if (withdrawalAddress.length <= 0) {
      setWithdrawalAddressMsg("Please input a withdrawal address");
      setTimeout(() => {
        setWithdrawalAddressMsg("Edit your wallet address");
      }, 5000);
      return;
    } else {
      setAddressLoading(true);
      const response = await fetch(
        "https://sportbetpredict.onrender.com/api/account/change/withdrawal-address",
        {
          method: "POST",
          body: JSON.stringify({ withdrawalAddress: withdrawalAddress }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loggedInUser.token}`,
          },
        }
      );
      const data = await response.json();
      if (response) setAddressLoading(false);
      if (response.ok) {
        setWithdrawalAddressMsg(data.message);
        setTimeout(() => {
          setWithdrawalAddressMsg("Edit your withdrawal address");
        }, 5000);
      }
      console.log(data);
    }
  }

  function toggleVerified() {
    setHoverState(true);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(loggedInUser.userDetails.referrralLink);
    setCopyIcon(!copyICon);
    setTimeout(() => {
      setCopyIcon(copyICon);
    }, 5000);
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Sidenav brand={brand} brandName="Arbsking" routes={routes} />
      <div className="profileContainer">
        <div className="userDoubleInfo">
          <div className="userSingleInfo">
            <p style={{ fontWeight: "bold" }}>First Name</p>
            <div className="iconAndDetail">
              <i className="fa-solid fa-user"></i>
              <p>
                {loggedInUser && loggedInUser.userDetails.firstname}{" "}
                {loggedInUser && loggedInUser.userDetails.referralAgent && (
                  <>
                    <i
                      class="fa-solid fa-circle-check"
                      onMouseEnter={() => setHoverState(true)}
                      onMouseLeave={() => setHoverState(false)}
                      style={{ marginLeft: "5px" }}
                    ></i>
                    {hoverState && (
                      <span style={{ fontWeight: "normal" }}>Verified Referal Agent</span>
                    )}
                  </>
                )}
              </p>
            </div>
          </div>
          <div className="userSingleInfo">
            <p style={{ fontWeight: "bold" }}>Last Name</p>
            <div className="iconAndDetail">
              <i className="fa-solid fa-user"></i>
              <p>{loggedInUser && loggedInUser.userDetails.lastname}</p>
            </div>
          </div>
        </div>

        <div className="userDoubleInfo">
          <div className="userSingleInfo">
            <p style={{ fontWeight: "bold" }}>Email</p>
            <div className="iconAndDetail">
              <i className="fa-solid fa-envelope"></i>
              <p>{loggedInUser && loggedInUser.userDetails.email}</p>
            </div>
          </div>
          <div className="userSingleInfo">
            <p style={{ fontWeight: "bold" }}>Payment Address</p>
            <div className="iconAndDetail">
              <i className="fa-solid fa-wallet"></i>
              <p>{loggedInUser && loggedInUser.userDetails.paymentAddress}</p>
            </div>
          </div>
        </div>

        <div className="userDoubleInfo">
          <div className="userSingleInfo">
            <p style={{ fontWeight: "bold" }}>Password</p>
            <div className="iconAndDetail">
              <i className="fa-solid fa-key"></i>
              <p>**********</p>
            </div>
            <div className="changePasswordTab">
              <button
                onClick={() => setShowPasswordTab(!showPasswordTab)}
                className="changePasswordButton"
              >
                {!showPasswordTab ? (
                  <>Change Password</>
                ) : (
                  <>
                    <i className="fa-solid fa-xmark"></i>
                  </>
                )}
              </button>
              <div>
                {msg && <p className="msg">{msg}</p>}
                {successMsg && <p className="successMsg">{successMsg}</p>}
                {showPasswordTab && (
                  <>
                    <input
                      type="password"
                      placeholder="Old password"
                      value={oldpassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      required
                    />
                    <input
                      type="password"
                      placeholder="New password"
                      value={newpassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <br />
                    {!loading ? (
                      <button type="button" className="submitButton" onClick={changePassword}>
                        Submit
                      </button>
                    ) : (
                      <button type="button" disabled className="buttonload">
                        <i className="fa fa-spinner fa-spin"></i>
                        <p style={{ margin: 0 }}>Submit</p>
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="userSingleInfo">
            <div className="iconAndDetail" style={{ justifyContent: "space-between" }}>
              <p style={{ fontWeight: "bold" }}>Withdrawal Address</p>
              <div>
                <small style={{ marginRight: "5px", fontSize: "12px" }}>
                  {withdrawalAddressMsg}
                </small>
                <i className="fa-regular fa-pen-to-square" style={{ cursor: "pointer" }}></i>
              </div>
            </div>
            <div className="iconAndDetail">
              <i className="fa-solid fa-wallet"></i>
              <input
                type="text"
                style={{
                  outline: "none",
                  padding: "5px",
                  width: "100%",
                  border: "1px solid #344767",
                }}
                placeholder={loggedInUser && loggedInUser.userDetails.withdrawalAddress}
                onChange={(e) => setWithdrawalAddress(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <small style={{ marginLeft:"25px" }}>We pay in USDT or BUSD</small>
              <button
                style={{ marginTop: ".5rem", fontSize: "13px", border: "1px solid #000" }}
                onClick={changeWithdrawalAddress}
              >
                {addressLoading ? <i className="fa-solid fa-spinner"></i> : "Save"}
              </button>
            </div>
          </div>
        </div>

        <div className="userSingleInfo">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontWeight: "bold" }}>Referral Link</p>
            {loggedInUser && loggedInUser.userDetails.referralAgent ? (
              <>
                {copyICon ? (
                  <i
                    className="fa-regular fa-copy"
                    onClick={copyToClipboard}
                    style={{
                      cursor: "pointer",
                      padding: "7px",
                      borderRadius: "50px",
                      color: "#fff",
                      backgroundColor: "#344767",
                      fontSize: "12px",
                    }}
                  ></i>
                ) : (
                  <div>
                    <i
                      className="fa-solid fa-check"
                      style={{
                        cursor: "pointer",
                        padding: "7px",
                        borderRadius: "50px",
                        color: "#fff",
                        backgroundColor: "#344767",
                        fontSize: "12px",
                      }}
                    ></i>
                  </div>
                )}
              </>
            ) : (
              ""
            )}
          </div>
          <div className="iconAndDetail">
            <i className="fa-solid fa-link"></i>
            {loggedInUser && loggedInUser.userDetails.referralAgent ? (
              <p>{loggedInUser.userDetails.referrralLink}</p>
            ) : (
              <p>You are not yet qualified to be a referral agent, purchase a sub to be one</p>
            )}
          </div>
        </div>
      </div>
      <div className="fotter">
        <Footer />
      </div>
    </DashboardLayout>
  );
}

export default Overview;
