import React from 'react'
import { Grid } from '@mui/material';
import NavLoad from '../Components/NavLoad'

function Bss({ allData }) {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    const [code, setCode] = React.useState([])
    React.useEffect(() => {
        setTimeout(() => {
            setData(allData.data)
            setCode(allData.use)
            setStop(true)
        }, 300)
    }, [])
    return (
        <>
            <NavLoad height={370} use={!stop} />
            <Grid container item xs={12} className="text">
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
                <Grid item xs={7}><div>{code.code}</div></Grid>
                <Grid item xs={5}><div><b>Network Type:</b></div></Grid>
                <Grid item xs={7}><div>{code.name}</div></Grid>
                <Grid item xs={12}>
                    <div className="hr-1"></div>
                </Grid>
            </Grid>
        </>
    )
}

export default Bss
