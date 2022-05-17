import React from 'react'
import LoadingLottie from '../../Components/LoadingLottie'
import MyTable from '../Table/Table'
import Axios from '../../Components/Axios'
import GetPhoneNumber from '../../Components/GetPhoneNumber'
import moment from 'moment'
import { Grid } from '@material-ui/core'
import SmsBankingDialog from '../page/SmsBankingDialog'
import cookie from 'js-cookie'
import Crypt from '../../Components/Crypt'
import Doing from '../../Components/Doing'
import { Alert } from '@material-ui/lab'

function SmsBanking() {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        var phone = GetPhoneNumber()
        Axios.get("CheckSmSBankingNew?msisdnn=" + phone, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.status === 200) {
                var num = 0
                var update = res.data.map(row => {
                    row.id_idx = num + 1
                    row.date_buy = moment(row.record_date).format("DD-MM-YYYY HH:mm:ss")
                    row.all_status = row.errcode_ === '20' ? false : true
                    num = num + 1
                    return row
                })
                setData(update)
                setTimeout(() => {
                    setStop(true)
                }, 200)
                // console.log(update)
                Doing({
                    msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                    username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                    detail: 'check sms banking',
                    resualt: 'Operation successed.',
                })
            }
        }).catch(err => {
            setStop(true)
            Doing({
                msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                detail: 'check sms banking',
                resualt: 'error',
            })
        })
    }, [])
    const columns = [
        { title: 'No', field: 'id_idx', maxWidth: 50 },
        { title: 'MSISDN', field: 'msisdn_' },
        { title: 'ເວລາຊື້', field: 'date_buy', minWidth: 200 },
        { title: 'UserID', field: 'userId_' },
        { title: 'Network', field: 'network_' },
        { title: 'Header', field: 'header_' },
        { title: 'STS', field: 'sts_', render: row => <u className={row.all_status && 'dis_active'}>{row.sts_}</u> },
        // { title: 'ຂໍ້ຄວາມ', field: 'sms_', minWidth: 600},
    ]
    function ShowData() {
        return (
            <>
                <Grid container>
                    <Grid item md={2} lg={3} xl={4}></Grid>
                    <Grid item xs={12} md={8} lg={6} xl={4}>
                        <Alert variant="outlined" severity="info" style={{ marginTop: 10 }}>
                            ກໍລະນີທີ່ຕ້ອງການສະແດງຂໍ້ມູນຫຼາຍກ່ວາ 10 ລາຍການ ໃຫ້ຄຼິກໄປທີ່ More Detail ຢູ່ດ້ານລຸ່ມ
                        </Alert>
                    </Grid>
                </Grid>
                <MyTable tTitle={"Sms Banking"} tData={data} tColumns={columns} />

                <Grid container>
                    <Grid item xs={12} className="more">
                        <SmsBankingDialog />
                    </Grid>
                </Grid>
            </>
        )
    }
    return (
        <>
            {!stop ? <LoadingLottie loadStop={stop} loadHeight={800} /> : <ShowData />}
        </>
    )
}

export default SmsBanking
