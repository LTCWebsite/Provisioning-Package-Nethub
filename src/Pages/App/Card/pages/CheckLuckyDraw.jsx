import React from "react";
import {
  Grid,
  Button,
  Card,
  CardContent,
  CircularProgress,
} from "@material-ui/core";
import { Search, Refresh } from "@material-ui/icons";
import { AxiosReq } from "../../../../Components/Axios";
import moment from "moment";
// import Crypt from "../../Components/Crypt";
// import Doing from "../../Components/Doing";
import { toast_error, toast_success } from "./../../../../Components/Toast";
import { LoadingCheckSerial } from "../../../../Components/TableLoading";

function CheckLuckyDraw() {
  const [data, setData] = React.useState([]);
  const [serial, setSerial] = React.useState(null);
  const [stop, setStop] = React.useState(null);
  const [rerun, setRerun] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [laotime, setLaotime] = React.useState("");
  const [checkStatusRefilled, setCheckStatusRefilled] = React.useState(false);
  const [hotFlagCardStatus, setHotFlagCardStatus] = React.useState("");
  const [statusSerialPrize, setStatusSerialPrize] = React.useState(false);
  const [dataRerun, setDataRerun] = React.useState([]);


  const SearchSerial = () => {
    setStop(true);
    setData([]);
    setStatusSerialPrize(false);
    AxiosReq.post(
      "CheckLuckyDraw?serialNumber=" + serial, {}).then((res) => {
        if (res.data.sts === "20::Operater successed.") {
          setCheckStatusRefilled(true);
        }
        if (res.status === 200) {
          setTimeout(() => {
            setData(res.data);
            try {
              let time = res.data.recordDate;
              let laoTime = moment(time)
                .add(7, "hours")
                .format("DD-MM-YYYY HH:mm:ss");
              setLaotime(laoTime);
            } catch (error) { }
            setStop(false);
            // Doing({
            //   msisdn: Crypt({
            //     type: "decrypt",
            //     value: localStorage.getItem("input-phone"),
            //   }).text,
            //   username: Crypt({
            //     type: "decrypt",
            //     value: localStorage.getItem("one_info"),
            //   }).username,
            //   detail: "check lucky darw",
            //   resualt: "Operation successed.",
            // });
          }, 500);
        }
      })
      .catch((err) => {
        console.log(err);
        setCheckStatusRefilled(false);
        setStop(false);
        // Doing({
        //   msisdn: Crypt({
        //     type: "decrypt",
        //     value: localStorage.getItem("input-phone"),
        //   }).text,
        //   username: Crypt({
        //     type: "decrypt",
        //     value: localStorage.getItem("one_info"),
        //   }).username,
        //   detail: "check lucky draw",
        //   resualt: "error",
        // });
      });
  };

  React.useEffect(() => {
    switch (data?.hotCardFlag) {
      case "0":
        setHotFlagCardStatus("ບັດນີ້ສາມາດນຳໃຊ້ໄດ້.");
        break;
      case "1":
        setHotFlagCardStatus("ບັດນີ້ຖືກນຳໃຊ້ແລ້ວ.");
        break;
      case "3":
        setHotFlagCardStatus("Generated.");
        break;
      case "4":
        setHotFlagCardStatus("Locked.");
        break;
      case "5":
        setHotFlagCardStatus("ຍັງບໍ່ທັນactive.");
        break;
      case "6":
        setHotFlagCardStatus("Locked permanently.");
        break;
      case "7":
        setHotFlagCardStatus("Expired.");
        break;

      default:
        break;
    }
  }, [data]);

  const RerunLuckyDraw = () => {
    setIsLoading(true);
    AxiosReq.post("RerunLuckyDraw?serialNumber=" + serial, {}).then((res) => {
      if (res.status === 200) {
        if (res?.data?.sts === "20::Operater successed.") {
          setTimeout(() => {
            toast_success({ text: "SUCCESS" });
            setRerun(res?.data?.resultDesc);
            setDataRerun(res.data);
            // Doing({
            //   msisdn: Crypt({
            //     type: "decrypt",
            //     value: localStorage.getItem("input-phone"),
            //   }).text,
            //   username: Crypt({
            //     type: "decrypt",
            //     value: localStorage.getItem("one_info"),
            //   }).username,
            //   detail: "rerun lucky darw",
            //   resualt: "Operation successed.",
            // });
            setIsLoading(false);
            setCheckStatusRefilled(false);
          }, 500);
        } else {
          toast_error({ text: res?.data?.resultDesc });
          setRerun(res?.data?.resultDesc);
          // Doing({
          //   msisdn: Crypt({
          //     type: "decrypt",
          //     value: localStorage.getItem("input-phone"),
          //   }).text,
          //   username: Crypt({
          //     type: "decrypt",
          //     value: localStorage.getItem("one_info"),
          //   }).username,
          //   detail: "rerun lucky darw",
          //   resualt: "error",
          // });
          setIsLoading(false);
        }
        setStatusSerialPrize(true);
      }
    }).catch((err) => {
        // setRerun(err)
        setIsLoading(false);
        // Doing({
        //   msisdn: Crypt({
        //     type: "decrypt",
        //     value: localStorage.getItem("input-phone"),
        //   }).text,
        //   username: Crypt({
        //     type: "decrypt",
        //     value: localStorage.getItem("one_info"),
        //   }).username,
        //   detail: "rerun lucky darw",
        //   resualt: "error",
        // });
      });
  };
  const [err, setErr] = React.useState(null);
  const changeValue = (e) => {
    setCheckStatusRefilled(true);
    if (e.length < 15) {
      setCheckStatusRefilled(true);
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
              {data?.hotCardFlag === "1" && serial !== null && checkStatusRefilled !== false ? (
                <Button
                  style={{ maxHeight: 36 }}
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
                      <CircularProgress style={{ height: "100%" }} />
                      Rerun
                    </>
                  ) : (
                    <>
                      <Refresh />
                      Rerun
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  style={{ maxHeight: 36 }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="danger"
                  className="btn-danger"
                  disabled={true}
                  onClick={RerunLuckyDraw}
                >
                  {isLoading ? (
                    <>
                      <CircularProgress style={{ height: "100%" }} />
                      Rerun
                    </>
                  ) : (
                    <>
                      <Refresh />
                      Rerun
                    </>
                  )}
                </Button>
              )}
            </Grid>
            <Grid item xs={12}>
              {statusSerialPrize === true ? (
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
                          {dataRerun.sts !== null &&
                            dataRerun.sts === "20::Operater successed." ? (
                            <>
                              <Grid item container xs={12}>
                                <Grid item xs={6}>
                                  <div>ເລກທີ (b/S) :</div>
                                </Grid>
                                <Grid item xs={6}>
                                  <div>{dataRerun.serial ?? "-"}</div>
                                </Grid>
                                <Grid item xs={6}>
                                  <div>ລະຫັດ Pin :</div>
                                </Grid>
                                <Grid item xs={6}>
                                  <div>{dataRerun.pin ?? "-"}</div>
                                </Grid>
                                <Grid item xs={6}>
                                  <div>ປະເພດເບີ :</div>
                                </Grid>
                                <Grid item xs={6}>
                                  <div>{dataRerun.type ?? "-"}</div>
                                </Grid>
                                <Grid item xs={6}>
                                  <div>ເບີ Dummy :</div>
                                </Grid>
                                <Grid item xs={6}>
                                  <div>{dataRerun.postpaid ?? "-"}</div>
                                </Grid>
                                <Grid item xs={6}>
                                  <div>ເບີທີ່ຖືກເຕີມ :</div>
                                </Grid>
                                <Grid item xs={6}>
                                  <div>{dataRerun.prepaid ?? "-"}</div>
                                </Grid>
                                <Grid item xs={6}>
                                  <div>ເວລາທີຖືກເຕີມ :</div>
                                </Grid>
                                <Grid item xs={6}>
                                  <div>{laotime}</div>
                                </Grid>
                                <Grid item xs={6}>
                                  <div>ເງີນຟຼີ :</div>
                                </Grid>
                                <Grid item xs={6}>
                                  <div>
                                    {dataRerun.amount && dataRerun.amount > "0"
                                      ? parseInt(dataRerun.amount).toLocaleString()
                                      : "-"}
                                  </div>
                                </Grid>
                                <Grid item xs={6}>
                                  <div>ສະຖານະຂອງບັດ :</div>
                                </Grid>
                                <Grid item xs={6}>
                                  <div>
                                    {dataRerun.sts !== null ? (
                                      dataRerun.sts === "20::Operater successed." ? (
                                        <label className="active">
                                          ໄດ້ຮັບລາງວັນແລ້ວ
                                        </label>
                                      ) : (
                                        <label className="dis_active">
                                          {dataRerun.resultDesc}
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
                                <u>{rerun}</u>
                              </h2>
                              {/* <h2 className="center"><u>{rerun}</u></h2> */}
                            </Grid>
                          )}
                        </Grid>
                      </>
                    )}
                  </CardContent>
                </Card>
              ) : (
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
                              {data?.serial_ === null ? (
                                <label className="error">
                                  Check Lucky Draw
                                </label>
                              ) : (
                                "Check Lucky Draw"
                              )}
                            </h2>
                          </Grid>
                          <Grid item container xs={12}>
                            <Grid item xs={6}>
                              <div>ເລກທີ (b/S) :</div>
                            </Grid>
                            <Grid item xs={6}>
                              <div>{data?.serialNo ? data?.serialNo : "-"}</div>
                            </Grid>
                            <Grid item xs={6}>
                              <div>ບັດຖືກເຕີມໄປໃຫ້ໝາຍເລກ :</div>
                            </Grid>
                            <Grid item xs={6}>
                              <div>
                                {data?.rechargeNumber
                                  ? data?.rechargeNumber
                                  : "-"}
                              </div>
                            </Grid>
                            <Grid item xs={6}>
                              <div>ເວລາທີຖືກເຕີມ :</div>
                            </Grid>
                            <Grid item xs={6}>
                              {/* {console.log({data})} */}
                              <div>
                                {data?.tradeTime !== null ? laotime : "-"}
                              </div>
                            </Grid>
                            <Grid item xs={6}>
                              <div>ຍອດເງີນໜ້າບັດ :</div>
                            </Grid>
                            <Grid item xs={6}>
                              <div>
                                {data?.faceValue
                                  ? parseInt(data?.faceValue).toLocaleString() +
                                  " LAK"
                                  : "-"}
                              </div>
                            </Grid>
                            <Grid item xs={6}>
                              <div>ປະເພດເບີ :</div>
                            </Grid>
                            <Grid item xs={6}>
                              <div>{data?.cardCosName ?? "-"}</div>
                            </Grid>
                            <Grid item xs={6}>
                              <div>ວັນທີ່ສາມາດເລີ່ມນຳໃຊ້ບັດ :</div>
                              {/* {data?.cardStartDate} */}
                            </Grid>
                            <Grid item xs={6}>
                              <div>
                                {data?.cardStartDate !== null
                                  ? data?.cardStartDate.substr(6, 2) +
                                  "-" +
                                  data?.cardStartDate.substr(4, 2) +
                                  "-" +
                                  data?.cardStartDate.substr(0, 4) +
                                  " " +
                                  data?.cardStartDate.substr(8, 2) +
                                  ":" +
                                  data?.cardStartDate.substr(10, 2) +
                                  ":" +
                                  data?.cardStartDate.substr(12, 2)
                                  : "-"}
                              </div>
                            </Grid>
                            <Grid item xs={6}>
                              <div>ວັນທີ່ໝົດອາຍຸການນຳໃຊ້ :</div>
                            </Grid>
                            <Grid item xs={6}>
                              <div>
                                {data?.cardStopDate !== null
                                  ? data?.cardStopDate.substr(6, 2) +
                                  "-" +
                                  data?.cardStopDate.substr(4, 2) +
                                  "-" +
                                  data?.cardStopDate.substr(0, 4) +
                                  " " +
                                  data?.cardStopDate.substr(8, 2) +
                                  ":" +
                                  data?.cardStopDate.substr(10, 2) +
                                  ":" +
                                  data?.cardStopDate.substr(12, 2)
                                  : "-"}
                              </div>
                            </Grid>
                            {/* cardStopDate */}
                            <Grid item xs={6}>
                              <div>ສະຖານະຂອງບັດ :</div>
                            </Grid>
                            <Grid item xs={6}>
                              <div>
                                {data?.hotCardFlag !== null ? (
                                  <label
                                    className={
                                      data?.hotCardFlag === "0"
                                        ? "active"
                                        : data?.hotCardFlag === "5"
                                          ? "not_active"
                                          : "dis_active"
                                    }
                                  >
                                    {hotFlagCardStatus}
                                  </label>
                                ) : (
                                  "-"
                                )}
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default CheckLuckyDraw;
