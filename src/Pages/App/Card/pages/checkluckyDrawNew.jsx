import React from 'react'
import {
  Grid,
  Button,
  Card,
  CardContent,
  CircularProgress,
} from "@material-ui/core";
// import Search from '@material-ui/icons/Search'
import { Search, Refresh } from "@material-ui/icons";
import { AxiosReq } from '../../../../Components/Axios'
import moment from 'moment'
import cookie from 'js-cookie'
import { toast_error, toast_success } from "./../../../../Components/Toast";
import { LoadingCheckSerial } from '../../../../Components/TableLoading'


function CheckLuckyDrawNew() {
  const [data, setData] = React.useState()
  const [hotFlagCardStatus, setHotFlagCardStatus] = React.useState('')
  const [Pin, setPin] = React.useState(null)
  const [stop, setStop] = React.useState(null)
  const [rerun, setRerun] = React.useState(null);
  const [laotime, setLaotime] = React.useState('')
  const [checkStatusRefilled, setCheckStatusRefilled] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [statusSerialPrize, setStatusSerialPrize] = React.useState(false);
  const [dataRerun, setDataRerun] = React.useState([]);


  const SearchPin = () => {
    setStop(true)
    AxiosReq.get(`CheckLuckyDraw?pin=${Pin}&username=test`, { headers: { 'Authorization': 'Bearer ' + cookie.get("ONE_TOKEN") } }).then(res => {
      if (res.status === 200) {


        setTimeout(() => {
          // console
          try {
            let time = res.data.tradeTime
            let subTime = time.substr(0, 4) + '-' + time.substr(4, 2) + '-' + time.substr(6, 2) + 'T' + time.substr(8, 2) + ':' + time.substr(10, 2) + ':' + time.substr(12, 2)
            let laoTime = moment(subTime).add(7, 'hours').format("DD-MM-YYYY HH:mm:ss")
            setLaotime(laoTime)
          } catch (error) {

          }
          setData(res.data)
          setStop(false)

        }, 200)
      }
    }).catch(err => {
      // setData()
      setStop(false)

    })
  }


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
  }, [data])

  const RerunLuckyDraw = () => {
    setIsLoading(true);
    AxiosReq.post(`RerunLuckyDraw?pin=${Pin}&username=test`, {}, { headers: { 'Authorization': 'Bearer ' + cookie.get("ONE_TOKEN") } }).then((res) => {
      if (res.status === 200) {
        if (res?.data?.resultCode === "20") {
          setTimeout(() => {
            toast_success({ text: "SUCCESS" });
            setRerun(res?.data?.resultDesc);
            setDataRerun(res.data);

            setIsLoading(false);
            setCheckStatusRefilled(false);
          }, 500);
        } else {
          toast_error({ text: res?.data?.resultDesc });
          setRerun(res?.data?.resultDesc);

          setIsLoading(false);
        }
        setStatusSerialPrize(true);
      }
    }).catch((err) => {
      // setRerun(err)
      setIsLoading(false);

    });
  };
  const [err, setErr] = React.useState(null);
  const changeValue = (e) => {
    setCheckStatusRefilled(true);
    if (e.length < 16) {
      setCheckStatusRefilled(true);
      e.length === 0 ? setErr(null) : setErr(false);
      setPin(e);
    } else {
      setErr(true);
      setPin(e);
    }
  };

  return (
    <>
      <Grid container>
        <Grid container item xs={12}>
          <Grid item md={3}></Grid>
          <Grid item container md={6} xs={12}>
            <Grid item xs={9}>
              <input maxLength="15" className="input" value={Pin} placeholder="Pin Number ..." onChange={(e) => { changeValue(e.target.value) }} />
              {err === true ? <u className="red">Pin number must be 15, 13, 12 characters</u> : null}
            </Grid>
            <Grid item xs={2} style={{ paddingLeft: 20, paddingBottom: 20 }}>
              <Button fullWidth variant="contained" className="btn-primary" onClick={SearchPin}><Search /></Button>
            </Grid>

            <Grid item xs={2} style={{ paddingLeft: 10, paddingBottom: 20 }}>
              {data?.resultCode === "200" && data?.hotCardFlag === "1" && Pin !== null && checkStatusRefilled !== false ? (
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
                  {console.log(data)}
                  {isLoading  ? (
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
              <Card>
                <CardContent className="content-1">
                  {stop === null && <><Grid item xs={12} style={{ paddingBottom: 50 }}>
                    <h1 className="dialog-center">ກະລຸນາກົດຄົ້ນຫາ</h1>
                  </Grid></>}
                  {stop === true && <LoadingCheckSerial />}
                  {stop === false && <><Grid container>
                    <Grid item xs={12}>
                      <h2 className="center">{data?.Pin === null ? <label className="error">Check Pin</label> : 'Check Pin'}</h2>
                    </Grid>
                    <Grid item container xs={12}>
                      <Grid item xs={6}>
                        <div>Code :</div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>{data?.resultCode ? data?.resultCode : '-'}</div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>ລາຍລະອຽດ :</div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>{data?.resultDesc ? data?.resultDesc : '-'}</div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>ບັດຖືກເຕີມໄປໃຫ້ໝາຍເລກ :</div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>{data?.rechargeNumber ? data?.rechargeNumber : '-'}</div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>ເວລາທີຖືກເຕີມ :</div>
                      </Grid>
                      <Grid item xs={6}>
                        {/* {console.log({data})} */}
                        <div>{data?.tradeTime !== null ? laotime : '-'}</div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>ຍອດເງີນໜ້າບັດ :</div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>{data?.faceValue ? parseInt(data?.faceValue).toLocaleString() + " LAK" : '-'}</div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>ສະຖານະຂອງບັດ :</div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>{data?.hotCardFlag !== null ? <label className={data?.hotCardFlag === "0" ? "active" : data?.hotCardFlag === "5" ? "not_active" : "dis_active"}>{hotFlagCardStatus}</label> : '-'}</div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>ເຕີມເຂົ້າເບີ :</div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>{data?.rechargeNumber !== null ? data?.rechargeNumber : '-'}</div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>ປະເພດ :</div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>{data?.typePrize !== null ? data?.typePrize : '-'}</div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>ຂອງລາງວັນ :</div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>{data?.prize !== null ? data?.prize : '-'}</div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>ເບີທີ່ໄດ້ຮັບຂອງລາງວັນ :</div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>{data?.numberPrize !== null ? data?.numberPrize : '-'}</div>
                      </Grid>
                    </Grid>
                  </Grid></>}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default CheckLuckyDrawNew
