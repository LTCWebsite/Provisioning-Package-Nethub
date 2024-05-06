import { Close } from '@mui/icons-material'
import { Dialog, Grid, Slide } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AxiosCBS } from '../../../../../../Components/Axios'
import MyTable from '../../../../../../Components/MyTable'
import moment from 'moment'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

function OCS_payment({ open, cb }) {
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(false)

    useEffect(() => {
        setloading(true)
        let sendData = {
            "msisdn": localStorage.getItem("ONE_PHONE")
        }
        AxiosCBS.post("payment_info", sendData).then(res => {
            if (res.status === 200) {
                setdata(res.data)
            }
            setloading(false)
        }).catch(er => {
            setloading(false)
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
                        <Grid item xs={10}><div className="center"><h1>ປະຫວັດການຊຳລະ</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className='right'><Close className='icon' onClick={() => cb(!open)} /></div>
                        </Grid>
                        <Grid item xs={12}>
                            <MyTable
                                tData={data?.data}
                                tTitle={"ປະຫວັດການຊຳລະ"}
                                load={loading}
                                tColumns={[
                                    { title: "Pri_Identity", field: "pri_identity" },
                                    { title: "Trans_Type", field: "trans_type" },
                                    { title: "Transaction_Time", field: "transaction_time", render: row => moment(row?.transaction_time, 'YYYYMMDDHHmmss').add(7, 'hours').format("YYYY/MM/DD HH:mm:ss") },
                                    { title: "Invoice_Amount", field: "invoice_amount", render: row => parseInt(row?.invoice_amount).toLocaleString() },
                                    { title: "Outstanding_Amount", field: "outstanding_amount", render: row => parseInt(row?.outstanding_amount).toLocaleString() },
                                    { title: "Transaction_Amount", field: "transaction_amount", render: row => parseInt(row?.transaction_amount).toLocaleString() },
                                    { title: "Unused_Amount", field: "unused_amount", render: row => parseInt(row?.unused_amount).toLocaleString() },
                                    { title: "Remarks", field: "remarks" },
                                ]}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default OCS_payment