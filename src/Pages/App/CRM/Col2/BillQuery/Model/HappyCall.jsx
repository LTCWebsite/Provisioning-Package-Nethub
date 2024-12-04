import { Close } from '@mui/icons-material'
import { Dialog, DialogTitle, Grid, Tooltip } from '@mui/material'
import moment from 'moment'
import React from 'react'
import MyTable from '../../../../../../Components/MyTable'

function HappyCall({ open, cb, data }) {
    //  console.log(data)
    const columns = [
        { title: 'ເບີໂທ', field: 'msisdn' },
        { title: 'ເວລາ', field: 'ENTRY_DATE', minWidth: 150, render: row => row.ENTRY_DATE.length > 15 ? moment(row.ENTRY_DATE).format("DD-MM-YYYY HH:mm:ss") : row.ENTRY_DATE.substr(6, 2) + "-" + row.ENTRY_DATE.substr(4, 2) + "-" + row.ENTRY_DATE.substr(0, 4) + " " + row.ENTRY_DATE.substr(8, 2) + ":" + row.ENTRY_DATE.substr(10, 2) + ":" + row.ENTRY_DATE.substr(12, 2) },
        { title: 'USER', field: 'Username' },
        // { title: 'ຊ່ອງທາງ', field: 'Chanel' , minWidth: 150, render: row => row.CHG_BALANCE == "200" ? "Debug":"Happycall" },
        {
            title: 'ຊ່ອງທາງ', field: 'Chanel', render: row => <u style={{
                backgroundColor: row.CHG_BALANCE == "200" ? "#E74A3B":"#8d99ae",
                color: '#fff',
                padding: '2px 10px'
            }}>Debug Game</u>
        },
        { title: 'ຈຳນວນເງີນຕັດ', field: 'CHG_BALANCE', type: 'numeric', render: row => row.CHG_BALANCE.toLocaleString() },
        { title: 'ຈຳນວນເງີນກ່ອນຕັດ', field: 'CUR_BALANCE', render: row => row.CUR_BALANCE.toLocaleString() },
        { title: 'ຈຳນວນເງີນຫຼັງການຕັດ', field: 'CUR_BALANCE', type: 'numeric', render: row => (row.CUR_BALANCE - row.CHG_BALANCE).toLocaleString() },
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
                        <DialogTitle className='center'>Debug Game</DialogTitle>
                    </Grid>
                    <Grid item xs={3}>
                        <div className='right'><Close className='icon' onClick={() => cb(!open)} /></div>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} style={{ width: 1400 }}>
                        <MyTable tTitle={"Debug Game"} tData={data} tColumns={columns} />
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default HappyCall