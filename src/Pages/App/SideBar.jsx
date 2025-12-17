import {
  Cottage,
  CreditCard,
  CreditScore,
  DisplaySettings,
  Group,
  HomeWork,
  Logout,
  PersonOutline,
  ScreenshotMonitor,
  RedeemSharp,
  Key,
  Dashboard
} from "@mui/icons-material";
import React from "react";
import logo from "../../Image/logo-2.png";
import { Scrollbars } from "react-custom-scrollbars";
import { useHistory, useLocation } from "react-router-dom";
import FadeIn from "react-fade-in";
import { toast_error } from "../../Components/Toast";
import Auth from "../../Components/Auth";

function SideBar({ height }) {
  const history = useHistory();
  const location = useLocation();
  const [effect, setEffect] = React.useState({
    home: true,
    crm: true,
    card: true,
    user: true,
    ais: true,
    reset: true,
    cbs: true,
  });
  const ChangeRoute = (e) => {
    if (e === "/app") {
      setEffect({ ...effect, home: false });
      setTimeout(() => {
        setEffect({ ...effect, home: true });
      }, 500);
      history.push(e);
    } else if (e === "/app/crm") {
      CheckNumber(e);
    } else if (e === "/app/card") {
      setEffect({ ...effect, card: false });
      setTimeout(() => {
        setEffect({ ...effect, card: true });
      }, 500);
      history.push(e);
    } else if (e === "/app/user") {
      setEffect({ ...effect, user: false });
      setTimeout(() => {
        setEffect({ ...effect, user: true });
      }, 500);
      history.push(e);
    } else if (e === "/app/ais/redeem") {
      setEffect({ ...effect, ais: false });
      setTimeout(() => {
        setEffect({ ...effect, ais: true });
      }, 500);
      history.push(e);
    } else if (e === "/app/cbs/customerinfo") {
      setEffect({ ...effect, cbs: false });
      setTimeout(() => {
        setEffect({ ...effect, cbs: true });
      }, 500);
      history.push(e);
    }
    else if (e === "/app/resetpassword") {
      setEffect({ ...effect, reset: false });
      setTimeout(() => {
        setEffect({ ...effect, reset: true });
      }, 500);
      history.push(e);
    }
  };
  const CheckNumber = (e) => {
    try {
      let phone = localStorage.getItem("ONE_PHONE");
      if (phone.length > 0) {
        setEffect({ ...effect, crm: false });
        setTimeout(() => {
          setEffect({ ...effect, crm: true });
        }, 500);
        history.push(e);
      }
    } catch (error) {
      toast_error({ text: "ກະລຸນາປ້ອນເບີ !!" });
    }
  };

  const expired = localStorage.getItem('PASSWORDEXPIRED');

  return (
    <div
      style={{
        flexDirection: "column",
        width: 130,
        backgroundColor: "#fff",
        textAlign: "center",
        overflowY: "scroll",
      }}
    >
      <Scrollbars style={{ height: height - 40 }}>
        <img src={logo} className="logo-bar" alt="logo" />

        {expired === 'is not Expired' && (
          <>
            <div
              className={location.pathname === "/app" ? "bar bar-active" : "bar"}
              onClick={() => ChangeRoute("/app")}
            >
              <FadeIn visible={effect.home}>
                {effect.home && location.pathname === "/app" ? (
                  <HomeWork className="bar-icon" />
                ) : (
                  <Cottage color="primary" className="bar-icon" />
                )}
                <div>HOME</div>
              </FadeIn>
            </div>
            <div
              className={
                location.pathname === "/app/crm" ? "bar bar-active" : "bar"
              }
              onClick={() => ChangeRoute("/app/crm")}
            >
              <FadeIn visible={effect.crm}>
                {effect.crm && location.pathname === "/app/crm" ? (
                  <ScreenshotMonitor className="bar-icon" />
                ) : (
                  <DisplaySettings color="primary" className="bar-icon" />
                )}
                <div>CRM</div>
              </FadeIn>
            </div>
            <div
              className={
                location.pathname === "/app/card" ? "bar bar-active" : "bar"
              }
              onClick={() => ChangeRoute("/app/card")}
            >
              <FadeIn visible={effect.card}>
                {effect.card && location.pathname === "/app/card" ? (
                  <CreditScore className="bar-icon" />
                ) : (
                  <CreditCard color="primary" className="bar-icon" />
                )}
                <div>CARD</div>
              </FadeIn>
            </div>
            <div
              className={
                location.pathname === "/app/user" ? "bar bar-active" : "bar"
              }
              onClick={() => ChangeRoute("/app/user")}
            >
              <FadeIn visible={effect.user}>
                {effect.user && location.pathname === "/app/user" ? (
                  <Group className="bar-icon" />
                ) : (
                  <PersonOutline color="primary" className="bar-icon" />
                )}
                <div>USER</div>
              </FadeIn>
            </div>
            <div
              className={
                location.pathname === "/app/ais/redeem" ? "bar bar-active" : "bar"
              }
              onClick={() => ChangeRoute("/app/ais/redeem")}
            >
              <FadeIn visible={effect.ais}>
                {effect.ais && location.pathname === "/app/ais/redeem" ? (
                  <RedeemSharp className="bar-icon" />
                ) : (
                  <RedeemSharp color="primary" className="bar-icon" />
                )}
                <div>AIS Redeem</div>
              </FadeIn>
            </div>
            <div
              className={
                location.pathname === "/app/cbs/customerinfo" ? "bar bar-active" : "bar"
              }
              onClick={() => ChangeRoute("/app/cbs/customerinfo")}
            >
              <FadeIn visible={effect.cbs}>
                {effect.cbs && location.pathname === "/app/cbs/customerinfo" ? (
                  <Dashboard className="bar-icon" />
                ) : (
                  <Dashboard color="primary" className="bar-icon" />
                )}
                <div>CBS</div>
              </FadeIn>
            </div>
            <div
              className={
                location.pathname === "/app/resetpassword" ? "bar bar-active" : "bar"
              }
              onClick={() => ChangeRoute("/app/resetpassword")}
            >
              <FadeIn visible={effect.reset}>
                {effect.reset && location.pathname === "/app/resetpassword" ? (
                  <Key className="bar-icon" />
                ) : (
                  <Key color="primary" className="bar-icon" />
                )}
                <div>Reset Password</div>
              </FadeIn>
            </div>
            {/* thar me tab mai hai yut sai nai ni der */}
          </>
        )}



        <div
          className={
            location.pathname === "/app/logout" ? "bar bar-active" : "bar"
          }
          onClick={() =>
            Auth.logout(() => {
              history.push("/login");
            })
          }
        >
          <FadeIn visible={effect.user}>
            {effect.user && location.pathname === "/app/user" ? (
              <Logout className="bar-icon" />
            ) : (
              <Logout color="primary" className="bar-icon" />
            )}
            <div>LOGOUT</div>
          </FadeIn>
        </div>
      </Scrollbars>
    </div>
  );
}

export default SideBar;
