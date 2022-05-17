import React from 'react'
import { Grid, Button, Card, CardContent, Select, MenuItem } from '@material-ui/core'
import Search from '@material-ui/icons/Search'
import LoadingLottie from '../../Components/LoadingLottie'
import Axios from '../../Components/Axios'
import MyTable from '../../MiniCRM/Table/Table'
import moment from 'moment'
import cookie from 'js-cookie'
import Crypt from '../../Components/Crypt'
import Doing from '../../Components/Doing'

function CheckMultiSerial() {
    const [data, setData] = React.useState([])
    const [serial, setSerial] = React.useState(null)
    const [stop, setStop] = React.useState(null)
    const [select, setSelect] = React.useState(0)
    const data20 = [
        { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 },
        { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 }
    ]
    const selectMe = (e) => {
        setSelect(e)
    }
    const [err, setErr] = React.useState(null)
    const changeValue = (e) => {
        if (e.length < 15) {
            e.length === 0 ? setErr(null) : setErr(false)
            setSerial(e)
        } else {
            setErr(true)
            setSerial(e)
        }
    }


    //////////////////////          Request Promise
    const ApiCall = (id) => {
        return Axios.get("CheckSerialNumber?serialnumber=" + id, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } })
    }
    async function processApi() {
        var mySerial = serial
        let allData = []
        let result
        for (let i = 0; i < select; i++) {
            let serial = parseInt(mySerial) + i
            result = await ApiCall(serial)
            let response = result.data.qryByBSResult
            let id = i + 1
            allData.push({ serial, response, id })
        }
        allData.map(row => {
            row.date = moment(row.cardStartDate).format("DD-MM-YYYY HH:mm:ss")
            return row
        })
        return allData
    }
    async function AllSelectValue() {
        setStop(true)
        let result = await processApi()
        setData(result)
        // console.log(result)
        setStop(false)
        Doing({
            msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
            username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
            detail: 'check multi serial',
            resualt: 'Operation successed.',
        })
    }
    const SearchSerial = () => {
        AllSelectValue()
    }
    const columns = [
        { title: 'No', field: 'id', maxWidth: 50 },
        { title: 'ເລກທີ (b/S)', field: 'serialNo', render: row => row.serialNo ?? '-' },
        // { title: 'Pin', field: 'response.pin_',render: row => row.response.pin_ ?? '-' },
        { title: 'ບັດຖືກເຕີມໄປໃຫ້ໝາຍເລກ', field: 'callingNumber', render: row => row.callingNumber ?? '-' },
        { title: 'ເວລາທີຖືກເຕີມ', field: 'tradeTime', render: row => row.tradeTime != null ? row.tradeTime.substr(6, 2) + "-" + row.tradeTime.substr(4, 2) + "-" + row.tradeTime.substr(0, 4) + " " + row.tradeTime.substr(8, 2) + ":" + row.tradeTime.substr(10, 2) + ":" + row.tradeTime.substr(12, 2) : '-' },
        { title: 'ຍອດເງີນໜ້າບັດ', field: 'faceValue', type: 'numeric', render: row => row.faceValue > 0 ? parseInt(row.faceValue).toLocaleString() + " LAK" : '-' },
        { title: 'ປະເພດເບີ', field: 'cardCosName' },
        { title: 'ວັນທີ່ສາມາດເລີ່ມນຳໃຊ້ບັດ', field: 'cardCosName', render: row => row.cardStartDate ? moment(row.cardStartDate).format("DD-MM-YYYY HH:mm:ss") : '-' },
        { title: 'ວັນທີ່ໝົດອາຍຸການນຳໃຊ້', field: 'cardCosName', render: row => row.cardStopDate ? moment(row.cardStopDate).format("DD-MM-YYYY HH:mm:ss") : '-' },
        { title: 'ສະຖານະຂອງບັດ', field: 'hotCardFlag', type: 'numeric', render: row => row.hotCardFlag !== null ? row.hotCardFlag === '1' ? <u className="dis_active">ບັດຖືກນຳໃຊ້ແລ້ວ</u> : row.hotCardFlag === '0' ? <u className="active">ບັດນີ້ສາມາດນຳໃຊ້ໄດ້</u> : '-' : '-' },
    ]


    return (
        <>
            <Grid container>
                <Grid container item xs={12}>
                    {/* <Grid item lg={2}></Grid> */}
                    <Grid item container lg={12} md={12}>
                        <Grid item xs={2}></Grid>
                        <Grid container item xs={8}>
                            <Grid item xs={6} style={{ paddingRight: 25 }}>
                                <input maxLength="15" className="input" value={serial} placeholder="Serial Number ..." onChange={(e) => { changeValue(e.target.value) }} />
                                {err === false ? <u className="red">Serial number must be 15 characters</u> : null}
                            </Grid>
                            <Grid item xs={3} style={{ paddingLeft: 45 }}>
                                <Select
                                    fullWidth
                                    defaultValue={0}
                                    onChange={(e) => { selectMe(e.target.value) }}
                                >
                                    <MenuItem value={0}>ຈຳນວນທີ່ຕ້ອງການຄົ້ນຫາ</MenuItem>
                                    {data20.map(row =>
                                        <MenuItem value={row.id}>{row.id}</MenuItem>
                                    ) ?? null}

                                </Select>
                            </Grid>
                            <Grid item xs={3} style={{ paddingLeft: 35, paddingBottom: 20 }}>
                                <Button fullWidth variant="contained" disabled={!err} className="btn-primary" onClick={SearchSerial}><Search /></Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            {stop === null || stop === true ? <Card>
                                <CardContent className="content-1">
                                    {stop === null && <><Grid item xs={12} style={{ paddingBottom: 50 }}>
                                        <h1 className="dialog-center">ກະລຸນາກົດຄົ້ນຫາ</h1>
                                    </Grid></>}
                                    {stop === true && <LoadingLottie isStopped={stop} />}

                                </CardContent>
                            </Card> : null}
                            {stop === false && <MyTable tTitle={"CheckMultiSerial"} tData={data} tColumns={columns} />}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default CheckMultiSerial
