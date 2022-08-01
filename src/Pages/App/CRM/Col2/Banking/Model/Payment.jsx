import { Close } from '@mui/icons-material'
import { Dialog, Grid, Slide } from '@mui/material'
import axios from 'axios'
import moment from 'moment'
import React, { useState } from 'react'
import TablePayment from './TablePayment'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

function Payment({ open, cb, stop, count }) {
    const [data, setData] = useState([])
    React.useEffect(() => {
        var phone = localStorage.getItem("ONE_PHONE")
        var sendData = {
            "size": 10000,
            "query": {
                "match": {
                    "send_number": phone
                }
            }
        }
        axios.post("http://172.28.26.49:9200/payment/_search?filter_path=hits.hits._source", sendData, {
            auth: {
                username: "elastic",
                password: "#Ltc1qaz2wsx@es"
            }
        }).then(res => {
            if (res.status === 200) {
                let resp = res?.data?.hits?.hits
                let num = 0
                let update = resp?.map((row, idx) => {
                    row.idx = num + 1
                    row.date = moment(row._source.request_date).format("DD-MM-YYYY HH:mm:ss")
                    row.all_status = row._source.err_code === "1000" ? false : true
                    return row
                })
                if (update === undefined) {
                    count(0)
                    setData([])
                    stop(false)
                } else {
                    setData(update)
                    stop(false)
                    count(resp?.length)
                }
            }
        }).catch(er => {
            console.log(er)
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
                        <Grid item xs={10}><div className="center"><h1>Payment History</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className='right'><Close className='icon' onClick={() => cb(!open)} /></div>
                        </Grid>
                        <Grid item xs={12}>
                            <TablePayment topupData={data} />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default Payment
