import { AccountTree, AddBox, AddToPhotos, Inventory2 } from '@mui/icons-material'
import { Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { AxiosReq } from '../../../../../Components/Axios'
import PackageHistory from './Model/PackageHistory'

function Packages() {
    const [ph, setPh] = useState({ data: [], load: false, count: 0, show: false })
    const [list, setList] = useState([
        { name: 'Query Package', count: 10, icon: <Inventory2 /> },
        { name: 'Special Package', count: 10, icon: <AddBox /> },
        { name: 'Buy Package', count: 5, icon: <AddToPhotos /> },
    ])

    useEffect(() => {
        let phone = localStorage.getItem("ONE_PHONE")

        setPh({ ...ph, count: 0, load: true })
        AxiosReq.get("/New_PackageHistoryCount/count?msisdn=" + phone).then(res => {
            if (res.status === 200 && res.data.resultCode === 200) {
                setPh({ ...ph, count: parseInt(res.data.total), load: false })
            } else {
                setPh({ ...ph, count: 0, load: false })
            }
        }).catch(er => {
            setPh({ ...ph, count: 0, load: false })
        })
    }, [])
    return (
        <Grid container>
            <Grid item xs={12} container className='link-box-pointer' onClick={() => setPh({ ...ph, show: true })}>
                <Grid item xs={2}><AccountTree /></Grid>
                <Grid item xs={6}>Package History :</Grid>
                <Grid item xs={4}><div className='text-right'>{ph.count}</div></Grid>
            </Grid>
            {list.map((row, idx) => {
                return (
                    <Grid item xs={12} container className='link-box-pointer' key={idx}>
                        <Grid item xs={2}>{row.icon}</Grid>
                        <Grid item xs={6}>{row.name} :</Grid>
                        <Grid item xs={4}><div className='text-right'>{row.count}</div></Grid>
                    </Grid>
                )
            })}
            <PackageHistory open={ph.show} cb={(e) => setPh({ ...ph, show: e })} />
        </Grid>
    )
}

export default Packages