import { Close } from '@mui/icons-material'
import { Dialog, DialogTitle, Grid, Tooltip } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import MyTable from '../../../../../../Components/MyTable'
import moment from 'moment'

function SmsTicket({ open, cb, count, done, ifdone }) {
    const [sms, setSms] = React.useState({ st: '', data: [] })

    const columns_sms = [
        { title: 'No', field: 'id_idx', maxWidth: 50 },
        { title: 'MSISDN', field: 'ContactNumber' },
        { title: 'ເວລາຊື້', field: 'date_send', minWidth: 150 },
        {
            title: 'Star', field: 'star', maxWidth: 70, render: row => <u style={{
                backgroundColor: parseInt(row.star) === 0 ? '#5A5C69' : parseInt(row.star) <= 60 ? '#E74A3B' : parseInt(row.star) <= 80 ? '#F6C23D' : '#1DC88A',
                color: '#fff',
                padding: '2px 10px'
            }}>{row?.star === 0 ? 0 : row.star.substring(0, row.star.length - 1)}</u>
        },
        { title: 'Classification', field: 'ClassificationID', render: row => row.ClassificationID.length < 20 ? row.ClassificationID : <Tooltip title={row.ClassificationID}><div>{row.ClassificationID.substring(0, 20)}</div></Tooltip> },
        { title: 'Memo', field: 'Memo' },
        { title: 'Status', field: 'Status' },
        { title: 'Message', field: 'Message', render: row => row.Message.length < 40 ? row.Message : <Tooltip title={row.Message}><div>{row.Message.substring(0, 40)}...</div></Tooltip> },
        { title: 'Comment', field: 'comment', render: row => row.comment.length < 40 ? row.comment : <Tooltip title={row.comment}><div>{row.comment.substring(0, 40)}</div></Tooltip> },
    ]

    useEffect(() => {
        ifdone(done)
        let phone = localStorage.getItem("ONE_PHONE")
        axios.post("http://172.28.14.49:4100/sms_ticket", {
            page: 1,
            limit: 100,
            msisdn: phone
        }, {
            auth: {
                username: "LTC",
                password: "#Ltc1qaz2wsx"
            }
        }).then(res => {
            if (res.status === 200) {
                let num = 0
                var update = res.data.data.map(row => {
                    row.id_idx = num + 1
                    row.date_send = moment(row.created_date).format("DD-MM-YYYY HH:mm:ss")
                    row.star = row.star === 0 ? 0 : row.star.toString()
                    num = num + 1
                    return row
                })
                count(num)
                setSms({ st: res.data.data.length, data: update })
                ifdone(!done)
            }
        }).catch(er => {
            ifdone(!done)
            count(0)
        })
    }, [])
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
                        <DialogTitle className='center'>SMS Ticket History</DialogTitle>
                    </Grid>
                    <Grid item xs={3}>
                        <div className='right'><Close className='icon' onClick={() => cb(!open)} /></div>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} style={{ width: 1400 }}>
                        <MyTable tTitle={"SMS Ticket History"} tData={sms.data} tColumns={columns_sms} />
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default SmsTicket