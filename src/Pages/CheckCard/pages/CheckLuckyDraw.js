import React from "react";
import { Grid, Button, Card, CardContent,CircularProgress } from "@material-ui/core";
import { Search, Refresh } from "@material-ui/icons";
import LoadingLottie from "../../Components/LoadingLottie";
import Axios from "../../Components/Axios";
import moment from "moment";
import cookie from "js-cookie";
import Crypt from "../../Components/Crypt";
import Doing from "../../Components/Doing";
import { AlertSuccess, AlertWarning } from "./../../Components/Toast";
import { LoadingCheckSerial } from '../../../Loading/TableLoading'

function CheckLuckyDraw() {
  const [data, setData] = React.useState([]);
  const [serial, setSerial] = React.useState(null);
  const [stop, setStop] = React.useState(null);
  const [rerun, setRerun] = React.useState(null);
  const [isLoading,setIsLoading] = React.useState(false)
  const SearchSerial = () => {
    setStop(true);
    setData([]);
    Axios.post(
      "CheckLuckyDraw?serialNumber=" + serial,
      {},
      { headers: { Authorization: "Bearer " + cookie.get("one_session") } }
    )
      .then((res) => {
        if (res.status === 200) {
          setTimeout(() => {
            setData(res.data);
            // console.log("LUCKY DRAW", res.data);
            setStop(false);
            Doing({
              msisdn: Crypt({
                type: "decrypt",
                value: localStorage.getItem("input-phone"),
              }).text,
              username: Crypt({
                type: "decrypt",
                value: localStorage.getItem("one_info"),
              }).username,
              detail: "check lucky darw",
              resualt: "Operation successed.",
            });
          }, 500);
        }
      })
      .catch((err) => {
        setStop(false);
        Doing({
          msisdn: Crypt({
            type: "decrypt",
            value: localStorage.getItem("input-phone"),
          }).text,
          username: Crypt({
            type: "decrypt",
            value: localStorage.getItem("one_info"),
          }).username,
          detail: "check lucky draw",
          resualt: "error",
        });
      });
  };

  const RerunLuckyDraw = () => {
      setIsLoading(true)
    Axios.post(
      "RerunLuckyDraw?serialNumber=" + serial,
      {},
      { headers: { Authorization: "Bearer " + cookie.get("one_session") } }
    )
      .then((res) => {
        if (res.status === 200) {
          if (res?.data?.resultCode == "20") {
            setTimeout(() => {
              AlertSuccess("SUCCESS");
              setRerun(res?.data?.resultDesc);
              Doing({
                msisdn: Crypt({
                  type: "decrypt",
                  value: localStorage.getItem("input-phone"),
                }).text,
                username: Crypt({
                  type: "decrypt",
                  value: localStorage.getItem("one_info"),
                }).username,
                detail: "rerun lucky darw",
                resualt: "Operation successed.",
              });
              setIsLoading(false)
            }, 500);
          } else {
            AlertWarning(res?.data?.resultDesc);
            setRerun(res?.data?.resultDesc);
            Doing({
              msisdn: Crypt({
                type: "decrypt",
                value: localStorage.getItem("input-phone"),
              }).text,
              username: Crypt({
                type: "decrypt",
                value: localStorage.getItem("one_info"),
              }).username,
              detail: "rerun lucky darw",
              resualt: "error",
            });
            setIsLoading(false)
          }
        }
      })
      .catch((err) => {
        // setRerun(err)
        setIsLoading(false)
        Doing({
          msisdn: Crypt({
            type: "decrypt",
            value: localStorage.getItem("input-phone"),
          }).text,
          username: Crypt({
            type: "decrypt",
            value: localStorage.getItem("one_info"),
          }).username,
          detail: "rerun lucky darw",
          resualt: "error",
        });
      });
  };
  const [err, setErr] = React.useState(null);
  const changeValue = (e) => {
    if (e.length < 15) {
      e.length === 0 ? setErr(null) : setErr(false);
      setSerial(e);
    } else {
      setErr(true);
      setSerial(e);
    }
  };
  return (
    <>
      <Grid container>
        <Grid container item xs={12}>
          <Grid item md={3}></Grid>
          <Grid item container md={6} xs={12}>
            <Grid item xs={8}>
              <input
                maxLength="15"
                className="input"
                value={serial}
                placeholder="Serial Number ..."
                onChange={(e) => {
                  changeValue(e.target.value);
                }}
              />
              {err === false ? (
                <u className="red">Pin number must be 15 characters</u>
              ) : null}
            </Grid>
            <Grid item xs={2} style={{ paddingLeft: 35, paddingBottom: 20 }}>
              <Button
                fullWidth
                variant="contained"
                disabled={!err}
                className="btn-primary"
                onClick={SearchSerial}
              >
                <Search />
              </Button>
            </Grid>
            <Grid item xs={2} style={{ paddingLeft: 10, paddingBottom: 20 }}>
              <Button
              style={{maxHeight:36}}
                type="submit"
                fullWidth
                variant="contained"
                color="danger"
                className="btn-danger"
                disabled={isLoading}
                onClick={RerunLuckyDraw}
              >
                {isLoading ? (
                  <>
                    <CircularProgress style={{height:"100%"}} />Rerun
                  </>
                ) : (
                  <><Refresh />Rerun</>
                )}
              </Button>
              {/* <Button
                fullWidth
                variant="contained"
                disabled={!err}
                className="btn-danger"
                onClick={RerunLuckyDraw}
              >
                <Refresh />
                Rerun
              </Button> */}
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent className="content-1">
                  {stop === null && (
                    <>
                      <Grid item xs={12} style={{ paddingBottom: 50 }}>
                        <h1 className="dialog-center">ກະລຸນາກົດຄົ້ນຫາ</h1>
                      </Grid>
                    </>
                  )}
                  {stop === true && <LoadingCheckSerial />}
                  {stop === false && (
                    <>
                      <Grid container>
                        <Grid item xs={12}>
                          <h2 className="center">
                            {data ? (
                              data.pin === null ? (
                                <label className="error">
                                  Check Lucky Draw
                                </label>
                              ) : (
                                "Check Lucky Draw"
                              )
                            ) : (
                              "-"
                            )}
                          </h2>
                        </Grid>
                        {data.sts !== null &&
                        data.sts === "20::Operater successed." ? (
                          <>
                            <Grid item container xs={12}>
                              <Grid item xs={6}>
                                <div>ເລກທີ (b/S) :</div>
                              </Grid>
                              <Grid item xs={6}>
                                <div>{data.serial ?? "-"}</div>
                              </Grid>
                              <Grid item xs={6}>
                                <div>ລະຫັດ Pin :</div>
                              </Grid>
                              <Grid item xs={6}>
                                <div>{data.pin ?? "-"}</div>
                              </Grid>
                              <Grid item xs={6}>
                                <div>ປະເພດເບີ :</div>
                              </Grid>
                              <Grid item xs={6}>
                                <div>{data.type ?? "-"}</div>
                              </Grid>
                              <Grid item xs={6}>
                                <div>ເບີ Dummy :</div>
                              </Grid>
                              <Grid item xs={6}>
                                <div>{data.postpaid ?? "-"}</div>
                              </Grid>
                              <Grid item xs={6}>
                                <div>ເບີທີ່ຖືກເຕີມ :</div>
                              </Grid>
                              <Grid item xs={6}>
                                <div>{data.prepaid ?? "-"}</div>
                              </Grid>
                              <Grid item xs={6}>
                                <div>ເວລາທີຖືກເຕີມ :</div>
                              </Grid>
                              <Grid item xs={6}>
                                <div>
                                  {data.recordDate && data.recordDate
                                    ? moment(data.recordDate).format(
                                        "DD-MM-YYYY HH:mm:ss"
                                      )
                                    : "-"}
                                </div>
                              </Grid>
                              <Grid item xs={6}>
                                <div>ເງີນຟຼີ :</div>
                              </Grid>
                              <Grid item xs={6}>
                                <div>
                                  {data.amount && data.amount > "0"
                                    ? parseInt(data.amount).toLocaleString()
                                    : "-"}
                                </div>
                              </Grid>
                              <Grid item xs={6}>
                                <div>ສະຖານະຂອງບັດ :</div>
                              </Grid>
                              <Grid item xs={6}>
                                <div>
                                  {data.sts !== null ? (
                                    data.sts === "20::Operater successed." ? (
                                      <label className="active">
                                        ໄດ້ຮັບລາງວັນແລ້ວ
                                      </label>
                                    ) : (
                                      <label className="dis_active">
                                        {data.resultDesc}
                                      </label>
                                    )
                                  ) : (
                                    "-"
                                  )}
                                </div>
                              </Grid>
                            </Grid>
                          </>
                        ) : (
                          <Grid item xs={12}>
                            <h2 className="center">
                              <u>ບໍ່ມີຂໍ້ມູນ</u>
                            </h2>
                            {/* <h2 className="center"><u>{rerun}</u></h2> */}
                          </Grid>
                        )}
                      </Grid>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default CheckLuckyDraw;
