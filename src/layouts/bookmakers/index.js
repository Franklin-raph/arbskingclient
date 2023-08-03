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
import Sidenav from "examples/Sidenav";

function Overview({ brand, routes }) {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [showPasswordTab, setShowPasswordTab] = useState(false);
  const [loading, setLoading] = useState(false);

  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [warning, setWarning] = useState(false);
  const [checkedValues, setCheckedValues] = useState([]);
  const [bookMakersArray, setBookMakersArray] = useState([
    "18​Bet",
    "1Win",
    "22​Bet",
    "3et",
    "888​sport",
    "Be​tano",
    "Be​tano (NG)",
    "Bet​boro",
    "Bet​safe",
    "Betsson",
    "Betsson (ES)",
    "Bet​Victor",
    "Bet​first (BE)",
    "Blue​Chip",
    "Bodog (EN)",
    "Bodog (EU)",
    "Bwin",
    "Cash​point",
    "Cloud​Bet",
    "Cool​Bet",
    "Coral",
    "Dafa​bet (Dafa Sports)",
    "Dafa​bet (OW)",
    "Ef​Bet",
    "Fav​Bet",
    "Ger​ma​ni​a (HR)",
    "GG​Bet",
    "Hol​land Casino",
    "i​For​Bet",
    " Jacks",
    "KTO",
    "Mara​thon",
    "Match​book",
    "Mel​Bet",
    "Moz​zart",
    "Olimp",
    "Pari​match",
    "Pari​match (CY)",
    "Pin​nacle",
    "Rollbit",
    "Sbo​Bet",
    "Sbo​bet (e​Sport IM)",
    "Stake",
    "Supra​bets",
    "Tempo​Bet",
    "Titan​Bet",
    "Wil​liam Hill",
    "Win​mas​ters",
    "WWin",
    "Zenit",
    "1x​Bet",
    "BetKing",
    "Bet9ja",
    "BetPawa",
    "Betbonanza",
    "MerryBet",
    "NairaBet",
    "SportyBet",
  ]);

  const [favouriteBookMakers, setFavouriteBookMakers] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  const [bookmakerError, setBookmakerError] = useState("");
  const [bookmakerSuccess, setBookmakerSuccess] = useState("");
  const [bookmaker, setBookmaker] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bookiesLoading, setBookiesLoading] = useState(false);
  const [openPreviousBookMakerDetails, setOpenPreviousBookMakerDetails] = useState(true);
  const [bookiesDetails, setBookiesDetails] = useState([]);
  const [previousBookmakersArray, setPreviousBookmakersArray] = useState([]);
  const [bookMakersArrayToShow, setBookMakersArrayToShow] = useState([]);
  const [userArbsKingId, setUserArbsKingId] = useState("");
  const [searchedUserBookies, setSearchedUserBookies] = useState([]);
  const [searchedUserBookiesError, setSearchedUserBookiesError] = useState("");
  const [isSearchedUserBookies, setIsSearchedUserBookies] = useState(true);
  // const [bookmakerDetailsDivsInputs, setBookmakerDetailsDivsInputs] = useState([]);

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/dashboard/authentication/sign-in");
    }
    getFavouriteBookMakers();
    getBookMakerDetails();
  }, []);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckedValues((prevValues) => [...prevValues, value]);
    } else {
      setCheckedValues((prevValues) => prevValues.filter((v) => v !== value));
    }
  };

  async function chooseBookMakers() {
    if (checkedValues.length < 5) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 3000);
      return;
    } else {
      setLoading(true);
      const response = await fetch(
        "https://sportbetpredict.onrender.com/api/account/bookmakers/user-favourite",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loggedInUser.token}`,
          },
          body: JSON.stringify(checkedValues),
        }
      );
      const data = await response.json();
      if (response) {
        setLoading(false);
      }
      if (response.ok) {
        setSuccessMsg(true);
        setTimeout(() => {
          setSuccessMsg(false);
        }, 3000);
        getFavouriteBookMakers();
      }
      console.log(data);
    }
  }

  async function getFavouriteBookMakers() {
    setLoading(true);
    const response = await fetch(
      "https://sportbetpredict.onrender.com/api/account/bookmakers/display-favourites",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${loggedInUser.token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    if (response) {
      setLoading(false);
    }
    if (response.ok) {
      setFavouriteBookMakers(data.message);
    }
  }

  function addNewBookMakerDetailDiv() {
    if (bookiesDetails.length === 5) {
      setBookmakerError("You can only add maximum of 5 bookmaker details at a time");
      return;
    } else if (bookmaker.length === 0 || username.length === 0 || password.length === 0) {
      setBookmakerError("Please fill in all fields");
      return;
    } else {
      bookiesDetails.push({ bookmaker: bookmaker, username: username, password: password });
      setBookiesDetails([...bookiesDetails]);
      setBookmaker("");
      setUsername("");
      setPassword("");
    }
    console.log(bookiesDetails);
  }

  useEffect(() => {
    setTimeout(() => {
      setBookmakerError("");
    }, 5000);
  }, [bookmakerError]);

  async function addBookMakerDetails() {
    console.log(JSON.stringify({ bookiesDetails: bookiesDetails }));
    setBookiesLoading(true);
    const response = await fetch(
      "https://sportbetpredict.onrender.com/api/account/add/bookmaker-details",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${loggedInUser.token}`,
        },
        body: JSON.stringify({ bookiesDetails: bookiesDetails }),
      }
    );
    const data = await response.json();
    if (response) setBookiesLoading(false);
    if (response.ok) {
      setBookmakerSuccess(data.message);
    }
    if (!response.ok) {
      setBookmakerError(data.message);
    }
    console.log(response, data);
  }

  async function getBookMakerDetails() {
    const response = await fetch(
      "https://sportbetpredict.onrender.com/api/account/display/bookmaker-details",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${loggedInUser.token}`,
        },
      }
    );
    console.log(response);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setPreviousBookmakersArray(data.message.bookiesDetails);
      if (data.message.bookiesDetails === null || data.message.bookiesDetails.length === 0) {
        setBookMakersArrayToShow(bookMakersArray);
        return;
      } else {
        const bookMakersToRemove = new Set(
          data.message.bookiesDetails.map((item) => item.bookmaker)
        );
        const bookMakersToShow = bookMakersArray.filter((item) => !bookMakersToRemove.has(item));
        setBookMakersArrayToShow(bookMakersToShow);
        console.log(bookMakersToShow);
      }
    }
  }

  async function searchUserBookMarkerDetails() {
    console.log("fetching....");
    const response = await fetch(
      "https://sportbetpredict.onrender.com/api/account/vendor/search-user",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${loggedInUser.token}`,
        },
        body: JSON.stringify({ userArbsKingId: userArbsKingId }),
      }
    );
    const data = await response.json();
    console.log(response);
    console.log(data);
    if (response) console.log("Data gotten....");
    if (!response.ok) {
      setSearchedUserBookiesError(data.message);
      setTimeout(() => {
        setSearchedUserBookiesError("");
      }, 3000);
      return;
    }

    if (response.ok) {
      setSearchedUserBookies(data.message.userBookieDetails.bookiesDetails);
      return;
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Sidenav brand={brand} brandName="Arbsking" routes={routes} />
      {warning && (
        <div className="subModal">
          <i className="fa-solid fa-xmark"></i>
          <p>Please select at least 5 bookmakers.</p>
        </div>
      )}
      {successMsg && (
        <div className="subModal">
          <i className="fa-solid fa-check"></i>
          <p>Favourite bookmakers added sucessfully.</p>
        </div>
      )}
      <div className="bookMakerPageHeader">
        <h6>Select Favourite Bookmakers</h6>
        <div className="searchInput">
          <input
            type="search"
            placeholder="Filter Bookmakers"
            onChange={(e) => setSearchWord(e.target.value.toLocaleLowerCase())}
          />
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div className="bookmakersContainer" style={{ marginTop: "1rem" }}>
        {bookMakersArray
          .filter((bookmaker) => {
            if (bookmaker === "") return bookmaker;
            else if (bookmaker.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase()))
              return bookmaker;
          })
          .map((bookmaker) => (
            <div className="book-maker-box">
              <input type="checkbox" value={bookmaker} onChange={handleCheckboxChange} />
              <label for={bookmaker}> {bookmaker} </label>
            </div>
          ))}
      </div>
      {!loading ? (
        <button className="chooseBookMakers" onClick={chooseBookMakers}>
          Add to favourites
        </button>
      ) : (
        <button className="chooseBookMakers">
          <i className="fa-solid fa-spinner"></i> Add to favourites
        </button>
      )}
      <div className="favouriteBookMakers">
        <h6 style={{ marginBottom: "0" }}>My Favourite BookMakers</h6>
        <div className="bookmakersContainer" style={{ marginTop: "1rem" }}>
          {favouriteBookMakers &&
            favouriteBookMakers.map((favouriteBookMaker) => <p>{favouriteBookMaker}</p>)}
        </div>
      </div>

      <div className="favouriteBookMakers">
        <h6 style={{ marginBottom: "0" }}>Add BookMaker Details</h6>

        <div>
          <div className="addBookmakerDetailsInputDiv">
            <div>
              <label style={{ display: "block" }}>Bookmaker</label>
              <select
                onChange={(e) => setBookmaker(e.target.value)}
                style={{ border: "1px solid #344767", padding: "3px 0", outline: "none" }}
              >
                <option>Select a bookmaker</option>
                {bookMakersArrayToShow &&
                  bookMakersArrayToShow.map((bookmaker) => (
                    <option value={bookmaker}>{bookmaker}</option>
                  ))}
              </select>
              {/* <input type="text" placeholder="Bookmaker" value={bookmaker} onChange={(e) => setBookmaker(e.target.value)}/> */}
            </div>
            <div>
              <label style={{ display: "block" }}>Username</label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label style={{ display: "block" }}>Password</label>
              <input
                type="text"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              onClick={addNewBookMakerDetailDiv}
              className="chooseBookMakers"
              style={{ marginTop: "1rem", marginBottom: "0" }}
            >
              <i className="fa-solid fa-plus"></i> Add BookMaker
            </button>
          </div>
        </div>

        <div className="addedBookMakersDivContainer">
          {bookmakerError && (
            <p
              style={{
                textAlign: "center",
                border: "1px solid #f5c6cb",
                borderRadius: "5px",
                backgroundColor: "#f8d7da",
                padding: "7px",
                color: "#721c24",
              }}
            >
              {bookmakerError}
            </p>
          )}
          {bookmakerSuccess && (
            <p
              style={{
                textAlign: "center",
                border: "1px solid #c3e6cb",
                borderRadius: "5px",
                backgroundColor: "#d4edda",
                padding: "7px",
                color: "#155724",
              }}
            >
              {bookmakerSuccess}
            </p>
          )}
          {bookiesDetails.length > 0 ? <h6>My New Bookmaker Details</h6> : ""}
          {bookiesDetails.map((bookiesDetail, index) => (
            <div className="addedBookMakersDiv">
              <div>
                <h6>BookMaker</h6>
                <p style={{ marginBottom: "0" }}>{bookiesDetail.bookmaker}</p>
              </div>
              <div>
                <h6>Username</h6>
                <p style={{ marginBottom: "0" }}>{bookiesDetail.username}</p>
              </div>
              <div>
                <h6>Password</h6>
                <p style={{ marginBottom: "0" }}>{bookiesDetail.password}</p>
              </div>
            </div>
          ))}
        </div>

        {!bookiesLoading ? (
          <>
            {bookiesDetails && bookiesDetails.length > 0 && (
              <button
                onClick={addBookMakerDetails}
                className="chooseBookMakers"
                style={{ marginTop: "10px", marginBottom: "0rem" }}
              >
                Submit
              </button>
            )}
          </>
        ) : (
          <button className="chooseBookMakers">
            <i className="fa-solid fa-spinner"></i> Submit
          </button>
        )}
      </div>

      <div className="addedBookMakersDivContainer" style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h6>My Previous Bookmaker Details</h6>
          <i
            class="fa-solid fa-chevron-down"
            style={{ cursor: "pointer" }}
            onClick={() => setOpenPreviousBookMakerDetails(!openPreviousBookMakerDetails)}
          ></i>
        </div>
        {openPreviousBookMakerDetails ? (
          <>
            {previousBookmakersArray &&
              previousBookmakersArray.map((previousBookmaker) => (
                <div className="addedBookMakersDiv">
                  <div>
                    <h6>BookMaker</h6>
                    <p style={{ marginBottom: "0" }}>{previousBookmaker.bookmaker}</p>
                  </div>
                  <div>
                    <h6>Username</h6>
                    <p style={{ marginBottom: "0" }}>{previousBookmaker.username}</p>
                  </div>
                  <div>
                    <h6>Password</h6>
                    <p style={{ marginBottom: "0" }}>{previousBookmaker.password}</p>
                  </div>
                </div>
              ))}
          </>
        ) : (
          ""
        )}
      </div>

      {loggedInUser.userDetails.isVendor && (
        <div style={{ marginBottom: "1rem" }}>
          <input
            onChange={(e) => setUserArbsKingId(e.target.value)}
            type="search"
            placeholder="Arbsking ID"
            style={{
              outline: "none",
              border: "1px solid #344767",
              marginRight: "1rem",
              padding: "3px 5px",
            }}
          />
          <button onClick={searchUserBookMarkerDetails}>Search</button>
        </div>
      )}

      {loggedInUser.userDetails.isVendor && (
        <div className="addedBookMakersDivContainer" style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h6>Users Bookmaker Details</h6>
            <i
              class="fa-solid fa-chevron-down"
              style={{ cursor: "pointer" }}
              onClick={() => setIsSearchedUserBookies(!isSearchedUserBookies)}
            ></i>
          </div>
          {isSearchedUserBookies && (
            <>
              {searchedUserBookies &&
                searchedUserBookies.map((userBookie) => (
                  <div className="addedBookMakersDiv">
                    <div>
                      <h6>BookMaker</h6>
                      <p style={{ marginBottom: "0" }}>{userBookie.bookmaker}</p>
                    </div>
                    <div>
                      <h6>Username</h6>
                      <p style={{ marginBottom: "0" }}>{userBookie.username}</p>
                    </div>
                    <div>
                      <h6>Password</h6>
                      <p style={{ marginBottom: "0" }}>{userBookie.password}</p>
                    </div>
                  </div>
                ))}
            </>
          )}
          {searchedUserBookiesError && (
            <p className="alert alert-danger">{searchedUserBookiesError}</p>
          )}
        </div>
      )}

      <div className="fotter">
        <Footer />
      </div>
    </DashboardLayout>
  );
}

export default Overview;

{
  /* <div style={{ marginTop: "1rem", display:"flex", gap:"10px" }}>
          <div>
            <label style={{ display:"block" }}>Bookmaker</label>
            <input type="text" placeholder="Bookmaker" onChange={(e) => setBookmaker(e.target.value)}/>
          </div>
          <div>
            <label style={{ display:"block" }}>Username</label>
            <input type="text" placeholder="username" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div>
            <label style={{ display:"block" }}>Password</label>
            <input type="text" placeholder="********" onChange={(e) => setPassword(e.target.value)}/>
          </div>
        </div> */
}
