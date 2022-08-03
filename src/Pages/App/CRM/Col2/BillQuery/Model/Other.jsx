import { Close } from '@mui/icons-material'
import { Dialog, DialogTitle, Grid, Tooltip } from '@mui/material'
import moment from 'moment'
import React from 'react'
import MyTable from '../../../../../../Components/MyTable'

function Other({ open, cb, data }) {
    // console.log(data)
    const columns = [
        { title: 'MSISDN', field: 'msisdn' },
        { title: 'ເວລາ', field: 'ENTRY_DATE', minWidth: 150, render: row => row.ENTRY_DATE.length > 15 ? moment(row.ENTRY_DATE).format("DD-MM-YYYY HH:mm:ss") : row.ENTRY_DATE.substr(6, 2) + "-" + row.ENTRY_DATE.substr(4, 2) + "-" + row.ENTRY_DATE.substr(0, 4) + " " + row.ENTRY_DATE.substr(8, 2) + ":" + row.ENTRY_DATE.substr(10, 2) + ":" + row.ENTRY_DATE.substr(12, 2) },
        { title: 'Username', field: 'Username' },
        { title: 'CurrentBalance', field: 'CUR_BALANCE', render: row => row?.CUR_BALANCE?.toLocaleString() },
        { title: 'Charge', field: 'adjustAmount', type: 'numeric', render: row => row?.adjustAmount?.toLocaleString() },
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
                        <DialogTitle className='center'>Other Log</DialogTitle>
                    </Grid>
                    <Grid item xs={3}>
                        <div className='right'><Close className='icon' onClick={() => cb(!open)} /></div>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} style={{ width: 1400 }}>
                        <MyTable tTitle={"Other Log"} tData={data} tColumns={columns} />
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default Other