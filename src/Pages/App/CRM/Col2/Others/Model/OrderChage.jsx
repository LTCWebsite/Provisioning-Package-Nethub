import { Close } from '@mui/icons-material'
import { Dialog, DialogTitle, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { AxiosReq } from '../../../../../../Components/Axios'
import OrderChangTable from './OrderChangeTable'

function OrderChange({ open, cb, count, done, ifdone }) {
    const [total, setTotal] = React.useState(0)
    useEffect(() => {
        ifdone(done)
        let phone = localStorage.getItem("ONE_PHONE")
        AxiosReq.get("New_OrderChangeCount/count?msisdn=" + phone).then(res => {
            if (res.status === 200) {
                count(res.data?.total)
                setTotal(res.data?.total)
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
                        <DialogTitle className='center'>ປະຫວັດການປ່ຽນແປງ</DialogTitle>
                    </Grid>
                    <Grid item xs={3}>
                        <div className='right'><Close className='icon' onClick={() => cb(!open)} /></div>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} style={{ width: 1400 }}>
                        <OrderChangTable total={total} />
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default OrderChange