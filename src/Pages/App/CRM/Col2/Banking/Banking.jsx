import { AccountBalance, AccountBalanceWallet, AddBox, AddToPhotos, MonetizationOn, PhonelinkSetup, Savings, Textsms } from '@mui/icons-material'
import { Grid } from '@mui/material'
import React, { useState } from 'react'

function Banking() {
    const [open, setOpen] = useState({ mservice: false, mmoney: false, topup: false })

    return (
        <>
            <Grid container>
                <Grid item xs={12} container className='link-box-pointer'>
                    <Grid item xs={2}><PhonelinkSetup /></Grid>
                    <Grid item xs={6}>M-Service :</Grid>
                    <Grid item xs={4}><div className='text-right'>5</div></Grid>
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
        </>
    )
}

export default Banking