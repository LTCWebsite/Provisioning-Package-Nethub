import { Grid } from '@material-ui/core'
import { Cancel, CheckCircle } from '@material-ui/icons'
import React from 'react'
import EbillInfo from '../../../Pages/MiniCRM/components/EbillInfo'
import NavLoad from '../Components/NavLoad'

function Application({ allData }) {
    const [stop, setStop] = React.useState(false)
    const [mService, setMService] = React.useState('')
    const [mTopup, setMTopup] = React.useState('')
    React.useEffect(() => {
        setTimeout(() => {
            setMService(allData.data)
            setMTopup(allData.use)
            setStop(true)
        }, 300)
    }, [])
    return (
        <>
            <NavLoad height={150} use={!stop} />
            <Grid container item xs={12} className="text">
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
                <Grid item xs={12}>
                    <div className="hr-1"></div>
                </Grid>
            </Grid>
        </>
    )
}

export default Application
