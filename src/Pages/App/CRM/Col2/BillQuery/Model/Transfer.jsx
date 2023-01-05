import { Close } from '@mui/icons-material'
import { Dialog, DialogTitle, Grid, Tooltip } from '@mui/material'
import moment from 'moment'
import React from 'react'
import MyTable from '../../../../../../Components/MyTable'

function Transfer({ open, cb, data }) {
    //console.log(data)
    const columns = [
        { title: 'ເບີໂອນ', field: 'PRI_IDENTITY' },
        { title: 'ເບີຮັບ', field: 'ReceipNumber', render: row => row.ReceipNumber.substr(0, 7) + "xxx" + row.ReceipNumber.substr(10) },
        { title: 'ເວລາ', field: 'TRANSFER_DATE', minWidth: 150, render: row => row.TRANSFER_DATE.length > 15 ? moment(row?.TRANSFER_DATE).format("DD-MM-YYYY HH:mm:ss") : row.TRANSFER_DATE.substr(6, 2) + "-" + row.TRANSFER_DATE.substr(4, 2) + "-" + row.TRANSFER_DATE.substr(0, 4) + " " + row.TRANSFER_DATE.substr(8, 2) + ":" + row.TRANSFER_DATE.substr(10, 2) + ":" + row.TRANSFER_DATE.substr(12, 2) },
        { title: 'TransType', field: 'EXT_TRANS_TYPE' },
        { title: 'ຈຳນວນໂອນ', field: 'CHG_BALANCE', type: 'numeric', render: row => row.CHG_BALANCE.toLocaleString() },
        { title: 'ຈຳນວນກ່ອນໂອນ', field: 'CUR_BALANCE', type: 'numeric', render: row => row.CUR_BALANCE.toLocaleString() },
        { title: 'ຈຳນວນຫຼັງໂອນ', field: 'CUR_BALANCE', type: 'numeric', render: row =>((row.CUR_BALANCE + row.CHG_BALANCE) - row.HANDLING_CHARGE).toLocaleString() },
        { title: 'ຄ່າທຳນຽມ', field: 'HANDLING_CHARGE', type: 'numeric', render: row => row.HANDLING_CHARGE.toLocaleString() },
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
                        <DialogTitle className='center'>Transfer Log</DialogTitle>
                    </Grid>
                    <Grid item xs={3}>
                        <div className='right'><Close className='icon' onClick={() => cb(!open)} /></div>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} style={{ width: 1400 }}>
                        <MyTable tTitle={"Transfer Log"} tData={data} tColumns={columns} />
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default Transfer