import { Close } from '@mui/icons-material'
import { Dialog, Grid, Slide } from '@mui/material'
import React from 'react'
import { AxiosElastic } from '../../../../../../Components/Axios'
import BorrowAndDeductTabNew from './BorrowAndDeductTabNew'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

function BorrowNew({ open, cb, stop, count }) {
    React.useEffect(() => {
        var phone = localStorage.getItem("ONE_PHONE")
        var sendData = {
            "size": 0,
            "query": {
                "match": {
                    "Msisdn": phone
                }
            }
        }
        AxiosElastic.post("borrow-log*/_search", sendData).then(res => {
            if (res.status === 200) {
                stop(false)
                count(res.data.hits.total.value)
            }
        }).catch(err => {
            stop(false)
        })
    }, [open, count, stop])
    return (
        <>
            <Dialog
                maxWidth="xl"
                open={open}
                onClose={() => cb(!open)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
                PaperProps={{
                    style: { borderRadius: '16px', overflow: 'hidden' }
                }}
            >
                <Grid container style={{ width: 1400 }}>
                    <Grid item xs={12} className="premium-dialog-header">
                        <Grid container alignItems="center">
                            <Grid item xs={1}></Grid>
                            <Grid item xs={10}><div className="center"><h1>ຢືມ ແລະ ຕັດເງິນ (New)</h1></div></Grid>
                            <Grid item xs={1}>
                                <div className='right' style={{ paddingRight: '20px' }}>
                                    <Close className='premium-close-icon' onClick={() => cb(!open)} />
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ padding: '20px' }}>
                        <BorrowAndDeductTabNew />
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default BorrowNew
