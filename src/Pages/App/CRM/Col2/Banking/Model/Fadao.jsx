import { Close } from '@mui/icons-material'
import { Dialog, Grid, Slide } from '@mui/material'
import moment from 'moment'
import React, { useState } from 'react'
import { AxiosReq } from '../../../../../../Components/Axios'
import BorrowAndDeductTab from './BorrowAndDeductTab'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

function Fadao({ open, cb, stop, count }) {
    const [data, setData] = useState([])
    React.useEffect(() => {
        var phone = localStorage.getItem("ONE_PHONE")
        AxiosReq.get("BorrowfadaoAndKalsym?msisdn_=" + phone).then(res => {
            if (res.status === 200) {
                var num = 0
                var update = res.data.map(row => {
                    row.id_idx = num + 1
                    row.date_buy = moment(row.recordDate).format("DD-MM-YYYY HH:mm:ss")
                    row.date_pay = moment(row.lastdatetime).format("DD-MM-YYYY HH:mm:ss")
                    num = num + 1
                    return row
                })
                setData(update)
                stop(false)
                count(num)
            }
        }).catch(err => {
            stop(false)
        })
    }, [])
    return (
        <>
            <Dialog
                maxWidth="xl"
                open={open}
                onClose={() => cb(!open)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container style={{ width: 1400 }}>
                    <Grid item container xs={12}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}><div className="center"><h1>ຢືມ ແລະ ຕັດເງິນ ຟ້າດາວ</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className='right'><Close className='icon' onClick={() => cb(!open)} /></div>
                        </Grid>
                        <Grid item xs={12}>
                            <BorrowAndDeductTab bor={data} />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default Fadao
