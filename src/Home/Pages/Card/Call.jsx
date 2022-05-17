import React from 'react'
import { Card, CardContent, Grid } from '@mui/material'
import SimInformation from '../../../Pages/MiniCRM/components/SimInformation'

function Call() {
    return (
        <div>
            <Card style={{ marginTop: 10, borderBottom: "6px solid #1cc88a" }} elevation={0} className="box">
                <CardContent className="content-1">
                    <Grid container>
                        <SimInformation />
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default Call
