import { Close } from '@mui/icons-material'
import { Dialog, DialogTitle, Grid, Tooltip } from '@mui/material'
import moment from 'moment'
import React from 'react'
import MyTable from '../../../../../../Components/MyTable'

function All({ open, cb, data }) {
    // console.log(data)
    const columns = [
        { title: 'MSISDN', field: 'msisdn', render: row => row.msisdn === undefined ? row.CallingPartyNumber === undefined ? row?.PRI_IDENTITY : row.CallingPartyNumber : row.msisdn },
        { title: 'MSISDN', field: 'CalledPartyNumber', render: row => row?.CalledPartyNumber === undefined ? null : row?.CalledPartyNumber?.substr(0, 7) + "xxx" + row?.CalledPartyNumber?.substr(10) },
        { title: 'ເວລາ', field: '@timestamp', minWidth: 150, render: row => moment(row['@timestamp']).format('DD-MM-YYYY HH:mm:ss') },
        { title: 'Username', field: 'Username' },
        {
            title: 'Type', field: 'type', render: row => <u style={{
                backgroundColor: row.type === "Add" ? '#1DC88A' : row.type === "Sms" ? '#023e8a' : row.type === "Package" ? '#ffb703' : row.type === "Game" ? '#E74A3B' : row.type === 'Call' ? '#fb5607' : row.type === 'Mmoney' ? '#ff006e' : row.type === "Vote" ? '#9b5de5' : row.type === "Transfer" ? '#9e0059' : row.type==="happyCall" &&  row.CHG_BALANCE == "200" ? "#E74A3B":"#8d99ae"  ,
                color: '#fff',
                padding: '2px 10px'
            }}>{row.type==="happyCall" &&  row.CHG_BALANCE == "200" ? "Debug" : row.type}</u>
        },
        { title: 'CurrentBalance', field: 'CUR_BALANCE', render: row => row?.CUR_BALANCE?.toLocaleString() },
        { title: 'Charge', field: 'CHG_BALANCE', type: 'numeric', render: row => row?.adjustAmount === 0 || row?.adjustAmount === undefined ? row.Charge === undefined ? 0 : row.Charge?.toLocaleString() : row?.CHG_BALANCE?.toLocaleString() },
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
                        <DialogTitle className='center'>All Log</DialogTitle>
                    </Grid>
                    <Grid item xs={3}>
                        <div className='right'><Close className='icon' onClick={() => cb(!open)} /></div>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} style={{ width: 1400 }}>
                        <MyTable tTitle={"All Log"} tData={data} tColumns={columns} />
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default All

