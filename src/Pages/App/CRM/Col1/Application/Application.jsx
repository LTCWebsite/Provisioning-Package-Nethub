import React from 'react'
import { Grid } from '@material-ui/core'
import { Cancel, CheckCircle } from '@material-ui/icons'
import { AxiosReq } from '../../../../../Components/Axios'
import Ebill from './Ebill'

function Application() {
    const [stop, setStop] = React.useState(false)
    const [mService, setMService] = React.useState('')
    const [mTopup, setMTopup] = React.useState('')
    const [alert, setAlert] = React.useState(false)
    React.useEffect(() => {
        setStop(false)
        setAlert(false)
        var phone = localStorage.getItem("ONE_PHONE")
        AxiosReq.get("MServices?msisdn=" + phone).then(res => {
            if (res.status === 200) {
                setMService(res.data.isRegistered)
                AxiosReq.get("MTopupPlus?msisdn=" + phone).then(res => {
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
            <Grid container>
                <Grid item xs={12} container className='link-box-dev'>
                    <Grid item xs={7}><div><b>M-Service:</b></div></Grid>
                    <Grid item xs={5}><div className='right'>{mService ? <CheckCircle className="success" checked={mService} /> : <Cancel className="danger" checked={mService} />}&nbsp;&nbsp;&nbsp;</div></Grid>
                </Grid>
                <Grid item xs={12} container className='link-box-dev'>
                    <Grid item xs={7}><div><b>M-Topup Plus:</b></div></Grid>
                    <Grid item xs={5}><div className='right'>{mTopup ? <CheckCircle className="success" checked={mTopup} /> : <Cancel className="danger" checked={mTopup} />}&nbsp;&nbsp;&nbsp;</div></Grid>
                </Grid>
                <Grid item xs={12} container className='link-box-dev'>
                    <Grid item xs={7}><div><b>M-money:</b></div></Grid>
                    <Grid item xs={5}><div className='right'>-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></Grid>
                </Grid>
                <Grid item xs={12} container className='link-box-dev'>
                    <Grid item xs={7}><div><b>E-Bill:</b></div></Grid>
                    <Grid item xs={5}>
                        <div className='right'>
                            <Ebill />&nbsp;&nbsp;&nbsp;
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Application