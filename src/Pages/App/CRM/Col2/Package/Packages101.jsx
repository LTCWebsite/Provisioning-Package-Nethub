import { AccountTree, FactCheck, NetworkCell, Store } from '@mui/icons-material'
import { Grid, Skeleton } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { AxiosReq } from '../../../../../Components/Axios'
import BuyPackage from './Model/BuyPackage'
import cookie from 'js-cookie'

function Packages101() {
    const [pk, setPk] = useState({ data: [], load: false, count: 0, show: false })
    const [buy, setBuy] = useState({ load: true, show: false, count: 0 })
    const [buyC, setBuyC] = useState(0)

    useEffect(() => {
        let phone = localStorage.getItem("ONE_PHONE")


        setPk({ ...pk, load: true, count: 0 })
        AxiosReq.get("NewQueryPackage?msisdn=" + phone,{ headers: { 'Authorization': 'Bearer ' + cookie.get("ONE_TOKEN") } }).then(res => {
            if (res.status === 200) {
                // let update = res.data.filter(row => row.remaining_data > 0).map((row, idx) => {
                //     row.idx = idx + 1
                //     return row
                // })
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
                    {buy.load ? <Skeleton animation="wave" /> : <div className={buyC > 0 ? 'text-right bage-success' : 'text-right bage-error'}><u>{buyC}</u></div>}
                </Grid>
            </Grid>
       
            <BuyPackage open={buy.show} cb={(e) => setBuy({ ...buy, show: e })} done={buy.load} ifdone={(e) => setBuy({ ...buy, load: e })} count={(e) => setBuyC(e)} />
            
        </Grid>
    )
}

export default Packages101