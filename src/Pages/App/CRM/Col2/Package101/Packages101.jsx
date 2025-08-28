import { AccountTree, FactCheck, NetworkCell, Store } from '@mui/icons-material'
import { Grid, Skeleton } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { AxiosReq2 } from '../../../../../Components/Axios'
import BuyPackage101 from './Model/BuyPackage101'
import cookie from 'js-cookie'

function Packages101() {
    const [pk, setPk] = useState({ data: [], load: true, count: 0, show: false })
    const [buy, setBuy] = useState({ load: true, show: false, count: 0 })
    const [buyC, setBuyC] = useState(0)

    useEffect(() => {
        // let phone = localStorage.getItem("ONE_PHONE")

        setPk({ ...pk, load: true, count: 0 })
        AxiosReq2.get("Package101",{ headers: { 'Authorization': 'Bearer ' + cookie.get("ONE_TOKEN") } }).then(res => {
            if (res.status === 200) {
                let update = res.data?.map((row, idx) => {
                    row.idx = idx + 1
                    return row
                })
                setPk({ ...pk, load: false, count: parseInt(res.data.length), data: update })
            } else {
                setPk({ ...pk, load: false, count: 0 })
            }
        }).catch(er => {
            setPk({ ...pk, load: false, count: 0 })
        })
    }, [])
    return (
        <Grid container>          
            
            
            <Grid item xs={12} container className='link-box-pointer' onClick={() => setBuy({ ...buy, show: true })}>
                <Grid item xs={2}><Store /></Grid>
                <Grid item xs={6}>ຊື້ແພັກເກັດ 101</Grid>
                <Grid item xs={4}>
                    {pk.load ? <Skeleton animation="wave" /> : <div className={pk.count > 0 ? 'text-right bage-success' : 'text-right bage-error'}><u>{pk.count}</u></div>}

                </Grid>
            </Grid>
       
            <BuyPackage101 open={buy.show} cb={(e) => setBuy({ ...buy, show: e })} done={buy.load} ifdone={(e) => setBuy({ ...buy, load: e })} count={(e) => setBuyC(e)} />
            
        </Grid>
    )
}

export default Packages101