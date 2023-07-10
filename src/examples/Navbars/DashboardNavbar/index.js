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

import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";

// Soft UI Dashboard React examples
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

import { useAuth } from "../../../auth-context/auth.context";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Soft UI Dashboard React context
import {
  useSoftUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

// Images
import team2 from "assets/images/team-2.jpg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";

import AuthApi from "../../../api/auth";
import { useNavigate } from "react-router-dom";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const navigate = useNavigate();
  const [userBalance, setUserBalance] = useState("");
  const [notificationBell, setNotificationBell] = useState(false);
  const [showNotificationMsg, setShowNotificationMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [announcements, setAnnouncments] = useState([]);
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);
  const [announcementDot, setAnnouncementDot] = useState(false);
  const { user } = useAuth();
  const { setUser } = useAuth();

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  // console.log(loggedInUser.userDetails);

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/dashboard/authentication/sign-in");
    }

    getUserBalance();

    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    getOpportunitiesViaWebSocket();

    setAnnouncementDot(loggedInUser.userDetails.notification)
    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  function getOpportunitiesViaWebSocket() {
    // const socket = new WebSocket("ws://192.168.8.100:3000");
    const socket = new WebSocket("wss://sportbetpredict.onrender.com");

    socket.addEventListener("open", () => {
      console.log("WebSocket connection established");

      // Send a message to the server
      socket.send(loggedInUser.token);
    });

    socket.addEventListener("message", (event) => {
      console.log(event.data);
      if (event.data === "true") {
        setShowNotificationMsg(true);
        setNotificationBell(true);
        return;
      }

      if (event.data === "false") {
        setShowNotificationMsg(false);
        setNotificationBell(false);
        return;
      }
    });
  }

  async function getUserBalance() {
    setLoading(true);
    const response = await fetch(
      "https://sportbetpredict.onrender.com/api/account/user/sub-status",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${loggedInUser.token}`,
        },
      }
    );
    if (response) {
      setLoading(false);
    }
    const data = await response.json();
    console.log("User balance status => ", data);
    setUserBalance(data.userBalance);
    // setNotification(data.notification);
    if (data.jwtStatus !== "Not Expired") {
      changeLoginStatusIfJwtExpires();
      navigate("/dashboard/authentication/sign-in");
    }
  }

  async function changeLoginStatusIfJwtExpires() {
    const response = await fetch(
      "https://sportbetpredict.onrender.com/api/account/logout/reset-login-status",
      {
        method: "POST",
        body: JSON.stringify({ userId: loggedInUser.userDetails._id }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (response) localStorage.clear();
  }

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  const handleLogout = () => {
    // AuthApi.Logout(user);
    setUser(null);
    localStorage.clear();
    return navigate("/dashboard/authentication/sign-in");
  };

  function checkNotification() {
    localStorage.setItem("notify", "false");
    setShowNotificationMsg(false);
    setNotificationBell(false);
  }

  async function changeNotificationStatus() {
    setIsAnnouncementOpen(false)
    setAnnouncementDot(false)
    const response = await fetch(
      "https://sportbetpredict.onrender.com/api/account/change/notification",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${loggedInUser.token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  function openAnnouncement() {
    setIsAnnouncementOpen(true);
    getAnnouncement();
  }

  async function getAnnouncement() {
    const response = await fetch(
      "https://sportbetpredict.onrender.com/api/account/broadcast-message",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${loggedInUser.token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data.message);
    if (response.ok) setAnnouncments(data.message);
  }

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem
        image={<img src={team2} alt="person" />}
        title={["New message", "from Laur"]}
        date="13 minutes ago"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        image={<img src={logoSpotify} alt="person" />}
        title={["New album", "by Travis Scott"]}
        date="1 day"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        color="secondary"
        image={
          <Icon fontSize="small" sx={{ color: ({ palette: { white } }) => white.main }}>
            payment
          </Icon>
        }
        title={["", "Payment successfully completed"]}
        date="2 days"
        onClick={handleCloseMenu}
      />
    </Menu>
  );

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </SoftBox>
        {isMini ? null : (
          <SoftBox sx={(theme) => navbarRow(theme, { isMini })}>
            <SoftBox
              color="inherit"
              mb={{ xs: 1, md: 0 }}
              sx={(theme) => navbarRow(theme, { isMini })}
            >
              <div className="userAndBalance">
                {showNotificationMsg && (
                  <p className="notification-alert">
                    Please refresh to view the latest opportunities
                  </p>
                )}
                {notificationBell && (
                  <i className="fa-regular fa-bell fa-shake" onClick={checkNotification}></i>
                )}

                {!notificationBell && <i className="fa-regular fa-bell"></i>}
                <div className="announcement-phone-div">
                  <i className="fa-solid fa-bullhorn" onClick={openAnnouncement}></i>
                  {announcementDot && <span className="announcement-dot"></span>}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <p
                      style={{
                        backgroundColor: "#1AC888",
                        color: "#fff",
                        padding: "3px 5px",
                        borderRadius: "3px",
                      }}
                    >
                      ${userBalance && userBalance}
                    </p>
                    {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : ""}
                  </div>
                </div>
              </div>

              {isAnnouncementOpen && (
                <div className="announcements">
                  {announcements.length === 0 ? (
                    <i className="fa-solid fa-spinner"></i>
                  ) : (
                    <div>
                      {announcements.map((announcement) => (
                        <div className="announcement">
                          <i
                            class="fa-solid fa-xmark"
                            onClick={ changeNotificationStatus }
                          ></i>
                          <p>{announcement.message}</p>
                          <div className="announcementTime">
                            <p></p>
                            <small>
                              {Math.floor(
                                (new Date() - new Date(announcement.messageDate)) /
                                  (24 * 60 * 60 * 1000)
                              ) === 1
                                ? "1 day ago"
                                : `${Math.floor(
                                    (new Date() - new Date(announcement.messageDate)) /
                                      (24 * 60 * 60 * 1000)
                                  )} days ago`}
                            </small>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </SoftBox>

            <SoftBox color={light ? "white" : "inherit"}>
              <IconButton
                size="large"
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon className={light ? "text-white" : "text-dark"}>
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>

              {renderMenu()}
            </SoftBox>
          </SoftBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
