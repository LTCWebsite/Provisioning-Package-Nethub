import { Card, CardContent, Grid } from '@mui/material'
import React from 'react'
import LoadingLottie from '../../../Pages/Components/LoadingLottie'
import cookie from 'js-cookie'
import Axios from '../../../Pages/Components/Axios'
import Crypt from '../../../Pages/Components/Crypt'

function BSS() {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    const [alert, setAlert] = React.useState(false)
    const [code, setCode] = React.useState(null)
    React.useEffect(() => {
        setStop(false)
        setAlert(false)
        var phone = Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") })
        Axios.get("QueryCustomerBSS?msisdn=" + phone.text, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.status === 200) {
                setData(res.data.querySubInfoResult)
                Axios.get("api/CheckNetworkType?msisdn=" + phone.text, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(re => {
                    if (res.status === 200) {
                        setCode(re.data)
                        setStop(true)
                    }
                }).catch(err => {
                    setStop(true)
                })
            }
        }).catch(err => {
            console.log(err)
            setAlert(true)
        })
    }, [])
    return (
        <div>
            <Card style={{ marginTop: 10, borderBottom: "6px solid #4E73DF" }} elevation={0} className="box">
                <CardContent className="content-1">
                    <Grid container>
                        {!stop ? <Grid item xs={12} style={{ height: 310 }}><LoadingLottie isStopped={stop} height={200} /></Grid> :
                            <Grid container item xs={12}>
                                <Grid item xs={12}><h2 className="center">{alert ? <label className="error">ຂໍ້ມູນການລົງທະບຽນ BSS</label> : <label>ຂໍ້ມູນການລົງທະບຽນ BSS</label>}</h2></Grid>
                                <Grid item xs={12} md={4}>
                                    <div><b>ຊື່:</b></div>
                                    <div>{data.name ?? '-'}</div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <div><b>ທີ່ຢູ່:</b></div>
                                    <div>{data.address ?? '-'}</div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <div><b>Pay full address:</b></div>
                                    <div>{data.paY_FULL_ADDRESS ?? '-'}</div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <div><b>BSS Status:</b></div>
                                    <div>{data.statusBSSDesc ? data.statusBSSDesc === "Activated" ? <label className="active">{data.statusBSSDesc}</label> : <label className="dis_active">{data.statusBSSDesc}</label> : '-'}</div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <div><b>HLR Status:</b></div>
                                    <div>{data.hrL_Status === '1' ? <label className="active">Activated</label> : data.hrL_Status ? data.hrL_Status : '-'}</div>
                                </Grid>
                                {/* <Grid item xs={12} md={4}><div><b>OCS status:</b></div></Grid>
                    <Grid item xs={7}><div>{data.ocS_Status === '1' ? <label className="active">Activated</label> : data.hrL_Status ? data.hrL_Status : '-'}</div></Grid> */}
                                <Grid item xs={12} md={4}>
                                    <div><b>Change Date:</b></div>
                                    <div>{data.changE_DATETIME ?? '-'}</div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <div><b>Serial:</b></div>
                                    <div>{data.serial ?? '-'}</div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <div><b>Sub type:</b></div>
                                    <div>{data.suB_TYPE ?? '-'}</div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <div><b>IMSI:</b></div>
                                    <div>{data.imsi ?? '-'}</div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <div><b>Emp Code:</b></div>
                                    <div>{data.emP_CODE ?? '-'}</div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <div><b>Network Code:</b></div>
                                    <div>{code.networK_CODE ?? '-'}</div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <div><b>Network Type:</b></div>
                                    <div>{code.networK_NAME ?? '-'}</div>
                                </Grid>
                            </Grid>}
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default BSS
