import React from 'react'
import { Grid } from '@mui/material';
import NavLoad from '../Components/NavLoad'

function FtthPhone({ allData }) {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        if (allData.st !== 'loading') {
            setTimeout(() => {
                setData(allData.data)
                setStop(true)
            }, 300)
        }
    }, [])
    return (
        <>
            <NavLoad height={85} use={!stop} />
            <Grid container item xs={12} className="text">
                <Grid item xs={5}><div><b>FTTH:</b></div></Grid>
                <Grid item xs={7}><div>{data.ftth ?? '-'}</div></Grid>
                <Grid item xs={5}><div><b>ເບີໂທ:</b></div></Grid>
                <Grid item xs={7}><div>{data.msisdn ?? '-'}</div></Grid>
                <Grid item xs={5}><div><b>ແພັກເກັດ:</b></div></Grid>
                <Grid item xs={7}><div>{parseInt(data.packageFTTH).toLocaleString() ?? '-'}</div></Grid>
            </Grid>
        </>
    )
}

export default FtthPhone
