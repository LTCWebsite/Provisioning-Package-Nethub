import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { Cancel, CheckCircle } from "@material-ui/icons";
import { AxiosReq } from "../../../../../Components/Axios";
import Ebill from "./Ebill";
import Mservice from "./Model/Mservice";
import { Skeleton } from "@mui/material";
import Mmoney from "./Model/Mmoney";
import cookie from "js-cookie";
import Monomax from "./Model/Monomax";

function Application() {
  const [stop, setStop] = React.useState(false);
  const [mService, setMService] = React.useState("");
  const [mTopup, setMTopup] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const [count, setCount] = useState({ mService: 0 });
  const [cMmoney, setCMmoney] = useState(0);
  const [lMmoney, setLMmoney] = useState(true);
  const [load, setLoad] = useState({
    mService: true,
    mmoney: true,
    monomax: true,
  });
  const [open, setOpen] = useState({
    mService: false,
    mmoney: false,
    monomax: false,
  });

  React.useEffect(() => {
    setStop(false);
    setAlert(false);
    var phone = localStorage.getItem("ONE_PHONE");
    AxiosReq.get("MServices?msisdn=" + phone, {
      headers: { Authorization: "Bearer " + cookie.get("ONE_TOKEN") },
    })
      .then((res) => {
        if (res.status === 200) {
          setMService(res.data.isRegistered);
          AxiosReq.get("MTopupPlus?msisdn=" + phone, {
            headers: { Authorization: "Bearer " + cookie.get("ONE_TOKEN") },
          })
            .then((res) => {
              if (res.status === 200) {
                setMTopup(res.data.isRegistered);
                setTimeout(() => {
                  setStop(true);
                }, 100);
              }
            })
            .catch((err) => {
              setAlert(true);
              setStop(true);
            });
        }
        // console.log(res.data)
      })
      .catch((err) => {
        setAlert(true);
        setStop(true);
      });
  }, []);
  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          container
          className="link-box-pointer"
          onClick={() => setOpen({ ...open, mService: true })}
        >
          <Grid item xs={6}>
            <div>
              <b>M-Service:</b>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="right" style={{ paddingTop: 3 }}>
              {mService ? (
                <CheckCircle className="success" checked={mService} />
              ) : (
                <Cancel className="danger" checked={mService} />
              )}
            </div>
          </Grid>
          <Grid item xs={2} style={{ paddingTop: 3 }}>
            {load.mService ? (
              <Skeleton animation="wave" />
            ) : (
              <div
                className={
                  count.mService > 0
                    ? "text-right bage-success"
                    : "text-right bage-error"
                }
              >
                <u>{count?.mService}</u>
              </div>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} container className="link-box-dev">
          <Grid item xs={7}>
            <div>
              <b>M-Topup Plus:</b>
            </div>
          </Grid>
          <Grid item xs={5}>
            <div className="right">
              {mTopup ? (
                <CheckCircle className="success" checked={mTopup} />
              ) : (
                <Cancel className="danger" checked={mTopup} />
              )}
              &nbsp;&nbsp;&nbsp;
            </div>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          container
          className="link-box-pointer"
          onClick={() => setOpen({ ...open, mmoney: true })}
        >
          <Grid item xs={6}>
            <div>
              <b>M-money:</b>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="right" style={{ paddingTop: 3 }}>
              -&nbsp;&nbsp;&nbsp;
            </div>
          </Grid>
          <Grid item xs={2} className="right" style={{ paddingTop: 3 }}>
            {lMmoney ? (
              <Skeleton animation="wave" />
            ) : (
              <div
                className={
                  cMmoney > 0
                    ? "text-right bage-success"
                    : "text-right bage-error"
                }
              >
                <u>{cMmoney}</u>
              </div>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} container className="link-box-dev">
          <Grid item xs={7}>
            <div>
              <b>E-Bill:</b>
            </div>
          </Grid>
          <Grid item xs={5}>
            <div className="right">
              <Ebill />
              &nbsp;&nbsp;&nbsp;
            </div>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          container
          className="link-box-pointer"
          onClick={() => setOpen({ ...open, monomax: true })}
        >
          <Grid item xs={6}>
            <div>
              <b>MonoMax:</b>
            </div>
          </Grid>
          {/* <Grid item xs={4}>
                        <div className='right' style={{ paddingTop: 3 }}>-&nbsp;&nbsp;&nbsp;</div>
                    </Grid>
                    <Grid item xs={2} className="right" style={{ paddingTop: 3 }}>
                        {lMmoney ? <Skeleton animation="wave" /> : <div className={cMmoney > 0 ? 'text-right bage-success' : 'text-right bage-error'}><u>{cMmoney}</u></div>}
                    </Grid> */}
        </Grid>
      </Grid>

      <Mservice
        open={open.mService}
        cb={(e) => setOpen({ ...open, mService: e })}
        done={(e) => setLoad({ ...load, mService: e })}
        count={(e) => setCount({ ...count, mService: e })}
      />
      <Mmoney
        open={open.mmoney}
        cb={(e) => setOpen({ ...open, mmoney: e })}
        done={(e) => setLMmoney(e)}
        count={(e) => setCMmoney(e)}
      />
      <Monomax
        open={open.monomax}
        cb={(e) => setOpen({ ...open, monomax: e })}
        done={(e) => setLoad({ ...load, monomax: e })}
      />
    </>
  );
}

export default Application;
