import { Close } from '@mui/icons-material'
import { Dialog, DialogTitle, Grid, Tooltip } from '@mui/material'
import moment from 'moment'
import React from 'react'
import MyTable from '../../../../../../Components/MyTable'

function Add({ open, cb, data }) {
    const columns = [
        { title: 'MSISDN', field: 'PRI_IDENTITY' },
        { title: 'ເວລາ', field: 'TimeStamp', minWidth: 150, render: row => row.TimeStamp.length > 15 ? moment(row.TimeStamp).format("DD-MM-YYYY HH:mm:ss") : row.TimeStamp.substr(6, 2) + "-" + row.TimeStamp.substr(4, 2) + "-" + row.TimeStamp.substr(0, 4) + " " + row.TimeStamp.substr(8, 2) + ":" + row.TimeStamp.substr(10, 2) + ":" + row.TimeStamp.substr(12, 2) },
        { title: 'CardSequence', field: 'CARD_SEQUENCE' },
        { title: 'LoginSystemCode', field: 'LoginSystemCode' },
        { title: 'Charge', field: 'CHG_BALANCE', type: 'numeric', render: row => row.CHG_BALANCE.toLocaleString() },
    ]

    return (
        <>
            <Dialog
                open={open}
                onClose={() => cb(!open)}
                maxWidth={1400}
            >
                <Grid container>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                        <DialogTitle className='center'>Log ເຕີມເງິນ</DialogTitle>
                    </Grid>
                    <Grid item xs={3}>
                        <div className='right'><Close className='icon' onClick={() => cb(!open)} /></div>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} style={{ width: 1400 }}>
                        <MyTable tTitle={"Log ເຕີມເງິນ"} tData={data} tColumns={columns} />
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default Add