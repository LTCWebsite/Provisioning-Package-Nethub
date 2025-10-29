import { v4 as uuidv4 } from "uuid";
import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  Grid,
  Paper,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { AxiosMonomax } from "../../../../../../Components/Axios";
import moment from "moment";
import { toast_error, toast_success } from "../../../../../../Components/Toast";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Monomax({ open, cb, done }) {
  const [stop, setStop] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setStop(false);
    var phone = localStorage.getItem("ONE_PHONE");
    AxiosMonomax.get("subscriptions/" + phone)
      .then((res) => {
        if (res.status === 200) {
          setStop(true);
          done(false);
          setData(res?.data?.data);
        }
      })
      .catch((err) => {
        setStop(true);
      });
  }, []);

  const _handleResendPassword = async () => {
    setLoading(true);
    AxiosMonomax.post("/member/credentials", {
      msisdn: localStorage.getItem("ONE_PHONE"),
    })
      .then(async (res) => {
        if (res.status === 200) {
          console.log("first");
          toast_success({ text: "Resend password successfully!" });
        }
      })
      .catch((err) => {
        toast_error({
          text:
            "Failed to resend password! " + +err?.response?.data?.message ||
            err.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const _handleCancelPackage = async () => {
    setLoading(true);
    AxiosMonomax.post("unsubscriptions", {
      action: "terminate",
      msisdn: localStorage.getItem("ONE_PHONE"),
      network_type: "prepaid",
      trans_id: "O_" + uuidv4(),
    })
      .then(async (res) => {
        if (res.status === 200) {
          console.log("first");
          toast_success({ text: "Package cancelled successfully!" });
        }
      })
      .catch((err) => {
        toast_error({
          text:
            "Cancel package failed: " + err?.response?.data?.message ||
            err.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const _handleRenewPackage = async () => {
    setLoading(true);
    AxiosMonomax.post("resubscriptions", {
      msisdn: localStorage.getItem("ONE_PHONE"),
    })
      .then(async (res) => {
        if (res.status === 200) {
          toast_success({ text: "Renew successful: "+ res?.data?.message });
        }
      })
      .catch((err) => {
        toast_error({
          text:
            "Cancel package failed: " + err?.response?.data?.message ||
            err.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Dialog
        maxWidth="xl"
        fullWidth={true}
        open={open}
        onClose={() => cb(!open)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
      >
        <Grid container>
          <Grid item container xs={12}>
            <Grid item xs={1}></Grid>
            <Grid
              item
              container
              xs={10}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Grid item xs={6}>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <h1>MonoMax</h1>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ display: "flex", marginLeft: "10px" }}>
                  <Button
                    disabled={loading}
                    variant="contained"
                    onClick={_handleResendPassword}
                  >
                    {loading ? "Loading..." : "Resend Password"}
                  </Button>
                  <div style={{ marginLeft: 20 }}></div>
                  <Button
                    disabled={loading}
                    variant="contained"
                    className="btn-success"
                    onClick={_handleRenewPackage}
                  >
                    {loading ? "Loading..." : "Renew"}
                  </Button>
                  <div style={{ marginLeft: 20 }}></div>
                  <Button
                    disabled={loading}
                    variant="contained"
                    className="btn-danger"
                    onClick={_handleCancelPackage}
                  >
                    {loading ? "Loading..." : "Cancel Package"}
                  </Button>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <div className="right">
                <Close className="icon" onClick={() => cb(!open)} />
              </div>
            </Grid>
            <Grid item xs={12} style={{ marginBottom: 0 }}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>No</TableCell>
                      <TableCell align="left">Datetime</TableCell>
                      <TableCell align="left">Msisdn</TableCell>
                      <TableCell align="left">Channel</TableCell>
                      <TableCell align="left">PackageID</TableCell>
                      <TableCell align="left">Price</TableCell>
                      <TableCell align="left">Start Date</TableCell>
                      <TableCell align="left">End Date</TableCell>
                      <TableCell align="left">Next billing Date</TableCell>
                      <TableCell align="left">Res Code</TableCell>
                      <TableCell align="left">Res Desc</TableCell>
                      <TableCell align="left">CBS Code</TableCell>
                      <TableCell align="left">CBS Desc</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.map((row, index) => (
                      <TableRow>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell align="left">
                          {moment(row?.created_at)
                            .utc()
                            .format("YYYY-MM-DD HH:mm:ss")}
                        </TableCell>
                        <TableCell align="left">
                          {row?.members?.msisdn}
                        </TableCell>
                        <TableCell align="left">{row?.channel}</TableCell>
                        <TableCell align="left">{row?.package_id}</TableCell>
                        <TableCell align="left">
                          {row?.price?.toLocaleString()}
                        </TableCell>
                        <TableCell align="left">
                          {moment(row?.start_date)
                            .utc()
                            .format("YYYY-MM-DD HH:mm:ss")}
                        </TableCell>
                        <TableCell align="left">
                          {moment(row?.end_date)
                            .utc()
                            .format("YYYY-MM-DD HH:mm:ss")}
                        </TableCell>
                        <TableCell align="left">
                          {moment(row?.next_billing_cycle_date)
                            .utc()
                            .format("YYYY-MM-DD HH:mm:ss")}
                        </TableCell>
                        <TableCell align="left">{row?.res_code}</TableCell>
                        <TableCell align="left">{row?.res_desc}</TableCell>
                        <TableCell align="left">{row?.cbs_code}</TableCell>
                        <TableCell align="left">{row?.cbs_desc}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}

export default Monomax;
