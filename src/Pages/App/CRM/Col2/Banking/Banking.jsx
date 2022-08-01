import { AddToPhotos, AttachMoney, LocalAtm, MoneyOff, Sms } from '@mui/icons-material'
import { Grid, Skeleton } from '@mui/material'
import React, { useState } from 'react'
import Fadao from './Model/Fadao'
import MTopup from './Model/MTopup'
import Payment from './Model/Payment'
import Topup from './Model/Topup'

function Banking() {
    const [open, setOpen] = useState({ mservice: false, mmoney: false, topup: false, fadao: false, sms: false, mtopup: false, payment: false })
    const [count, setCount] = useState({ fadao: 0, sms: 0, topup: 0, mtopup: 0 })
    const [loading, setLoading] = useState({ fadao: true, sms: true, topup: true, mtopup: true })

    const [lMtopup, setLMtopup] = useState(true)
    const [lTopup, setLTopup] = useState(true)
    const [lPayment, setLPayment] = useState(true)
    const [cMtopup, setCMtopup] = useState(0)
    const [cTopup, setCTopup] = useState(0)
    const [cPayment, setCPayment] = useState(0)

    return (
        <>
            <Grid container>
                <Grid item xs={12} container className='link-box-pointer' onClick={() => setOpen({ ...open, fadao: true })}>
                    <Grid item xs={2}><AttachMoney /></Grid>
                    <Grid item xs={6}>ຢືມ ແລະ ຕັດເງິນ ຟ້າດາວ :</Grid>
                    <Grid item xs={4}>
                        {loading.fadao ? <Skeleton animation="wave" /> : <div className={count.fadao > 0 ? 'text-right bage-success' : 'text-right bage-error'}><u>{count.fadao}</u></div>}
                    </Grid>
                </Grid>
                <Grid item xs={12} container className='link-box-pointer' onClick={() => setOpen({ ...open, mtopup: true })}>
                    <Grid item xs={2}><AddToPhotos /></Grid>
                    <Grid item xs={6}>Topup And M-Topup :</Grid>
                    <Grid item xs={4}>
                        {lMtopup ? <Skeleton animation="wave" /> : <div className={cMtopup > 0 ? 'text-right bage-success' : 'text-right bage-error'}><u>{cMtopup}</u></div>}
                    </Grid>
                </Grid>
                <Grid item xs={12} container className='link-box-pointer' onClick={() => setOpen({ ...open, topup: true })}>
                    <Grid item xs={2}><LocalAtm /></Grid>
                    <Grid item xs={6}>Topup Banking :</Grid>
                    <Grid item xs={4}>
                        {lTopup ? <Skeleton animation="wave" /> : <div className={cTopup > 0 ? 'text-right bage-success' : 'text-right bage-error'}><u>{cTopup}</u></div>}
                    </Grid>
                </Grid>
                <Grid item xs={12} container className='link-box-pointer' onClick={() => setOpen({ ...open, payment: true })}>
                    <Grid item xs={2}><MoneyOff /></Grid>
                    <Grid item xs={6}>Payment :</Grid>
                    <Grid item xs={4}>
                        {lPayment ? <Skeleton animation="wave" /> : <div className={cPayment > 0 ? 'text-right bage-success' : 'text-right bage-error'}><u>{cPayment}</u></div>}
                    </Grid>
                </Grid>
            </Grid>

            <Fadao open={open.fadao} cb={(e) => setOpen({ ...open, fadao: e })} count={(e) => setCount({ ...count, fadao: e })} stop={(e) => setLoading({ ...loading, fadao: e })} />
            <MTopup open={open.mtopup} cb={(e) => setOpen({ ...open, mtopup: e })} count={(e) => setCMtopup(e)} stop={(e) => setLMtopup(e)} />
            <Topup open={open.topup} cb={(e) => setOpen({ ...open, topup: e })} count={(e) => setCTopup(e)} stop={(e) => setLTopup(e)} />
            <Payment open={open.payment} cb={(e) => setOpen({ ...open, payment: e })} count={(e) => setCPayment(e)} stop={(e) => setLPayment(e)} />
        </>
    )
}

export default Banking