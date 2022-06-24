import { AccountBalance, AccountBalanceWallet, AddBox, Savings, Textsms } from '@mui/icons-material'
import { Grid } from '@mui/material'
import React from 'react'

function Banking() {
    const list = [
        { name: 'Fadao', count: 7, icon: <AccountBalance /> },
        { name: 'Topup', count: 1, icon: <AccountBalanceWallet /> },
        { name: 'SMS Banking', count: 4, icon: <Textsms /> },
        { name: 'Payment', count: 9, icon: <Savings /> },
    ]
    return (
        <Grid container>
            {list.map((row, idx) => {
                return (
                    <Grid item xs={12} container className='link-box' key={idx}>
                        <Grid item xs={2}>{row.icon}</Grid>
                        <Grid item xs={6}>{row.name} :</Grid>
                        <Grid item xs={4}><div className='text-right'>{row.count}</div></Grid>
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default Banking