import { AccountTree, FactCheck, NetworkCell, Store } from '@mui/icons-material'
import { Grid, Skeleton } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { AxiosReq } from '../../../../../Components/Axios'
import BuyPackage from './Model/BuyPackage'
import PackageHistory from './Model/PackageHistory'
import QueryPackage from './Model/QueryPackage'
import SpecialPackage from './Model/SpecialPackage'
import cookie from 'js-cookie'

function Packages() {
    const [ph, setPh] = useState({ data: [], load: false, count: 0, show: false })
    const [pk, setPk] = useState({ data: [], load: false, count: 0, show: false })
    const [buy, setBuy] = useState({ load: true, show: false, count: 0 })
    const [buyC, setBuyC] = useState(0)
    const [sp, setSP] = useState({ load: true, show: false, count: 0 })
    const [spC, setSPC] = useState(0)

    useEffect(() => {
        let phone = localStorage.getItem("ONE_PHONE")

        setPh({ ...ph, count: 0, load: true })
        AxiosReq.get("/New_PackageHistoryCount/count?msisdn=" + phone,{ headers: { 'Authorization': 'Bearer ' + cookie.get("ONE_TOKEN") } }).then(res => {
            if (res.status === 200 && res.data.resultCode === 200) {
                setPh({ ...ph, count: parseInt(res.data.total), load: false })
            } else {
                setPh({ ...ph, count: 0, load: false })
            }
        }).catch(er => {
            setPh({ ...ph, count: 0, load: false })
        })

        setPk({ ...pk, load: true, count: 0 })
        AxiosReq.get("NewQueryPackage?msisdn=" + phone,{ headers: { 'Authorization': 'Bearer ' + cookie.get("ONE_TOKEN") } }).then(res => {
            if (res.status === 200) {
                let update = res.data.filter(row => row.remaining_data > 0).map((row, idx) => {
                    row.idx = idx + 1
                    return row
                })
                // let newData = res.data?.map((row, idx) => {
                //     row.idx = idx + 1
                //     return row
                // })
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
            <Grid item xs={12} container className='link-box-pointer' onClick={() => setPk({ ...pk, show: true })}>
                <Grid item xs={2}><NetworkCell /></Grid>
                <Grid item xs={6}>ດາຕ້າແພັກເກັດ :</Grid>
                <Grid item xs={4}>
                    {pk.load ? <Skeleton animation="wave" /> : <div className={pk.count > 0 ? 'text-right bage-success' : 'text-right bage-error'}><u>{pk.count}</u></div>}
                </Grid>
            </Grid>
            <Grid item xs={12} container className='link-box-pointer' onClick={() => setPh({ ...ph, show: true })}>
                <Grid item xs={2}><AccountTree /></Grid>
                <Grid item xs={6}>Package History :</Grid>
                <Grid item xs={4}>
                    {ph.load ? <Skeleton animation="wave" /> : <div className={ph.count > 0 ? 'text-right bage-success' : 'text-right bage-error'}><u>{ph.count}</u></div>}
                </Grid>
            </Grid>
            
            <Grid item xs={12} container className='link-box-pointer' onClick={() => setBuy({ ...buy, show: true })}>
                <Grid item xs={2}><Store /></Grid>
                <Grid item xs={6}>ຊື້ແພັກເກັດ</Grid>
                <Grid item xs={4}>
                    {buy.load ? <Skeleton animation="wave" /> : <div className={buyC > 0 ? 'text-right bage-success' : 'text-right bage-error'}><u>{buyC}</u></div>}
                </Grid>
            </Grid>
            <Grid item xs={12} container className='link-box-pointer' onClick={() => setSP({ ...sp, show: true })}>
                <Grid item xs={2}><FactCheck /></Grid>
                <Grid item xs={6}>Special Package</Grid>
                <Grid item xs={4}>
                    {sp.load ? <Skeleton animation="wave" /> : <div className={spC > 0 ? 'text-right bage-success' : 'text-right bage-error'}><u>{spC}</u></div>}
                </Grid>
            </Grid>

            <PackageHistory open={ph.show} cb={(e) => setPh({ ...ph, show: e })} total={ph.count} />
            <QueryPackage open={pk.show} cb={(e) => setPk({ ...pk, show: e })} data={pk.data} />
            <BuyPackage open={buy.show} cb={(e) => setBuy({ ...buy, show: e })} done={buy.load} ifdone={(e) => setBuy({ ...buy, load: e })} count={(e) => setBuyC(e)} />
            <SpecialPackage open={sp.show} cb={(e) => setSP({ ...sp, show: e })} done={sp.load} ifdone={(e) => setSP({ ...sp, load: e })} count={(e) => setSPC(e)} />
        </Grid>
    )
}

export default Packages