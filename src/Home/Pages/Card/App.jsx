import { Card, CardContent, Grid } from '@mui/material'
import React from 'react'
import Application from '../../../Pages/MiniCRM/components/Application'

function App() {
    return (
        <div>
            <Card style={{ marginTop: 10, borderBottom: "6px solid #5A5C69" }} elevation={0} className="box">
                <CardContent className="content-1">
                    <Grid container>
                        <Application />
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default App
