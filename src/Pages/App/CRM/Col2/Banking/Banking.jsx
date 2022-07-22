import { AccountBalance, AccountBalanceWallet, AddBox, AddToPhotos, MonetizationOn, PhonelinkSetup, Savings, Textsms } from '@mui/icons-material'
import { Grid, Skeleton } from '@mui/material'
import React, { useState } from 'react'
import Mservice from './Model/Mservice'

function Banking() {
    const [open, setOpen] = useState({ mservice: false, mmoney: false, topup: false })
    const [count, setCount] = useState({ mservice: 0 })
    const [loading, setLoading] = useState({ mservice: true })

    return (
        <>
            <Grid container>
                <Grid item xs={12} container className='link-box-pointer' onClick={() => setOpen({ ...open, mservice: true })}>
                    <Grid item xs={2}><PhonelinkSetup /></Grid>
                    <Grid item xs={6}>M-Service :</Grid>
                    <Grid item xs={4}>
                        {loading.mservice ? <Skeleton animation="wave" /> : <div className={count.mservice > 0 ? 'text-right bage-success' : 'text-right bage-error'}><u>{count.mservice}</u></div>}
                    </Grid>
                </Grid>
                <Grid item xs={12} container className='link-box-pointer'>
                    <Grid item xs={2}><MonetizationOn /></Grid>
                    <Grid item xs={6}>M-Money :</Grid>
                    <Grid item xs={4}><div className='text-right'>5</div></Grid>
                </Grid>
                <Grid item xs={12} container className='link-box-pointer'>
                    <Grid item xs={2}><AddToPhotos /></Grid>
                    <Grid item xs={6}>Topup Banking :</Grid>
                    <Grid item xs={4}><div className='text-right'>5</div></Grid>
                </Grid>
            </Grid>

            <Mservice open={open.mservice} cb={(e) => setOpen({ ...open, mservice: e })} count={(e) => {
                // setCount({ ...count, mservice: e.c })
                // setLoading({ ...loading, mservice: e.loading })
                console.log(e)
            }} />
        </>
    )
}

export default Banking