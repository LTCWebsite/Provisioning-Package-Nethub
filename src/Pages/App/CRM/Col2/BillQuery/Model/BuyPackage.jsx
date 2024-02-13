import { Close } from '@mui/icons-material'
import { Dialog, DialogTitle, Grid, Tooltip } from '@mui/material'
import moment from 'moment'
import React from 'react'
import MyTable from '../../../../../../Components/MyTable'

function BuyPackage({ open, cb, data }) {
    // console.log(data)
    const columns = [
        // { title: 'Transaction ID', field: 'Ext_transID' },
        { title: 'ເບີໂທ', field: 'msisdn' },
        { title: 'ເວລາ', field: 'ENTRY_DATE', minWidth: 150, render: row =>row.ENTRY_DATE.length > 15 ? moment(row.ENTRY_DATE).format("DD-MM-YYYY HH:mm:ss") : row.ENTRY_DATE.substr(6, 2) + "-" + row.ENTRY_DATE.substr(4, 2) + "-" + row.ENTRY_DATE.substr(0, 4) + " " + row.ENTRY_DATE.substr(8, 2) + ":" + row.ENTRY_DATE.substr(10, 2) + ":" + row.ENTRY_DATE.substr(12, 2) },
        { title: 'USER', field: 'Username' },
        // { title: 'CurrentBalance', field: 'CUR_BALANCE', render: row => row.CUR_BALANCE.toLocaleString() },
        // { title: 'Charge', field: 'CHG_BALANCE', type: 'numeric', render: row => row.CHG_BALANCE.toLocaleString() },
        { title: 'ມູນຄ່າແພັກເກັດ', field: 'CHG_BALANCE', type: 'numeric', render: row => row.CHG_BALANCE.toLocaleString() },
        { title: 'ຈຳນວນເງີນກ່ອນ', field: 'CUR_BALANCE', type: 'numeric',render: row=>(row.CUR_BALANCE + row.CHG_BALANCE).toLocaleString() },
        { title: 'ຈຳນວນເງີນຫຼັງ', field: 'CUR_BALANCE' , type: 'numeric', render: row => row.CUR_BALANCE.toLocaleString() },
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
                        <DialogTitle className='center'>Package Log</DialogTitle>
                    </Grid>
                    <Grid item xs={3}>
                        <div className='right'><Close className='icon' onClick={() => cb(!open)} /></div>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} style={{ width: 1400 }}>
                        <MyTable tTitle={"Package Log"} tData={data} tColumns={columns} />
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default BuyPackage