import { Close } from '@mui/icons-material'
import { Dialog, DialogTitle, Grid, Tooltip } from '@mui/material'
import moment from 'moment'
import React from 'react'
import MyTable from '../../../../../../Components/MyTable'

function Call({ open, cb, data }) {
    // console.log('call', data)
    const columns = [
        { title: 'MSISDN', field: 'CallingPartyNumber' },
        { title: 'MSISDN', field: 'CalledPartyNumber', render: row => row.CalledPartyNumber.substr(0, 7) + "xxx" + row.CalledPartyNumber.substr(10) },
        { title: 'ເວລາເລີ່ມ', field: 'CustStart_Date', minWidth: 150, render: row => row.CustStart_Date.length > 15 ? moment(row.CustStart_Date).format("DD-MM-YYYY HH:mm:ss") : row.CustStart_Date.substr(6, 2) + "-" + row.CustStart_Date.substr(4, 2) + "-" + row.CustStart_Date.substr(0, 4) + " " + row.CustStart_Date.substr(8, 2) + ":" + row.CustStart_Date.substr(10, 2) + ":" + row.CustStart_Date.substr(12, 2) },
        { title: 'ເວລາສິ້ນສຸດ', field: 'CustStop_Date', minWidth: 150, render: row => row.CustStop_Date.length > 15 ? moment(row.CustStop_Date).format("DD-MM-YYYY HH:mm:ss") : row.CustStop_Date.substr(6, 2) + "-" + row.CustStop_Date.substr(4, 2) + "-" + row.CustStop_Date.substr(0, 4) + " " + row.CustStop_Date.substr(8, 2) + ":" + row.CustStop_Date.substr(10, 2) + ":" + row.CustStop_Date.substr(12, 2) },
        { title: 'ໄລຍະເວລາ (ວິນາທີ)', field: 'Duration' },
        { title: 'ຕັດເງີນ', field: 'Charge' , type: 'numeric', render: row => row.Charge.toLocaleString()},
        { title: 'ກ່ອນຕັດເງີນ', field: 'CurrentAmount' , type: 'numeric', render: row => row.CurrentAmount == null ? '-' :(parseInt(row.CurrentAmount)  + row.Charge).toLocaleString() },
        { title: 'ຫຼັງຕັດເງີນ', field: 'CurrentAmount', type: 'numeric', render: row => row.CurrentAmount == null ? '-' :(parseInt(row.CurrentAmount))?.toLocaleString() },
        

        // { title: 'Charge', field: 'Charge', type: 'numeric', render: row => row.Charge.toLocaleString() },
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
                        <DialogTitle className='center'>Call Log</DialogTitle>
                    </Grid>
                    <Grid item xs={3}>
                        <div className='right'><Close className='icon' onClick={() => cb(!open)} /></div>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} style={{ width: 1400 }}>
                        <MyTable tTitle={"Call Log"} tData={data} tColumns={columns} />
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default Call