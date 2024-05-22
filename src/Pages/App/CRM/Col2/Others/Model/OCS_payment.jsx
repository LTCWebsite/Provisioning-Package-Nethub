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
                // console.log(res.data)
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
                                    { title: "ລະຫັດທຸລະກຳ", field: "ext_trans_id" },
                                    { title: "ເບີລູກຄ້າ", field: "pri_identity" },
                                    { title: "ປະເພດທຸລະກຳ", field: "trans_type", render: row => row?.trans_type === 'PPM' ? 'ຊຳລະເງິນ' : row?.trans_type === 'BLL' ? 'ຕັດໜີ້' :"Unknow" },
                                    { title: "ເລກທີ່ໃບແຈ້ງໜີ້", field: "invoice_number" },
                                    { title: "ເວລາດຳເນີນທຸລະກຳ", field: "transaction_time", render: row => moment(row?.transaction_time, 'YYYYMMDDHHmmss').add(7, 'hours').format("YYYY/MM/DD HH:mm:ss") },
                                    // { title: "ຈຳນວນໜີ້", field: "invoice_amount", render: row => parseInt(row?.invoice_amount).toLocaleString() },
                                    // { title: "ຍອດໜີ້ຍົງເຫຼືອ", field: "outstanding_amount", render: row => parseInt(row?.outstanding_amount).toLocaleString() },
                                    { title: "ຈຳນວນ", field: "transaction_amount", render: row => parseInt(row?.transaction_amount).toLocaleString() },
                                    { title: "ເງຶນ/ໜີ້ຄົງເຫຼືອ", field: "main_fund_account_balance", render: row => parseInt(row?.main_fund_account_balance).toLocaleString() },
                                    // { title: "ຍອດທີ່ບໍ່ທັນໃຊ້", field: "unused_amount", render: row => parseInt(row?.unused_amount).toLocaleString() },
                                    { title: "ໝາຍເຫດ", field: "remarks" },
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