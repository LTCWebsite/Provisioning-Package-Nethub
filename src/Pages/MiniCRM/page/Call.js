import React from 'react';
import Button from '@material-ui/core/Button';
import { Grid, MenuItem, Select } from '@material-ui/core';
import DatePick from '../../Components/DatePick'
import Search from '@material-ui/icons/Search';
import Crypt from '../../Components/Crypt';
import moment from 'moment';
import Axios from '../../Components/Axios'
import LoadingLottie from '../../Components/LoadingLottie'
import MyTable from '../Table/Table'
import cookie from 'js-cookie'
import Doing from '../../Components/Doing'
import { LoadingTable } from '../../../Loading/TableLoading'
import axios from 'axios';
// import https from ''
import https from 'https';


export default function Call() {
    const [startDate, setStartDate] = React.useState(new Date())
    const [endDate, setEndDate] = React.useState(new Date())
    const [load, setLoad] = React.useState(null)
    const [phone, setPhone] = React.useState('')
    const [data, setData] = React.useState([])
    const [select, setSelect] = React.useState('a')
    React.useEffect(() => {
        setLoad(true)
        var newPhone = Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") })
        newPhone = newPhone.text
        setPhone(newPhone)

        // console.log("jveufbeufhejnfeufbneu")

        axios.post("http://172.28.14.48:3000/cbs_voice",
            {
                "query": {
                    "bool": {
                        "must": [
                            {
                                "match": {
                                    "CallingPartyNumber": "856" + newPhone
                                }
                            },
                            {
                                "range": {
                                    "@timestamp": {
                                        "gte": moment(new Date()).format("YYYY-MM-DD"),
                                        "lte": moment(new Date()).format("YYYY-MM-DD")
                                    }
                                }
                            }
                        ]
                    }
                },
                "sort": [
                    {
                      "@timestamp": {
                        "order": "desc"
                      }
                    }
                  ],
                "size": 2000
            },
            {
                auth: {
                    username: "one",
                    password: "#Ltc1qaz2wsx@one"
                }
            }).then(res => {

                // console.log("data : ", res.data.hits.hits)
                if (res.status === 200) {
                    if (res.data.hits.hits.length > 0) {

                        var num = 0
                        var update = res.data.hits.hits.map(row => {
                            let data = row._source
                            data.id_idx = num + 1
                            data.date_start = data.CustStart_Date.substr(0, 4) + '-' + data.CustStart_Date.substr(4, 2) + '-' + data.CustStart_Date.substr(6, 2) + ' ' + data.CustStart_Date.substr(8, 2) + ':' + data.CustStart_Date.substr(10, 2) + ':' + data.CustStart_Date.substr(12, 2)
                            console.log()
                            data.date_end = data.CustStop_Date.substr(0, 4) + '-' + data.CustStop_Date.substr(4, 2) + '-' + data.CustStop_Date.substr(6, 2) + ' ' + data.CustStop_Date.substr(8, 2) + ':' + data.CustStop_Date.substr(10, 2) + ':' + data.CustStop_Date.substr(12, 2)
                            data.phoneA = data.CallingPartyNumber.substr(0, 6) + 'XXX' + data.CallingPartyNumber.substr(9)
                            data.phoneB = data.CalledPartyNumber.substr(0, 6) + 'XXX' + data.CalledPartyNumber.substr(9)
                            num = num + 1
                            return data
                        })
                        // console.log({ update })
                        setData(update)
                    }
                    setTimeout(() => {
                        setLoad(false)
                    }, 200)
                }
            }).catch(err => {
                setLoad(false)
                console.log(err)
            })
    }, [])

    const CodaPayFilter = () => {
        setLoad(true)
        var date_start = moment(startDate).format("YYYY-MM-DD")
        var date_end = moment(endDate).format("YYYY-MM-DD")
        axios.post("http://172.28.14.48:3000/cbs_voice",
            {
                "query": {
                    "bool": {
                        "must": [
                            {
                                "match": select == "a" ?
                                    {
                                        "CallingPartyNumber": "856" + phone
                                    }
                                    :
                                    { "CalledPartyNumber": "856" + phone }
                            },
                            {
                                "range": {
                                    "@timestamp": {
                                        "gte": date_start,
                                        "lte": date_end
                                    }
                                }
                            }
                        ]
                    }
                },
                "sort": [
                    {
                      "@timestamp": {
                        "order": "desc"
                      }
                    }
                  ],
                "size": 2000
            },
            {
                auth: {
                    username: "one",
                    password: "#Ltc1qaz2wsx@one"
                }
            }).then(res => {

                // console.log("data : ", res.data.hits.hits)
                if (res.status === 200) {
                    if (res.data.hits.hits.length > 0) {

                        var num = 0
                        var update = res.data.hits.hits.map(row => {
                            let data = row._source
                            data.id_idx = num + 1
                            data.date_start = data.CustStart_Date.substr(0, 4) + '-' + data.CustStart_Date.substr(4, 2) + '-' + data.CustStart_Date.substr(6, 2) + ' ' + data.CustStart_Date.substr(8, 2) + ':' + data.CustStart_Date.substr(10, 2) + ':' + data.CustStart_Date.substr(12, 2)
                            console.log()
                            data.date_end = data.CustStop_Date.substr(0, 4) + '-' + data.CustStop_Date.substr(4, 2) + '-' + data.CustStop_Date.substr(6, 2) + ' ' + data.CustStop_Date.substr(8, 2) + ':' + data.CustStop_Date.substr(10, 2) + ':' + data.CustStop_Date.substr(12, 2)
                            data.phoneA = data.CallingPartyNumber.substr(0, 6) + 'XXX' + data.CallingPartyNumber.substr(9)
                            data.phoneB = data.CalledPartyNumber.substr(0, 6) + 'XXX' + data.CalledPartyNumber.substr(9)
                            num = num + 1
                            return data
                        })
                        // console.log({ update })
                        setData(update)
                    }
                    setTimeout(() => {
                        Doing({
                            msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                            username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                            detail: 'check call detail',
                            resualt: 'Operation successed.',
                        })
                        setLoad(false)
                    }, 200)
                }
            }).catch(err => {
                setLoad(false)
                Doing({
                    msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                    username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                    detail: 'check call detail',
                    resualt: 'error',
                })
            })
        // Axios.post("CheckCallDetail?msisdn=" + phone + "&startDate=" + date_start + "&endDate=" + date_end + "&callType=" + select, {}, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
        //     if (res.status === 200) {
        //         // console.log(res.data)
        //         if (res.data.length > 0) {
        //             var num = 0
        //             var update = res.data.map(row => {
        //                 row.id_idx = num + 1
        //                 row.date_start = row.startTime.substr(0, 4) + '-' + row.startTime.substr(4, 2) + '-' + row.startTime.substr(6, 2) + ' ' + row.startTime.substr(8, 2) + ':' + row.startTime.substr(10, 2) + ':' + row.startTime.substr(12, 2)
        //                 row.date_end = row.endTime.substr(0, 4) + '-' + row.endTime.substr(4, 2) + '-' + row.endTime.substr(6, 2) + ' ' + row.endTime.substr(8, 2) + ':' + row.endTime.substr(10, 2) + ':' + row.endTime.substr(12, 2)
        //                 row.duration = parseInt(row.duration)
        //                 row.phoneA = row.numberA.substr(0, 6) + 'XXX' + row.numberA.substr(9)
        //                 row.phoneB = row.numberB.substr(0, 6) + 'XXX' + row.numberB.substr(9)
        //                 num = num + 1
        //                 return row
        //             })
        //             setData(update)
        //         }
        //         setTimeout(() => {
        //             Doing({
        //                 msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
        //                 username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
        //                 detail: 'check call detail',
        //                 resualt: 'Operation successed.',
        //             })
        //             setLoad(false)
        //         }, 200)
        //     }
        // }).catch(err => {
        //     setLoad(false)
        //     Doing({
        //         msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
        //         username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
        //         detail: 'check call detail',
        //         resualt: 'error',
        //     })
        // })
    }


    // const CodaPayFilter = () => {
    //     setLoad(true)
    //     var date_start = moment(startDate).format("YYYYMMDD")
    //     var date_end = moment(endDate).format("YYYYMMDD")
    //     Axios.post("CheckCallDetail?msisdn=" + phone + "&startDate=" + date_start + "&endDate=" + date_end + "&callType=" + select, {}, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
    //         if (res.status === 200) {
    //             // console.log(res.data)
    //             if (res.data.length > 0) {
    //                 var num = 0
    //                 var update = res.data.map(row => {
    //                     row.id_idx = num + 1
    //                     row.date_start = row.startTime.substr(0, 4) + '-' + row.startTime.substr(4, 2) + '-' + row.startTime.substr(6, 2) + ' ' + row.startTime.substr(8, 2) + ':' + row.startTime.substr(10, 2) + ':' + row.startTime.substr(12, 2)
    //                     row.date_end = row.endTime.substr(0, 4) + '-' + row.endTime.substr(4, 2) + '-' + row.endTime.substr(6, 2) + ' ' + row.endTime.substr(8, 2) + ':' + row.endTime.substr(10, 2) + ':' + row.endTime.substr(12, 2)
    //                     row.duration = parseInt(row.duration)
    //                     row.phoneA = row.numberA.substr(0, 6) + 'XXX' + row.numberA.substr(9)
    //                     row.phoneB = row.numberB.substr(0, 6) + 'XXX' + row.numberB.substr(9)
    //                     num = num + 1
    //                     return row
    //                 })
    //                 setData(update)
    //             }
    //             setTimeout(() => {
    //                 Doing({
    //                     msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
    //                     username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
    //                     detail: 'check call detail',
    //                     resualt: 'Operation successed.',
    //                 })
    //                 setLoad(false)
    //             }, 200)
    //         }
    //     }).catch(err => {
    //         setLoad(false)
    //         Doing({
    //             msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
    //             username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
    //             detail: 'check call detail',
    //             resualt: 'error',
    //         })
    //     })
    // }
    const changeSelect = (e) => {
        setSelect(e)
    }

    const columns = [
        { title: 'ລ/ດ', field: 'id_idx', maxWidth: 80 },
        { title: 'ເບີຕົ້ນທາງ', field: 'phoneA' },
        { title: 'ເບີປາຍທາງ', field: 'phoneB' },
        { title: 'ຖັງເງິນ', field: 'BalanceType', minWidth: 120, render: row => row.BalanceType === '001' ? 'present balance' : row.BalanceType === '2103' ? 'free balance' : row.BalanceType === '1042' ? 'main balance' : '-' },
        { title: 'ເວລາເລີ່ມ', field: 'date_start', minWidth: 200 },
        { title: 'ເວລາສິ້ນສຸດ', field: 'date_end', minWidth: 200 },
        { title: 'ໄລຍະເວລາ', field: 'Duration' },
        { title: 'ຕັດເງິນ', field: 'Charge', type: 'numeric', render: row => row.Charge > 0 ? parseInt(row.Charge).toLocaleString() : row.Charge },
        { title: 'ຍອດເງິນປະຈຸບັນ', field: 'CurrentAmount', minWidth: 200, type: 'numeric', render: row => row.CurrentAmount > 0 ? parseInt(row.CurrentAmount).toLocaleString() : row.CurrentAmount },
    ]
    function ShowData() {
        return (
            <>
                <MyTable tTitle={"Call Detail [ " + moment(startDate).format("DD-MM-YYYY") + " ]"} tData={data} tColumns={columns} />
            </>
        )
    }

    return (
        <Grid container>
            <Grid container item xs={12}>
                <Grid item xs={12} lg={1}></Grid>
                <Grid container item xs={12} lg={10} spacing={2}>
                    <Grid item xs={4}>
                        <DatePick title="ວັນທີ່ເລີ່ມຕົ້ນ" date={startDate} onChange={setStartDate} />
                    </Grid>
                    <Grid item xs={4}>
                        <DatePick title="ວັນທີ່ສິ້ນສຸດ" date={endDate} onChange={setEndDate} />
                    </Grid>
                    <Grid item xs={2}>
                        <Select
                            style={{ marginTop: 32 }}
                            fullWidth
                            value={select}
                            onChange={(e) => changeSelect(e.target.value)}
                        >
                            <MenuItem value="a">ສາຍອອກ</MenuItem>
                            <MenuItem value="b">ສາຍເຂົ້າ</MenuItem>
                        </Select>
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
