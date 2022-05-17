import React from 'react';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import DatePick from '../../../../Pages/Components/DatePick'
import Search from '@material-ui/icons/Search';
import Crypt from '../../../../Pages/Components/Crypt';
import moment from 'moment';
import MyTable from '../../../../Pages/MiniCRM/Table/Table'
import Doing from '../../../../Pages/Components/Doing'
import { LoadingTable } from '../../../../Loading/TableLoading'
import axios from 'axios';
import GetPhoneNumber from '../../../../Pages/Components/GetPhoneNumber';


export default function ModalOCSTransferLog() {
    const [startDate, setStartDate] = React.useState(new Date())
    const [endDate, setEndDate] = React.useState(new Date())
    const [load, setLoad] = React.useState(false)
    const [data, setData] = React.useState([])

    const CodaPayFilter = () => {
        setLoad(true)
        var phone = GetPhoneNumber()
        var date_start = moment(startDate).format("YYYYDDMM")
        var date_end = moment(endDate).format("YYYYDDMM")
        let sendData = {
            msisdn: phone,
            startDate: date_start,
            endDate: date_end,
            total: 1000,
            begin: 0,
            fetch: 1000
        }
        axios.post("http://172.28.14.49:3000/transferlog", sendData).then(res => {
            if (res.status === 200) {
                // console.log(res.data)
                var update = res.data.map((row, idx) => {
                    let mydate = row.trade_time
                    row.id_idx = idx + 1
                    row.date = mydate.substring(6, 8) + '-' + mydate.substring(4, 6) + '-' + mydate.substring(0, 4) + ' ' + mydate.substring(8, 10) + ':' + mydate.substring(10, 12) + ':' + mydate.substring(12, 14)
                    row.status = row.result_code === "0" ? 'success' : 'fail'
                    row.type = row.balance_info['arc:BalanceTypeName']
                    row.old_balance = row.balance_info['arc:OldBalanceAmt']
                    row.new_balance = row.balance_info['arc:NewBalanceAmt']
                    return row
                })
                setData(update)
                setLoad(false)
                // Doing({
                //     msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                //     username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                //     detail: 'check call detail',
                //     resualt: 'Operation successed.',
                // })
            } else {
                Doing({
                    msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                    username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                    detail: 'check ocs transfer log',
                    resualt: 'error',
                })
                setLoad(false)
            }
        }).catch(err => {
            console.log(err)
            Doing({
                msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                detail: 'check ocs transfer log',
                resualt: 'error',
            })
            setLoad(false)
        })
    }

    const columns = [
        { title: 'ລ/ດ', field: 'id_idx', maxWidth: 80 },
        { title: 'ເບີຕົ້ນທາງ', field: 'msisdn_request' },
        { title: 'ເບີປາຍທາງ', field: 'msisdn_destination' },
        { title: 'ເວລາ', field: 'date', minWidth: 200 },
        { title: 'ຕັດເງິນ', field: 'amount', minWidth: 150, type: 'numeric', render: row => parseInt(row.amount).toLocaleString() },
        { title: 'ຖັງເງິນ', field: 'type' },
        { title: 'ສະຖານະ', field: 'status', minWidth: 150 },
        { title: 'ຍອດເງິນກ່ອນໂອນ', field: 'old_balance', type: 'numeric', minWidth: 150, render: row => parseInt(row.old_balance).toLocaleString() },
        { title: 'ຍອດເງິນປະຈຸບັນ', field: 'new_balance', minWidth: 150, type: 'numeric', render: row => parseInt(row.new_balance).toLocaleString() },
    ]
    function ShowData() {
        return (
            <>
                <MyTable tTitle={"OCS Transfer Log [ " + moment(startDate).format("DD-MM-YYYY") + " ]"} tData={data} tColumns={columns} />
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
                        <Button fullWidth variant="contained" className="btn-primary" style={{ marginTop: 25 }} onClick={CodaPayFilter}><Search /></Button>
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
