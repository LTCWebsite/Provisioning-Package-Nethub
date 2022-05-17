import React from 'react'
import { Card, CardContent, Grid } from '@mui/material'
import Fadao from '../../../Pages/MiniCRM/components/Fadao'

function FaDao() {
    return (
        <div>
            <Card style={{ marginTop: 10, borderBottom: "6px solid #f6c23e" }} elevation={0} className="box">
                <CardContent className="content-1">
                    <Grid container>
                        <Fadao />
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default FaDao
