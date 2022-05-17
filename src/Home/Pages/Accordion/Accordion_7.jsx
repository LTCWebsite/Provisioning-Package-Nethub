import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import {
  Redeem,
  InsertEmoticon,
  InsertLink,
  Close,
  RestartAlt,
  WarningAmber,
} from "@mui/icons-material";
import GetPhoneNumber from "../../../Pages/Components/GetPhoneNumber";
import Crypt from "../../../Pages/Components/Crypt";
import Axios from "../../../Pages/Components/Axios";
import Cookies from "js-cookie";
import moment from "moment";
import {
  Dialog,
  Grid,
  IconButton,
  Badge,
  Slide,
  Alert,
  Button,
} from "@mui/material";
import MyTable from "../../../Pages/MiniCRM/Table/Table";
import HappyCallDialog from "../../../Pages/MiniCRM/page/HappyCallDialog";
import Doing from "../../../Pages/Components/Doing";
import { AlertError, AlertSuccess } from "../../../Pages/Components/Toast";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Accordion_7() {
  const expanded = false;
  const [user, setUser] = React.useState("");
  const [open, setOpen] = React.useState({
    happy: false,
    reset: false,
    sp: false,
  });
  const [happy, setHappy] = React.useState({ st: "", data: [] });
  const [ph, setPh] = React.useState("");
  const [reason, setReason] = React.useState({ text: "", alert: false });
  React.useEffect(() => {
    var phone = GetPhoneNumber();
    setPh(phone);

    setHappy({ st: "loading", data: [] });
    Axios.get("HappyCallHappyCall?msisdn=" + phone, {
      headers: { Authorization: "Bearer " + Cookies.get("one_session") },
    })
      .then((res) => {
        if (res.status === 200) {
          var num = 0;
          var update = res.data.map((row) => {
            row.id_idx = num + 1;
            row.date_buy = moment(row.recordDate).format("DD-MM-YYYY HH:mm:ss");
            num = num + 1;
            return row;
          });
          setHappy({ st: num, data: update });
        }
      })
      .catch((err) => {
        setHappy({ st: "No", data: [] });
      });

    setUser(
      Crypt({
        type: "decrypt",
        value: localStorage.getItem("one_info"),
      }).username?.split("@")[0]
    );
  }, []);
  const LinktoCallRedeem = () => {
    window.open(
      `http://10.30.6.37:2424/Default.aspx?user=Administrator&password=qwerty123456&EmpID=${user}&ani=${GetPhoneNumber()}`,
      "_blank"
    );
  };
  const columns = [
    { title: "No", field: "id_idx", maxWidth: 50 },
    { title: "MSISDN", field: "msisdn" },
    { title: "ເວລາຢືມ", field: "date_buy", minWidth: 200 },
    { title: "UserID", field: "userId" },
    // { title: 'Chanel', field: 'chanel' },
    { title: "SrvType", field: "srvtype" },
    {
      title: "ເວລາເລີ່ມ",
      field: "startTime",
      minWidth: 200,
      render: (row) => moment(row.startTime).format("DD-MM-YYYY HH:mm:ss"),
    },
    {
      title: "ເວລາສິ້ນສຸດ",
      field: "stopTime",
      minWidth: 200,
      render: (row) => moment(row.stopTime).format("DD-MM-YYYY HH:mm:ss"),
    },
    {
      title: "ຈຳນວນເງິນ",
      field: "balance",
      type: "numeric",
      render: (row) =>
        row.balance > 0 ? row.balance.toLocaleString() : row.balance,
    },
    { title: "ສະຖານະ", field: "resultDesc" },
  ];



  const SaveReset = () => {
    if (reason.text === "") {
      setReason({ ...reason, alert: true });
    } else {
      var phone = GetPhoneNumber();
      Axios.post(
        "ResetSim?msisdn=" + phone,
        {},
        { headers: { Authorization: "Bearer " + Cookies.get("one_session") } }
      ).then((res) => {
        if (res.status === 200) {
          var respone =
            res.data["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][
            "SND_CANCELCResponse"
            ]["Result"];
          // console.log(respone)
          if (respone.ResultCode === "0") {
            AlertSuccess(respone.ResultDesc);
          } else {
            AlertError(respone.ResultDesc);
          }
          setOpen({ ...open, reset: false });
          setReason({ ...reason, text: "" });
          Doing({
            msisdn: Crypt({
              type: "decrypt",
              value: localStorage.getItem("input-phone"),
            }).text,
            username: Crypt({
              type: "decrypt",
              value: localStorage.getItem("one_info"),
            }).username,
            detail: "reset sim ",
            info: reason.text,
            resualt: respone.ResultDesc,
          });
        }
      });
    }
  };

  return (
    <div className="box-accordion">
      <Accordion
        expanded={expanded === "panel4"}
        onClick={() => setOpen({ ...open, reset: true })}
      >
        <AccordionSummary>
          <Typography sx={{ width: "100%", flexShrink: 0 }}>
            <RestartAlt className="n-icon" />
            <u className="nav-text">Reset Sim</u>
          </Typography>
        </AccordionSummary>
      </Accordion>

      <Accordion
        expanded={expanded === "panel4"}
        onClick={() => {
          setOpen({ ...open, happy: true });
          Doing({
            msisdn: Crypt({
              type: "decrypt",
              value: localStorage.getItem("input-phone"),
            }).text,
            username: Crypt({
              type: "decrypt",
              value: localStorage.getItem("one_info"),
            }).username,
            detail: "check happy call",
            resualt: "Operation successed.",
          });
        }}
      >
        <AccordionSummary>
          <Typography sx={{ width: "100%", flexShrink: 0 }}>
            <InsertEmoticon className="n-icon" />
            <Badge
              badgeContent={
                happy.st >= 10 ? happy.st + "+" : happy.st.toString()
              }
              color={
                happy.st === ""
                  ? "default"
                  : happy.st === "loading"
                    ? "info"
                    : happy.st <= 0
                      ? "secondary"
                      : "primary"
              }
            >
              <u className="nav-text">Happy Call &nbsp;</u>
            </Badge>
          </Typography>
        </AccordionSummary>
      </Accordion>

      <Accordion expanded={expanded === "panel4"} onClick={LinktoCallRedeem}>
        <AccordionSummary>
          <Typography sx={{ width: "100%", flexShrink: 0 }}>
            <Redeem className="n-icon" />
            <u className="nav-text">
              Call Redeem{" "}
              <b className="nav-link">
                <InsertLink className="icon" /> <u>Link</u>
              </b>
            </u>
          </Typography>
        </AccordionSummary>
      </Accordion>

      <Dialog
        maxWidth="xl"
        open={open.happy}
        onClose={() => setOpen({ ...open, happy: false })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
      >
        <Grid container>
          <Grid item container xs={12}>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <div className="center">
                <h1>Happy Call</h1>
              </div>
            </Grid>
            <Grid item xs={1}>
              <div className="right">
                <IconButton
                  aria-label="delete"
                  onClick={() => setOpen({ ...open, happy: false })}
                >
                  <Close />
                </IconButton>
              </div>
            </Grid>
            <Grid item md={2} lg={3} xl={4}></Grid>
            <Grid item xs={12} md={8} lg={6} xl={4}>
              <Alert
                variant="outlined"
                severity="info"
                style={{ marginTop: 10 }}
              >
                ກໍລະນີທີ່ຕ້ອງການສະແດງຂໍ້ມູນຫຼາຍກ່ວາ 10 ລາຍການ ໃຫ້ຄຼິກໄປທີ່ More
                Detail ຢູ່ດ້ານລຸ່ມ
              </Alert>
            </Grid>

            <Grid item xs={12} className="center">
              <form
                target="_blank"
                action="http://172.28.24.20/ltc/users/login"
                id="UserLoginForm"
                method="post"
                accept-charset="utf-8"
              >
                <div style={{ display: "none" }}>
                  <input type="hidden" name="_method" value="POST" />
                </div>
                <div
                  className="input text required"
                  style={{ display: "none" }}
                >
                  <label for="UserUsername">Username</label>
                  <input
                    name="data[User][username]"
                    value="boualy"
                    size="15"
                    className="smallinput"
                    style={{ textAlign: "center" }}
                    maxlength="100"
                    type="hidden"
                    id="UserUsername"
                  />
                </div>
                <div
                  className="input password required"
                  style={{ display: "none" }}
                >
                  <label for="UserPassword">Password</label>
                  <input
                    name="data[User][password]"
                    value="boualy@123"
                    size="15"
                    class="smallinput"
                    style={{ textAlign: "center" }}
                    type="hidden"
                    id="UserPassword"
                  />
                </div>
                <div className="submit" style={{ marginTop: 10 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    className="btn-happy-call"
                  >
                    ເບິ່ງຂໍ້ມູນ ແລະ ແກ້ໄຂ ເບື້ອງ Happy Call ກົດທີນີ່ !!{" "}
                  </Button>
                </div>
              </form>
            </Grid>

            <Grid item xs={12}>
              <MyTable
                tTitle={"happy Call"}
                tData={happy.data}
                tColumns={columns}
              />
            </Grid>
            <Grid item xs={12} className="more-me">
              <HappyCallDialog />
            </Grid>
          </Grid>
        </Grid>
      </Dialog>

      <Dialog
        open={open.reset}
        onClose={() => setOpen({ ...open, reset: false })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
      >
        <Grid container>
          <Grid
            item
            container
            xs={12}
            style={{ paddingLeft: 50, paddingRight: 50 }}
          >
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <div className="center">
                <h1>ຢືນຢັນການນຳໃຊ້</h1>
              </div>
            </Grid>
            <Grid item xs={1}>
              <div className="right">
                <IconButton
                  aria-label="delete"
                  onClick={() => setOpen({ ...open, reset: false })}
                >
                  <Close />
                </IconButton>
              </div>
            </Grid>
            <Grid item md={2} lg={3} xl={4}></Grid>
            <Grid item xs={12} className="center">
              <div className="center">
                <WarningAmber style={{ fontSize: 150, color: "#E74A3B" }} />
              </div>
              <h2>ຕ້ອງການ Reset Sim ( {ph} ) ?</h2>
              <textarea
                style={{ width: "90%", padding: "5px 10px", fontSize: 16 }}
                placeholder="ເຫດຜົນ"
                onChange={(e) => {
                  setReason({
                    ...reason,
                    text: e.target.value,
                    alert: e.target.value.length > 0 ? false : true,
                  });
                }}
              ></textarea>
              {reason.alert && (
                <div className="red left" style={{ marginLeft: 15 }}>
                  ກະລຸນາປ້ອນເຫດຜົນ
                </div>
              )}
            </Grid>
            <Grid
              item
              container
              xs={12}
              style={{ paddingBottom: 30, marginTop: 20 }}
            >
              <Grid item xs={6}>
                <div className="center">
                  <Button
                    color="primary"
                    onClick={() => setOpen({ ...open, reset: false })}
                  >
                    No
                  </Button>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={SaveReset}
                  >
                    Yes
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>


    </div>
  );
}
