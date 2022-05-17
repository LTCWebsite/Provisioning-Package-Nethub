import { Card, CardContent } from '@mui/material'
import React from 'react'
import BSSinfo from '../../../Pages/MiniCRM/components/BSSinfo'

function BssCard() {
    return (
        <Card style={{ marginTop: 10, borderBottom: "6px solid #5A5C69" }} elevation={0} className="box">
            <CardContent className="content-1">
                <BSSinfo />
            </CardContent>
        </Card>
    )
}

export default BssCard