import React from 'react'
import { Grid } from '@mui/material';
import NavLoad from '../Components/NavLoad'

function Ftth({ allData }) {
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
            <NavLoad height={350} use={!stop} />
            <Grid container item xs={12} className="text">
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
            </Grid>
        </>
    )
}

export default Ftth
