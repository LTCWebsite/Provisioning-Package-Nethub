import { Grid } from '@material-ui/core'
import React from 'react'
import Axios from '../../Components/Axios'
import Crypt from '../../Components/Crypt'
import LoadingLottie from '../../Components/LoadingLottie'
import cookie from 'js-cookie'

function FTTH() {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    const [alert, setAlert] = React.useState(false)
    React.useEffect(() => {
        setStop(false)
        setAlert(false)
        var phone = Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") })
        const token = cookie.get("one_session")
        Axios.get("Fiber?ftth=" + phone.text, { headers: { 'Authorization': 'Bearer ' + token } }).then(res => {
            if (res.status === 200) {
                setData(res.data)
                setStop(true)
            }
            // console.log(res.data)
        }).catch(err => {
            setAlert(true)
            setStop(true)
        })
    }, [])
    return (
        <>
            {!stop ? <LoadingLottie isStopped={stop} /> : <>
                <Grid item xs={12}><h2 className="center">{alert ? <label className="error">ຂໍ້ມູນ FTTH</label> : 'ຂໍ້ມູນ FTTH'}</h2></Grid>
                <Grid item xs={5}><div><b>FTTH:</b></div></Grid>
                <Grid item xs={7}><div>{data.ftth ?? '-'}</div></Grid>
                <Grid item xs={5}><div><b>ສະຖານະ:</b></div></Grid>
                    <Grid item xs={7}><div>{data.statusDesc ? data.statusDesc === "Activated" ? <label className="active">{data.statusDesc}</label> : <label className="dis_active">{data.statusDesc}</label> : '-'}</div></Grid>
                <Grid item xs={5}><div><b>ຊື່:</b></div></Grid>
                <Grid item xs={7}><div>{data.firstname ?? '-'}</div></Grid>
                <Grid item xs={5}><div><b>ທີ່ຢູ່:</b></div></Grid>
                <Grid item xs={7}><div>{data.address ?? '-'}</div></Grid>
                <Grid item xs={5}><div><b>Bundle:</b></div></Grid>
                <Grid item xs={7}><div>{data.bundle ?? '-'}</div></Grid>
                <Grid item xs={5}><div><b>ແພັກເກັດ:</b></div></Grid>
                <Grid item xs={7}><div>{data.ftthPackage ?? '-'}</div></Grid>
                <Grid item xs={5}><div><b>ລາຄາ:</b></div></Grid>
                <Grid item xs={7}><div>{parseInt(data.ftthPrice).toLocaleString() ?? '-'}</div></Grid>
                <Grid item xs={5}><div><b>ເວລາຍັງເຫຼືອ ( ມີື້ ):</b></div></Grid>
                <Grid item xs={7}><div>{data.remainingDay ?? '-'}</div></Grid>
                <Grid item xs={5}><div><b>ວັນທີ່ໝົດອາຍຸ:</b></div></Grid>
                <Grid item xs={7}><div>{data.expireDate ?? '-'}</div></Grid>
                <Grid item xs={5}><div><b>Total Day:</b></div></Grid>
                <Grid item xs={7}><div>{data.totalDay ?? '-'}</div></Grid>
            </>}
        </>
    )
}

export default FTTH
