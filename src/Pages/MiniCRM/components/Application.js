import { Grid } from '@material-ui/core'
import { Cancel, CheckCircle } from '@material-ui/icons'
import React from 'react'
import Axios from '../../Components/Axios'
import Crypt from '../../Components/Crypt'
import LoadingLottie from '../../Components/LoadingLottie'
import cookie from 'js-cookie'
import EbillInfo from './EbillInfo'

function Application() {
    const [stop, setStop] = React.useState(false)
    const [mService, setMService] = React.useState('')
    const [mTopup, setMTopup] = React.useState('')
    const [alert, setAlert] = React.useState(false)
    React.useEffect(() => {
        setStop(false)
        setAlert(false)
        var phone = Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") })
        const token = cookie.get("one_session")
        Axios.get("MServices?msisdn=" + phone.text, { headers: { 'Authorization': 'Bearer ' + token } }).then(res => {
            if (res.status === 200) {
                setMService(res.data.isRegistered)
                Axios.get("/MTopupPlus?msisdn=" + phone.text, { headers: { 'Authorization': 'Bearer ' + token } }).then(res => {
                    if (res.status === 200) {
                        setMTopup(res.data.isRegistered)
                        setTimeout(() => {
                            setStop(true)
                        }, 100)
                    }
                }).catch(err => {
                    setAlert(true)
                    setStop(true)
                })
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
                <Grid item xs={12}><h2 className="center">{alert ? <label className="error">Application</label> : 'Application'}</h2></Grid>
                <Grid item xs={6}><div><b>M-Service:</b></div></Grid>
                <Grid item xs={6}><div>{mService ? <CheckCircle className="success" checked={mService} /> : <Cancel className="danger" checked={mService} />}</div></Grid>
                <Grid item xs={6}><div><b>M-Topup Plus:</b></div></Grid>
                <Grid item xs={6}><div>{mTopup ? <CheckCircle className="success" checked={mTopup} /> : <Cancel className="danger" checked={mTopup} />}</div></Grid>
                <Grid item xs={6}><div><b>M-money:</b></div></Grid>
                <Grid item xs={6}><div>-</div></Grid>
                <Grid item xs={6}><div><b>E-Bill:</b></div></Grid>
                <Grid item xs={6}>
                    <div>
                        <EbillInfo />
                    </div>
                </Grid>
            </>}
        </>
    )
}

export default Application
