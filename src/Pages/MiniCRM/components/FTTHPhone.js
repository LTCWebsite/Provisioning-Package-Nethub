import { Grid } from '@material-ui/core'
import React from 'react'
import Axios from '../../Components/Axios'
import Crypt from '../../Components/Crypt'
import LoadingLottie from '../../Components/LoadingLottie'
import cookie from 'js-cookie'

function FTTHPhone() {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    const [alert, setAlert] = React.useState(false)
    React.useEffect(() => {
        setStop(false)
        setAlert(false)
        var phone = Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") })
        const token = cookie.get("one_session")
        Axios.post("Fiber?ftth=" + phone.text,{}, { headers: { 'Authorization': 'Bearer ' + token } }).then(res => {
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
                <Grid item xs={12}><h2 className="center">{alert ? <label className="error">ຂໍ້ມູນ FTTH ຜູກເບີໂທ</label> : 'ຂໍ້ມູນ FTTH ຜູກເບີໂທ'}</h2></Grid>
                <Grid item xs={5}><div><b>FTTH:</b></div></Grid>
                <Grid item xs={7}><div>{data.ftth ?? '-'}</div></Grid>
                <Grid item xs={5}><div><b>ເບີໂທ:</b></div></Grid>
                <Grid item xs={7}><div>{data.msisdn ?? '-'}</div></Grid>
                <Grid item xs={5}><div><b>ແພັກເກັດ:</b></div></Grid>
                <Grid item xs={7}><div>{parseInt(data.packageFTTH).toLocaleString() ?? '-'}</div></Grid>
            </>}
        </>
    )
}

export default FTTHPhone
