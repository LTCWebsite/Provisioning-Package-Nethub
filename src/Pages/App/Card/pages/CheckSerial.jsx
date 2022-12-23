import React from 'react'
import { Grid, Button, Card, CardContent } from '@material-ui/core'
import Search from '@material-ui/icons/Search'
import { AxiosReq } from '../../../../Components/Axios'
import moment from 'moment'
import cookie from 'js-cookie'
// import cookie from 'js-cookie'
// import Crypt from '../../Components/Crypt'
// import Doing from '../../Components/Doing'
import { LoadingCheckSerial } from '../../../../Components/TableLoading'

function CheckSerial() {
    const [data, setData] = React.useState()
    const [hotFlagCardStatus, setHotFlagCardStatus] = React.useState('')
    const [serial, setSerial] = React.useState(null)
    const [stop, setStop] = React.useState(null)
    const [laotime, setLaotime] = React.useState('')
    const SearchSerial = () => {
        setStop(true)
        AxiosReq.get("CheckSerialNumber?serialnumber=" + serial,{ headers: { 'Authorization': 'Bearer ' + cookie.get("ONE_TOKEN") } }).then(res => {
            if (res.status === 200) {

                // console.log(res.data)
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
                    // Doing({
                    //     msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                    //     username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                    //     detail: 'check serial number',
                    //     resualt: 'Operation successed.',
                    // })
                }, 200)
            }
        }).catch(err => {
            // setData()
            setStop(false)
            // Doing({
            //     msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
            //     username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
            //     detail: 'check serial number',
            //     resualt: 'error',
            // })
        })
    }


    const [err, setErr] = React.useState(null)
    const changeValue = (e) => {
        if (e.length ===15 || e.length === 12 || e.length === 13) {
            setErr(false)
            setSerial(e)
        } else {
            setErr(true)
            setSerial(e)
        }
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
    return (
        <>
            <Grid container>
                <Grid container item xs={12}>
                    <Grid item md={3}></Grid>
                    <Grid item container md={6} xs={12}>
                        <Grid item xs={9}>
                            <input maxLength="15" className="input" value={serial} placeholder="Serial Number ..." onChange={(e) => { changeValue(e.target.value) }} />
                            {err === true ? <u className="red">Serial number must be 15, 13, 12 characters</u> : null}
                        </Grid>
                        <Grid item xs={3} style={{ paddingLeft: 35, paddingBottom: 20 }}>
                            <Button fullWidth variant="contained" disabled={err} className="btn-primary" onClick={SearchSerial}><Search /></Button>
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
                                            <h2 className="center">{data?.serial_ === null ? <label className="error">Check Serial</label> : 'Check Serial'}</h2>
                                        </Grid>
                                        <Grid item container xs={12}>
                                            <Grid item xs={6}>
                                                <div>ເລກທີ (b/S) :</div>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <div>{data?.serialNo ? data?.serialNo : '-'}</div>
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
                                                <div>ປະເພດເບີ :</div>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <div>{data?.cardCosName ?? '-'}</div>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <div>ວັນທີ່ສາມາດເລີ່ມນຳໃຊ້ບັດ :</div>
                                                {/* {data?.cardStartDate} */}
                                            </Grid>
                                            <Grid item xs={6}>
                                                <div>{data?.cardStartDate !== null ? data?.cardStartDate.substr(6, 2) + "-" + data?.cardStartDate.substr(4, 2) + "-" + data?.cardStartDate.substr(0, 4) + " " + data?.cardStartDate.substr(8, 2) + ":" + data?.cardStartDate.substr(10, 2) + ":" + data?.cardStartDate.substr(12, 2) : '-'}</div>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <div>ວັນທີ່ໝົດອາຍຸການນຳໃຊ້ :</div>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <div>{data?.cardStopDate !== null ? data?.cardStopDate.substr(6, 2) + "-" + data?.cardStopDate.substr(4, 2) + "-" + data?.cardStopDate.substr(0, 4) + " " + data?.cardStopDate.substr(8, 2) + ":" + data?.cardStopDate.substr(10, 2) + ":" + data?.cardStopDate.substr(12, 2) : '-'}</div>
                                            </Grid>
                                            {/* cardStopDate */}
                                            <Grid item xs={6}>
                                                <div>ສະຖານະຂອງບັດ :</div>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <div>{data?.hotCardFlag !== null ? <label className={data?.hotCardFlag === "0" ? "active" : data?.hotCardFlag === "5" ? "not_active" : "dis_active"}>{hotFlagCardStatus}</label> : '-'}</div>
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

export default CheckSerial
