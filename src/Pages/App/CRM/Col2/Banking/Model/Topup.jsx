import { Close } from '@mui/icons-material'
import { Dialog, Grid, Slide } from '@mui/material'
import moment from 'moment'
import React, { useState } from 'react'
import { AxiosReq } from '../../../../../../Components/Axios'
import TableTopup from './TableTopup'
import cookie from 'js-cookie'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

function Topup({ open, cb, stop, count }) {
    const [data, setData] = useState([])
    React.useEffect(() => {
        var phone = localStorage.getItem("ONE_PHONE")
        // var date_start = moment(new Date()).subtract(12, 'months').format("YYYY-MM-DD")
        // var date_end = moment(new Date()).format("YYYY-MM-DD")
        // var sendData = {
        //     msisdn: phone
        // }
        AxiosReq.get("CheckTopupBankingNew?msisdnn=" + phone,{ headers: { 'Authorization': 'Bearer ' + cookie.get("ONE_TOKEN") } }).then(res => {
            if (res.status === 200) {
                var num = 0
                var update = res.data.map(row => {
                    row.id_idx = num + 1
                    row.date_buy = moment(row.requestdate_).format("DD-MM-YYYY HH:mm:ss")
                    row.all_status = row.errcode_ === '20' ? false : true
                    num = num + 1
                    return row
                })
                setData(update)
                stop(false)
                count(num)
                console.log(res.data)
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
                        <Grid item xs={10}><div className="center"><h1>Topup Banking</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className='right'><Close className='icon' onClick={() => cb(!open)} /></div>
                        </Grid>
                        <Grid item xs={12}>
                            <TableTopup topupData={data} />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>

  
        </>
    )
}

export default Topup
