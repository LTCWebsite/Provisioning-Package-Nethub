import React from 'react'
import LoadingLottie from '../../Components/LoadingLottie'
import cookie from 'js-cookie'
import Axios from '../../Components/Axios'
import Crypt from '../../Components/Crypt'
import { Grid } from '@material-ui/core'
import { LoadingBSS } from '../../../Loading/TableLoading'



function BSSinfo() {
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
            {!stop ? <LoadingBSS /> :
                <Grid container item xs={12}>
                    <Grid item xs={12}><h2 className="center">{alert ? <label className="error">ຂໍ້ມູນການລົງທະບຽນ BSS</label> : <label>ຂໍ້ມູນການລົງທະບຽນ BSS</label>}</h2></Grid>
                    <Grid item xs={5}><div><b>ຊື່:</b></div></Grid>
                    <Grid item xs={7}><div>{data.name ?? '-'}</div></Grid>
                    <Grid item xs={5}><div><b>ທີ່ຢູ່:</b></div></Grid>
                    <Grid item xs={7}><div>{data.address ?? '-'}</div></Grid>
                    <Grid item xs={5}><div><b>Pay full address:</b></div></Grid>
                    <Grid item xs={7}><div>{data.paY_FULL_ADDRESS ?? '-'}</div></Grid>
                    <Grid item xs={5}><div><b>BSS Status:</b></div></Grid>
                    <Grid item xs={7}><div>{data.statusBSSDesc ? data.statusBSSDesc === "Activated" ? <label className="active">{data.statusBSSDesc}</label> : <label className="dis_active">{data.statusBSSDesc}</label> : '-'}</div></Grid>
                    <Grid item xs={5}><div><b>HLR Status:</b></div></Grid>
                    <Grid item xs={7}><div>{data.hrL_Status === '1' ? <label className="active">Activated</label> : data.hrL_Status ? data.hrL_Status : '-'}</div></Grid>
                    {/* <Grid item xs={5}><div><b>OCS status:</b></div></Grid>
                    <Grid item xs={7}><div>{data.ocS_Status === '1' ? <label className="active">Activated</label> : data.hrL_Status ? data.hrL_Status : '-'}</div></Grid> */}
                    <Grid item xs={5}><div><b>Change Date:</b></div></Grid>
                    <Grid item xs={7}><div>{data.changE_DATETIME ?? '-'}</div></Grid>
                    <Grid item xs={5}><div><b>Serial:</b></div></Grid>
                    <Grid item xs={7}><div>{data.serial ?? '-'}</div></Grid>
                    <Grid item xs={5}><div><b>Sub type:</b></div></Grid>
                    <Grid item xs={7}><div>{data.suB_TYPE ?? '-'}</div></Grid>
                    <Grid item xs={5}><div><b>IMSI:</b></div></Grid>
                    <Grid item xs={7}><div>{data.imsi ?? '-'}</div></Grid>
                    <Grid item xs={5}><div><b>Emp Code:</b></div></Grid>
                    <Grid item xs={7}><div>{data.emP_CODE ?? '-'}</div></Grid>

                    <Grid item xs={5}><div><b>Network Code:</b></div></Grid>
                    <Grid item xs={7}><div>{code.networK_CODE ?? '-'}</div></Grid>
                    <Grid item xs={5}><div><b>Network Type:</b></div></Grid>
                    <Grid item xs={7}><div>{code.networK_NAME ?? '-'}</div></Grid>
                </Grid>}
        </div>
    )
}

export default BSSinfo
