import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import Sidenav from "examples/Sidenav";
import { useEffect, useState } from "react";
const Referals = ({ brand, routes }) => {
  const [referalData, setReferalData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getMyReferralDetails();
  }, []);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  async function getMyReferralDetails() {
    setLoading(true);
    const response = await fetch(
      "https://sportbetpredict.onrender.com/api/account/fetch/referral-details",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedInUser.token}`,
        },
      }
    );
    const data = await response.json();
    if (response) setLoading(false);
    if (response.ok) {
      setReferalData(data.message);
    }
    console.log(response, data);
  }

  return (
    <DashboardLayout>
      <Sidenav brand={brand} brandName="Arbsking" routes={routes} />
      <DashboardNavbar />
        <h1 className="referralHeader">My Referral Info</h1>
        <div className="referralContainer">
            <div className="referralDiv">
            {loading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
                <h1>{referalData && referalData.referralCount}</h1>
            )}

            <p>Referral Count</p>
            </div>
            <div className="referralDiv">
            {loading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
                <h1 style={{ color:"#1AC888" }}>${referalData && referalData.referralEarnings}</h1>
            )}

            <p>Referral Earnings</p>
            </div>
        </div>
        <div className="referralContainer" style={{ marginBottom:"5rem" }}>
            <div className="referralDiv">
            {loading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
                <h1 style={{ color:"#1AC888" }}>${referalData && referalData.referralBonusEarned}</h1>
            )}

            <p>Referral Bonus Earned</p>
            </div>
            <div className="referralDiv">
            {loading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
                <h1 style={{ color:"#D21403" }}>${referalData && referalData.referralBonusLost}</h1>
            )}

            <p>Referral Bonus Lost</p>
            </div>
        </div>
        <div className="fotter">
            <Footer />
        </div>
    </DashboardLayout>
  );
};

export default Referals;
