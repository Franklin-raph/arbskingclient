import "./Style.css";
import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Soft UI Dashboard React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Soft UI Dashboard React routes
import routes from "./routes";
// import { ProtectedRoute } from "./ProtectedRoute";

// Soft UI Dashboard React contexts
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brand from "assets/images/logo-ct.png";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import ReferalSignUp from "layouts/authentication/sign-up-referal";
import Dashboard from "layouts/dashboard";
import Overview from "layouts/profile";
import Bookmakers from "layouts/bookmakers";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import PageNotFound from "layouts/pagenotfound";
import ForgotPassword from "layouts/authentication/forgotpassword";
import PasswordResetPage from "layouts/authentication/password-reset-page";
import EmailConfirmPage from "layouts/authentication/confirm-email";
import Howtouse from "layouts/howtouse";

export default function App() {
  return (
    <ThemeProvider theme={themeRTL}>
      <Routes>
        <Route path="/dashboard/authentication/sign-in" element={<SignIn />} />
        <Route path="/dashboard/authentication/sign-up" element={<SignUp />} />
        <Route
          path="/dashboard/authentication/sign-up/register-refered/:id"
          element={<ReferalSignUp />}
        />
        <Route path="/dashboard/forgotpassword" element={<ForgotPassword />} />
        <Route path="/dashboard/api/reset-password/:id/:token" element={<PasswordResetPage />} />
        <Route path="/dashboard/api/email-confirmation/:id/:token" element={<EmailConfirmPage />} />
        <Route path="/dashboard/payments" element={<Billing brand={brand} routes={routes} />} />
        <Route path="/" element={<Dashboard brand={brand} routes={routes} />} />
        <Route path="/dashboard" element={<Dashboard brand={brand} routes={routes} />} />
        <Route path="/dashboard/howtouse" element={<Howtouse brand={brand} routes={routes} />} />
        <Route path="/dashboard/profile" element={<Overview brand={brand} routes={routes} />} />
        <Route
          path="/dashboard/bookmakers"
          element={<Bookmakers brand={brand} routes={routes} />}
        />
        <Route
          path="/dashboard/arbitragecalculator"
          element={<RTL brand={brand} routes={routes} />}
        />
        <Route path="*" element={<PageNotFound routes={routes} brand={brand}/> } />
      </Routes>
    </ThemeProvider>
  );
}
