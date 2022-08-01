import { Close } from '@mui/icons-material'
import { Dialog, Grid, Slide } from '@mui/material'
import React from 'react'
import { AxiosReq } from '../../../../../../Components/Axios'
import WifiTab from './WifiTab'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

function Wifi({ open, cb, count, stop }) {
    React.useEffect(() => {
        var phone = localStorage.getItem("ONE_PHONE")
        AxiosReq.get("HistoryBuyPackageLTCWiFi?msisdn=" + phone).then(res => {
            if (res.status === 200) {
                stop(false)
                count(res?.data?.length)
            }
        }).catch(err => {
            stop(false)
        })
    }, [])

    return (
        <>
            <Dialog
                maxWidth="xl"
                open={open}
                onClose={() => cb(!open)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container style={{ width: 1200 }}>
                    <Grid item container xs={12}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}><div className="center"><h1>LTC Wifi History</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className='right'><Close className='icon' onClick={() => cb(!open)} /></div>
                        </Grid>
                        <Grid item xs={12}>
                            <WifiTab />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default Wifi
