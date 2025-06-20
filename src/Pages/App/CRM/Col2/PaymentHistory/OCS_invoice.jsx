import { Paid, RemoveCircleOutline, Restore } from '@mui/icons-material'
import { Grid } from '@mui/material'
import React, { useState } from 'react'
import OCS_payment from '../Others/Model/OCS_payment'
import OCS_invoiceModal from '../Others/Model/OCS_invoice'
import QueryUnbar from '../Others/Model/QueryUnbar'

function OCS_invoice() {

    const [open, setopen] = useState({ invoice: false, payment: false, queryunbar: false })

    return (
        <Grid container>
            <Grid item xs={12} lg={6} container className='link-box-pointer' onClick={() => setopen({ ...open, invoice: true })}>
                <Grid item xs={4} className="right">
                    <Paid />&nbsp;
                </Grid>
                <Grid item xs={8}>Invoice ຂອງແຕ່ລະເດືອນ</Grid>
            </Grid>
            <Grid item xs={12} lg={6} container className='link-box-pointer' onClick={() => setopen({ ...open, payment: true })}>
                <Grid item xs={4} className="right">
                    <Restore />&nbsp;
                </Grid>
                <Grid item xs={8}>ປະຫວັດການຊຳລະ</Grid>
            </Grid>
            <Grid item xs={12} lg={6} container className='link-box-pointer' onClick={() => setopen({ ...open, queryunbar: true })}>
                <Grid item xs={4} className="right">
                    <RemoveCircleOutline />&nbsp;
                </Grid>
                <Grid item xs={8}>Query Unbar</Grid>
            </Grid>

            <OCS_payment
                open={open.payment}
                cb={(e) => setopen({ ...open, payment: e })}
            />
            <OCS_invoiceModal
                open={open.invoice}
                cb={(e) => setopen({ ...open, invoice: e })}
            />
            <QueryUnbar
                open={open.queryunbar}
                cb={(e) => setopen({ ...open, queryunbar: e })}
            />
        </Grid>
    )
}

export default OCS_invoice