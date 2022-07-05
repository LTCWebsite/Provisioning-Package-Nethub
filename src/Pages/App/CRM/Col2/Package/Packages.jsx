import { AccountTree, AddBox, AddToPhotos, Inventory2 } from '@mui/icons-material'
import { Grid } from '@mui/material'
import React from 'react'

function Packages() {
    const list = [
        { name: 'Query Package', count: 10, icon: <Inventory2 /> },
        { name: 'History Package', count: 10, icon: <AccountTree /> },
        { name: 'Special Package', count: 10, icon: <AddBox /> },
        { name: 'Buy Package', count: 5, icon: <AddToPhotos /> },
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

export default Packages