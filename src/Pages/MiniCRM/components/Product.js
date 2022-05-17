import { Grid } from '@material-ui/core'
import React from 'react'

function Product() {
    return (
        <>
            <Grid item xs={12}><h2 className="center">Product: <label className="red">M Phone ( Prepaid )</label></h2></Grid>
            <Grid item xs={6}><div><b>Life Cycle:</b></div></Grid>
            <Grid item xs={6}><div> - </div></Grid>
            <Grid item xs={6}><div><b>Last Recharge:</b></div></Grid>
            <Grid item xs={6}><div> - </div></Grid>
            <Grid item xs={6}><div><b>Active Stop:</b></div></Grid>
            <Grid item xs={6}><div> - </div></Grid>
            <Grid item xs={6}><div><b>Suspend:</b></div></Grid>
            <Grid item xs={6}><div> - </div></Grid>
            <Grid item xs={6}><div><b>Disable:</b></div></Grid>
            <Grid item xs={6}><div> - </div></Grid>
            <Grid item xs={6}><div><b>Black List:</b></div></Grid>
            <Grid item xs={6}><div> - </div></Grid>
        </>
    )
}

export default Product
