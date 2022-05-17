import React from 'react'
import { Grid } from '@mui/material';
import NavLoad from '../Components/NavLoad'

function Ocs({ allData }) {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    const [ocs, setOCS] = React.useState([])

    React.useEffect(() => {
        // console.log(allData.use)
        setTimeout(() => {
            setData(allData.ch)
            setOCS(allData.data)
            setStop(true)
        }, 300)
    }, [])
    
    
    return (
        <>
            <NavLoad height={250} use={!stop} />
            <Grid container item xs={12} className="text">
                <Grid item xs={5}><div><b>ສະຖານະ:</b></div></Grid>
                <Grid item xs={7}><div>{ocs.state ? ocs.state === "active" ? <label className="active">Active</label> : <label className="dis_active">{data.status}</label> : '-'}</div></Grid>
                <Grid item xs={5}><div><b>Network Type:</b></div></Grid>
                <Grid item xs={7}><div>{data.networkType ?? '-'}</div></Grid>
                <Grid item xs={5}><div><b>Product Type:</b></div></Grid>
                <Grid item xs={7}><div>{ocs.productType ?? '-'}</div></Grid>
                <Grid item xs={5}><div><b>First Active:</b></div></Grid>
                <Grid item xs={7}><div>{ocs.activeDate ?? '-'}</div></Grid>
                <Grid item xs={5}><div><b>Register Date:</b></div></Grid>
                <Grid item xs={7}><div>{ocs.activeDate ?? '-'}</div></Grid>
                <Grid item xs={5}><div><b>Active Stop:</b></div></Grid>
                <Grid item xs={7}><div>{ocs.expriceDate ?? '-'}</div></Grid>
                <Grid item xs={5}><div><b>Suspend Stop:</b></div></Grid>
                <Grid item xs={7}><div>{ocs.suspendDate ?? '-'}</div></Grid>
                <Grid item xs={5}><div><b>Disable Stop:</b></div></Grid>
                <Grid item xs={7}><div>{ocs.barringDate ?? '-'}</div></Grid>
                <Grid item xs={12}>
                    <div className="hr-1"></div>
                </Grid>
            </Grid>
        </>
    )
}

export default Ocs
