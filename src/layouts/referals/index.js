import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import Sidenav from "examples/Sidenav";
import { useEffect, useState } from "react";
const Referals = ({ brand, routes }) => {
  const [referalData, setReferalData] = useState();
  const [loading, setLoading] = useState(false);
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [isSuccessWithdrawalModalOpen, setIsSuccessWithdrawalModalOpen] = useState(false);
  const [referralCount, setReferralCount] = useState(false);
  const [referralBonusEarned, setReferralBonusEarned] = useState(false);
  const [referralEarnings, setReferralEarnings] = useState(false);
  const [referralBonusLost, setReferralBonusLost] = useState(false);
  const [pendingWithdrawal, setPendingWithdrawal] = useState(false);
  const [withdrawalHistory, setWithdrawalHistory] = useState(false);
  const [pendingWithdrawalInfo, setPendingWithdrawalInfo] = useState("");
  const [withdrawalHistoryInfo, setWithdrawalHistoryInfo] = useState("");

  useEffect(() => {
    getMyReferralDetails();
    getWithdrawalHistory();
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

  async function getWithdrawalHistory() {
    const response = await fetch(
      "https://sportbetpredict.onrender.com/api/account/user/pending/withdrawal-history",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedInUser.token}`,
        },
      }
    );
    console.log(response);
    const data = await response.json();
    if (response) {
      setPendingWithdrawalInfo(data.message);
      console.log(data);
    }
  }

  function checkWithdrawal() {
    if (referalData.referralBonusEarned >= 10) {
      setIsSuccessWithdrawalModalOpen(true);
    } else {
      setIsWithdrawalModalOpen(true);
    }
  }

  return (
    <DashboardLayout>
      <Sidenav brand={brand} brandName="Arbsking" routes={routes} />
      <DashboardNavbar />
      {isSuccessWithdrawalModalOpen && (
        <div className="withdrawalSuccessModalBg">
          <p className="withdrawalSuccessModal">
            <i
              class="fa-regular fa-circle-xmark"
              onClick={() => setIsSuccessWithdrawalModalOpen(!isSuccessWithdrawalModalOpen)}
            ></i>
            You are qualified for withdrawal
          </p>
        </div>
      )}
      {isWithdrawalModalOpen && (
        <div className="withdrawalModalBg">
          <p className="withdrawalModal">
            <i
              class="fa-regular fa-circle-xmark"
              onClick={() => setIsWithdrawalModalOpen(!isWithdrawalModalOpen)}
            ></i>
            In order to initiate a withdrawal, it is required that you possess a minimum balance of
            $10 in your earned referral bonus, taking into account a withdrawal fee of 10%.
          </p>
        </div>
      )}
      <div className="referralHeader">
        <h1>My Referral Info</h1>
        {referalData && (
          <button onClick={checkWithdrawal}>
            <i class="fa-solid fa-money-bill-transfer"></i> Withdraw
          </button>
        )}
      </div>
      <div className="referralContainer">
        <div className="referralCount">
          <div className="referralDiv">
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              <h1>{referalData && referalData.referralCount}</h1>
            )}
            <div>
              <p>Referral Count</p>
              <i
                class="fa-solid fa-angle-down"
                onClick={() => setReferralCount(!referralCount)}
              ></i>
            </div>
          </div>
          {referralCount && (
            <p style={{ padding: " 0 1.5rem" }}>
              This metric represents the total number of individuals you have successfully referred
              to our platform.
            </p>
          )}
        </div>

        <div className="referralEarnings">
          <div className="referralDiv">
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              <h1 style={{ color: "#1AC888" }}>${referalData && referalData.referralEarnings}</h1>
            )}
            <div>
              <p>Referral Earnings</p>
              <i
                class="fa-solid fa-angle-down"
                onClick={() => setReferralEarnings(!referralEarnings)}
              ></i>
            </div>
          </div>
          {referralEarnings && (
            <p style={{ padding: " 0 1.5rem" }}>
              This encompasses the cumulative bonus derived from all the users who have subscribed
              to our services through your referral.
            </p>
          )}
        </div>
      </div>

      <div className="referralContainer">
        <div className="referralBonusEarned">
          <div className="referralDiv">
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              <h1 style={{ color: "#1AC888" }}>
                ${referalData && referalData.referralBonusEarned}
              </h1>
            )}
            <div>
              <p>Referral Bonus Earned</p>
              <i
                class="fa-solid fa-angle-down"
                onClick={() => setReferralBonusEarned(!referralBonusEarned)}
              ></i>
            </div>
          </div>
          {referralBonusEarned && (
            <p style={{ padding: " 0 1.5rem" }}>
              This metric specifically tracks the total bonus earned from users who have subscribed
              to our services through your referral. It is applicable only when you maintain an
              active subscription at the time of your referral's subscription.
            </p>
          )}
        </div>

        <div className="referralBonusLost">
          <div className="referralDiv">
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              <h1 style={{ color: "#D21403" }}>${referalData && referalData.referralBonusLost}</h1>
            )}
            <div>
              <p>Referral Bonus Lost</p>
              <i
                class="fa-solid fa-angle-down"
                onClick={() => setReferralBonusLost(!referralBonusLost)}
              ></i>
            </div>
          </div>
          {referralBonusLost && (
            <p style={{ padding: " 0 1.5rem" }}>
              This denotes the amount of referral bonus that is forfeited when your referral
              purchases a subscription, but you do not have an active subscription yourself.
            </p>
          )}
        </div>
      </div>
      <div className="referred-users">
        <h5>Referred Users({referalData && referalData.referredUser.length})</h5>
        <p>
          This comprehensive list enumerates all the users you have successfully referred to our
          platform.
        </p>
        <ul>{referalData && referalData.referredUser.map((user) => <li>{user}</li>)}</ul>
      </div>

      <div className="pendingAndHistory">
        <div className="pendingWithdrawal">
          <div>
            <h6>Pending Withdrawals</h6>
            <i
              class="fa-solid fa-angle-down"
              onClick={() => setPendingWithdrawal(!pendingWithdrawal)}
            ></i>
          </div>
          {pendingWithdrawal && <p>{pendingWithdrawalInfo}</p>}
        </div>

        <div className="withdrawalHistory">
          <div>
            <h6>Withdrawal History</h6>
            <i
              class="fa-solid fa-angle-down"
              onClick={() => setWithdrawalHistory(!withdrawalHistory)}
            ></i>
          </div>
          <p>{}</p>
        </div>
      </div>

      <div className="fotter">
        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default Referals;
