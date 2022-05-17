import React from 'react'
import { Card, CardContent, Grid } from '@mui/material'
import ValueAddedService from '../../../Pages/MiniCRM/components/ValueAddedService'

function Vas() {
    return (
        <div>
            <Card style={{ marginTop: 10, borderBottom: "6px solid #E74A3B" }} elevation={0} className="box">
                <CardContent className="content-1">
                    <Grid container>
                        <ValueAddedService />
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default Vas
