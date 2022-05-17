import React from 'react';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import DatePick from '../../../../Pages/Components/DatePick'
import Search from '@material-ui/icons/Search';
import Crypt from '../../../../Pages/Components/Crypt';
import moment from 'moment';
import Cookies from 'js-cookie';
import MyTable from '../../../../Pages/MiniCRM/Table/Table'
import Doing from '../../../../Pages/Components/Doing'
import { LoadingTable } from '../../../../Loading/TableLoading'
import Axios from '../../../../Pages/Components/Axios';
import GetPhoneNumber from '../../../../Pages/Components/GetPhoneNumber';


export default function ModalBSS() {
    const [startDate, setStartDate] = React.useState(new Date())
    const [endDate, setEndDate] = React.useState(new Date())
    const [load, setLoad] = React.useState(false)
    const [data, setData] = React.useState([])

    const BSSFilter = () => {
        setLoad(true)
        var phone = GetPhoneNumber()
        var date_start = moment(startDate).format("YYYYDDMM")
        var date_end = moment(endDate).format("YYYYDDMM")
        Axios.get("BssNoneGroup?msisdn="+phone+"&startDate=" + date_start + "&endDate=" +date_end, { headers: { 'Authorization': 'Bearer ' + Cookies.get("one_session") } }).then(res => {
            if (res.status === 200) {
                var update = res.data.map((row, idx) => {
                    let date = row.date
                    row.id_idx = idx + 1
                    // row.mydate = date.substring(10, 8) + "-" + date.substring(8, 10) + "-" + date.substring(4, 0) + " " + date.substring(11, 19)
                    row.mydate = moment(date).format("DD-MM-YYYY HH:mm:ss")
                    return row
                })
                setData(update)
                setLoad(false)
            } else {
                Doing({
                    msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                    username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                    detail: 'BSS',
                    resualt: 'error',
                })
                setLoad(false)
            }
        }).catch(err => {
            console.log(err)
            Doing({
                msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                detail: 'BSS',
                resualt: 'error',
            })
            setLoad(false)
        })
    }

    const columns = [
        { title: 'ລ/ດ', field: 'id_idx', maxWidth: 100 },
        { title: 'invoice_no', field: 'invoice_no' },
        { title: 'receipt_no', field: 'receipt_no' },
        { title: 'payment_type', field: 'payment_type', minWidth: 200 },
        { title: 'username', field: 'username', minWidth: 80},
        { title: 'date', field: 'mydate',  minWidth: 200 },
        { title: 'charge_amount', field: 'charge_amount', type: 'numeric', minWidth: 100, render: row => row.charge_amount == null ? "" : parseInt(row.charge_amount).toLocaleString() },
        { title: 'paid_amount', field: 'paid_amount', type: 'numeric', minWidth: 100, render: row => row.paid_amount == null ? "" : parseInt(row.paid_amount).toLocaleString() },
        { title: 'balance_amount', field: 'balance_amount', minWidth: 100, type: 'numeric', render: row => row.balance_amount == null ? "" : parseInt(row.balance_amount).toLocaleString() },
        { title: 'amount_left', field: 'amount_left', minWidth: 100, type: 'numeric', render: row => row.amount_left == null ? "" : parseInt(row.amount_left).toLocaleString() },
    ]
    function ShowData() {
        return (
            <>
                <MyTable tTitle={"BSS [ " + moment(startDate).format("DD-MM-YYYY") + " ]"} tData={data} tColumns={columns} />
            </>
        )
    }

    return (
        <Grid container item xs={12}>
            <Grid container item xs={12}>
                <Grid item xs={12} lg={1}></Grid>
                <Grid container item xs={12} lg={10} spacing={2}>
                    <Grid item xs={5}>
                        <DatePick title="ວັນທີ່ເລີ່ມຕົ້ນ" date={startDate} onChange={setStartDate} />
                    </Grid>
                    <Grid item xs={5}>
                        <DatePick title="ວັນທີ່ສິ້ນສຸດ" date={endDate} onChange={setEndDate} />
                    </Grid>
                    <Grid item xs={2}>
                        <Button fullWidth variant="contained" className="btn-primary" style={{ marginTop: 25 }} onClick={BSSFilter}><Search /></Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ width: 1200 }}>

                    {load === true && <LoadingTable />}
                    {load === false && <ShowData />}

                </Grid>
            </Grid>
        </Grid>
    );
}
