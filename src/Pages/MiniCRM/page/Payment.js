import React from 'react';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import DatePick from '../../Components/DatePick'
import Search from '@material-ui/icons/Search';
import Crypt from '../../Components/Crypt';
import moment from 'moment';
import Axios from '../../Components/Axios'
import LoadingLottie from '../../Components/LoadingLottie'
import MyTable from '../Table/Table'
import cookie from 'js-cookie'
import Doing from '../../Components/Doing'


export default function Payment() {
    const [startDate, setStartDate] = React.useState(new Date())
    const [endDate, setEndDate] = React.useState(new Date())
    const [load, setLoad] = React.useState(null)
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        setLoad(true)
        var sendData = {
            msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
            startDate: moment(startDate).format("YYYY-MM-DD"),
            endDate: moment(endDate).format("YYYY-MM-DD"),
        }
        Axios.post("payment", sendData, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.status === 200) {
                var num = 0
                var update = res?.map(row => {
                    row.id_idx = num + 1
                    row.date_buy = moment(row.deductDate).format("DD-MM-YYYY HH:mm:ss")
                    num = num + 1
                    return row
                })
                setData(update)
                setTimeout(() => {
                    setLoad(false)
                }, 200)
            }
            // console.log(res);
        }).catch(err => {
            setLoad(false)
        })
    }, [])
    const CodaPayFilter = () => {
        setLoad(true)
        var date_start = moment(startDate).format("YYYY-MM-DD")
        var date_end = moment(endDate).format("YYYY-MM-DD")
        var sendData = {
            msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
            startDate: date_start,
            endDate: date_end,
        }
        Axios.post("payment", sendData, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.status === 200) {
                var num = 0
                var update = res?.data?.map(row => {
                    row.id_idx = num + 1
                    row.date_buy = moment(row.deductDate).format("DD-MM-YYYY HH:mm:ss")
                    num = num + 1
                    return row
                })
                setData(update)
                setTimeout(() => {
                    setLoad(false)
                    Doing({
                        msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                        username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                        detail: 'check payment',
                        resualt: 'Operation successed.',
                    })
                }, 200)
            }
        }).catch(err => {
            setLoad(false)
            Doing({
                msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                detail: 'check payment',
                resualt: 'error',
            })
        })
    }

    const columns = [
        { title: 'NO', field: 'id_idx', maxWidth: 50 },
        { title: 'MSISDN', field: 'msisdn' },
        { title: 'Amount', field: 'amount' },
        { title: 'Transaction', field: 'seqNumber' },
        { title: 'Payment Type', field: 'paymentType' },
        { title: 'Receipt', field: 'zReceipt' },
        { title: 'Chanel', field: 'userID' },
        { title: 'Status', field: 'status', render: row => row?.status === 'R' ? 'Success' : row?.status !== 'R' ? 'Failed' : '-' },
        { title: 'Record Date', field: 'recordDate' },
        // { title: 'Bill Receipt', field: 'billReceipt' },
        // { title: 'orderDate', field: 'orderDate' },
    ]
    function ShowData() {
        return (
            <>
                <MyTable tTitle={"Payment [ " + moment(startDate).format("DD-MM-YYYY") + " - " + moment(endDate).format("DD-MM-YYYY") + " ]"} tData={data} tColumns={columns} />
            </>
        )
    }

    return (
        <Grid container>
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
                <Grid item xs={12}>

                    {load === true && <div style={{ height: 500, textAlign: 'center' }}><LoadingLottie height={300} isStopped={!load} /></div>}
                    {load === false && <ShowData />}

                </Grid>
            </Grid>
        </Grid>
    );
}
