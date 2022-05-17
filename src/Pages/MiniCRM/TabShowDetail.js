import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import GetPhoneNumber from "../Components/GetPhoneNumber";
import MyRouter from "./Router";
import { useHistory } from "react-router-dom";
import Axios from "../Components/Axios";
import cookie from "js-cookie";
import Crypt from "../Components/Crypt";

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    marginTop: 10,
    backgroundColor: theme.palette.background.paper,
  },
}));

// function BageAmount() {
//     return (
//         <Badge badgeContent={4} color="secondary">
//             <div style={{ marginRight: 8 }}>M-Topup</div>
//         </Badge>
//     )
// }

export default function TabShowDetail() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  const [st, setST] = React.useState(null);
  const [user, setUser] = React.useState(null);

  ////////////////////    CHeck ocs or bss
  React.useEffect(() => {
    var phone = GetPhoneNumber();
    Axios.get("CheckStatusSIM?msisdn=" + phone, {
      headers: { Authorization: "Bearer " + cookie.get("one_session") },
    })
      .then((res) => {
        if (res.status === 200) {
          setST("OCS");
        } else {
          setST("BSS");
        }
      })
      .catch((err) => {
        setST("BSS");
      });
  }, []);

  React.useEffect(() => {
    try {
      setUser(
        Crypt({
          type: "decrypt",
          value: localStorage.getItem("one_info"),
        }).username?.split("@")[0]
      );
    } catch (err) { }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      history.push("/app/oneScreen/package");
    } else if (newValue === 1) {
      history.push("/app/oneScreen/packagehistory");
    } else if (newValue === 2) {
      history.push("/app/oneScreen/call");
    } else if (newValue === 3) {
      if (st === "OCS") {
        history.push("/app/oneScreen/ocs");
      } else {
        history.push("/app/oneScreen/bss");
      }
    } else if (newValue === 4) {
      history.push("/app/oneScreen/mservice");
    } else if (newValue === 5) {
      history.push("/app/oneScreen/mmoney");
    } else if (newValue === 6) {
      history.push("/app/oneScreen/BorrowAndDeduct");
    } else if (newValue === 7) {
      history.push("/app/oneScreen/topup");
    } else if (newValue === 8) {
      history.push("/app/oneScreen/topupbanking");
    } else if (newValue === 9) {
      history.push("/app/oneScreen/smsbanking");
    }
    // else if (newValue === 10) {
    //   history.push("/app/oneScreen/game");
    // }
    else if (newValue === 10) {
      history.push("/app/oneScreen/gameunsubscribe");
    } else if (newValue === 11) {
      history.push("/app/oneScreen/wifi");
    } else if (newValue === 12) {
      history.push("/app/oneScreen/hlr");
    } else if (newValue === 13) {
      history.push("/app/oneScreen/happycall");
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          style={{ backgroundColor: "#5a5c69" }}
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          className="colorText"
        >
          <Tab label="ດາຕ້າແພັກເກັດ" {...a11yProps(0)} />
          <Tab label="ປະຫວັດການຊື້ແພັກເກັດ" {...a11yProps(1)} />
          <Tab label="ປະຫວັດການໂທ" {...a11yProps(2)} />
          {st === "OCS" ? (
            <Tab label="OCS" {...a11yProps(3)} />
          ) : (
            <Tab label="BSS" {...a11yProps(3)} />
          )}
          <Tab label="M-Service" {...a11yProps(4)} />
          <Tab label="M-Money" {...a11yProps(5)} />
          <Tab label="ຢືມ ແລະ ຕັດເງິນ ຟ້າດາວ" {...a11yProps(6)} />
          <Tab label="Topup and M-Topup" {...a11yProps(7)} />
          <Tab label="Topup Banking" {...a11yProps(8)} />
          <Tab label="Sms Banking" {...a11yProps(9)} />
          {/* <Tab label="ເກມ Subscribe" {...a11yProps(10)} /> */}
          <Tab label="ເກມ Unsubscribe" {...a11yProps(10)} />
          <Tab label="LTC Wifi" {...a11yProps(11)} />
          <Tab label="HLR" {...a11yProps(12)} />
          {/* <Tab label="Payment" {...a11yProps(11)} /> */}
          <Tab label="Happy Call" {...a11yProps(13)} />
          <Tab
            label="Call Redeem"
            {...a11yProps(14)}
            target="_blank"
            href={`http://10.30.6.37:2424/Default.aspx?user=Administrator&password=qwerty123456&EmpID=${user}&ani=${GetPhoneNumber()}`}
          />
        </Tabs>
      </AppBar>

      <div
        style={{
          padding: 7,
          paddingBottom: 20,
          paddingTop: 20,
          backgroundColor: "white",
          marginTop: 10,
        }}
      >
        {/* Router */}
        <MyRouter />
      </div>
    </div>
  );
}
