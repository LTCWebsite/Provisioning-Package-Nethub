import React from 'react'
import { Card, Grid, CardContent } from '@mui/material'
import BalanceAndData from '../../../Pages/MiniCRM/components/BalanceAndData'

function BAndD() {
    return (
        <div>
            <Card style={{ marginTop: 10, borderBottom: "6px solid #1cc88a" }} elevation={0} className="box">
                <CardContent className="content-1">
                    <Grid container>
                        <BalanceAndData />
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default BAndD
