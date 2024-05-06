import { Close, Search } from '@mui/icons-material'
import { Button, CircularProgress, Dialog, Grid, Slide } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AxiosCBS } from '../../../../../../Components/Axios'
import MyTable from '../../../../../../Components/MyTable'
import moment from 'moment'
import { DatePicker } from 'antd';
import dayjs from 'dayjs'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

function OCS_invoice({ open, cb }) {
    const [date, setdate] = useState({ start: dayjs(moment(new Date()).format("YYYY-MM"), 'YYYY-MM'), end: dayjs(moment(new Date()).format("YYYY-MM"), 'YYYY-MM') })
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(false)
    const [btn, setbtn] = useState(false)

    const SearchInvoice = () => {
        setbtn(true)
        setloading(true)
        let sendData = {
            "msisdn": localStorage.getItem("ONE_PHONE"),
            "start": moment(date.start).format("YYYY-MM") + "-01",
            "end": moment(date.end).format("YYYY-MM") + "-01"
        }
        AxiosCBS.post("query_invoice", sendData).then(res => {
            if (res.status === 200) {
                let arr = []
                let all = res.data?.data.map(row => {
                    if (row?.invoice_data?.length > 1) {
                        row?.invoice_data.map(r1 => {
                            if (r1?.InvoiceNo?.includes('M')) {
                                arr.push({
                                    dateTime: row?.dateTime,
                                    invoice_data: [r1]
                                })
                            }
                        })
                    } else {
                        arr.push(row)
                    }
                })
                arr.sort((a,b) => new Date(a.dateTime) - new Date(b.dateTime))
                setdata(arr)
                // console.log(arr)
            }
            setloading(false)
        }).catch(er => {
            setloading(false)
        })
    }
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
                <Grid container style={{ width: 1200 }}>
                    <Grid item container xs={12}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}><div className="center"><h1>Invoice ຂອງແຕ່ລະເດືອນ</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className='right'><Close className='icon' onClick={() => cb(!open)} /></div>
                        </Grid>
                        <Grid item xs={12} container spacing={2} style={{ padding: 30 }}>
                            <Grid item xs={12} lg={5}>
                                <div>ວັນທີ່ເລີ່ມ</div>
                                <DatePicker
                                    style={{ width: '100%' }}
                                    defaultValue={date.start}
                                    getPopupContainer={(triggerNode) => {
                                        return triggerNode.parentNode;
                                    }}
                                    onChange={(e, a) => setdate({ ...date, start: a })}
                                    picker='month'
                                />
                            </Grid>
                            <Grid item xs={12} lg={5}>
                                <div>ວັນທີ່ສິ້ນສຸດ</div>
                                <DatePicker
                                    style={{ width: '100%' }}
                                    onChange={(e, a) => setdate({ ...date, end: a })}
                                    defaultValue={date.end}
                                    getPopupContainer={(triggerNode) => {
                                        return triggerNode.parentNode;
                                    }}
                                    picker='month'
                                />
                            </Grid>
                            <Grid item xs={12} lg={2}>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    style={{ marginTop: 20 }}
                                    onClick={SearchInvoice}
                                >
                                    <Search />
                                </Button>
                            </Grid>


                        </Grid>
                        <Grid item xs={12} style={{ minHeight: 300 }}>
                            {btn === false ? <center>
                                <h1>ກະລຸນາເລືອກເວລາ ເພື່ອຄົ້ນຫາ</h1>
                            </center> : <>
                                {loading ?
                                    <center style={{ marginTop: 50 }}>
                                        <CircularProgress color='error' />
                                        <div><u>loading...</u></div>
                                    </center>
                                    : <MyTable
                                        tData={data}
                                        tTitle={"ປະຫວັດການຊຳລະ"}
                                        load={loading}
                                        tColumns={[
                                            // { title: "Msisdn", field: "PrimaryIdentity", render: row => row?.invoice_data[0]?.PrimaryIdentity },
                                            { title: "ໜີ້ປະຈຳເດືອນ", field: "dateTime" },
                                            { title: "ລະຫັດບັນຊີ", field: "AcctCode", render: row => row?.invoice_data[0]?.AcctCode },
                                            { title: "ປະເພດບິນ", field: "TransType", render: row => row?.invoice_data[0]?.TransType },
                                            { title: "ຕ້ອງຊຳລະກ່ອນ", field: "DueDate", render: row => moment(row?.invoice_data[0]?.DueDate, 'YYYYMMDDHHmmss').format("DD/MM/YYYY") },
                                            { title: "ຮອບວຽນເລີ່ມຕົ້ນ", field: "BillCycleBeginTime", render: row => moment(row?.invoice_data[0]?.BillCycleBeginTime, 'YYYYMMDDHHmmss').format("DD/MM/YYYY") },
                                            { title: "ຮອບວຽນສິ້ນສຸດ", field: "BillCycleEndTime", render: row => moment(row?.invoice_data[0]?.BillCycleEndTime, 'YYYYMMDDHHmmss').format("DD/MM/YYYY") },
                                            { title: "ຈຳນວນຍອດໜີ້", field: "InvoiceAmount", render: row => parseInt(row?.invoice_data[0]?.InvoiceAmount).toLocaleString() },
                                            // { title: "Outstanding_Amount", field: "outstanding_amount", render: row => parseInt(row?.outstanding_amount).toLocaleString() },
                                            // { title: "Transaction_Amount", field: "transaction_amount", render: row => parseInt(row?.transaction_amount).toLocaleString() },
                                            // { title: "Unused_Amount", field: "unused_amount", render: row => parseInt(row?.unused_amount).toLocaleString() },
                                            // { title: "Remarks", field: "remarks" },
                                        ]}
                                    />}
                            </>}
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default OCS_invoice