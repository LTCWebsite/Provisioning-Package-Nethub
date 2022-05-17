import React from 'react'
import { Button } from '@material-ui/core'
import LoadingLottie from '../../Components/LoadingLottie'
import MyTable from '../Table/Table'
import Axios from '../../Components/Axios'
import GetPhoneNumber from '../../Components/GetPhoneNumber'
import moment from 'moment'
import { Grid } from '@material-ui/core'
import HappyCallDialog from './HappyCallDialog'
import cookie from 'js-cookie'
import { Alert } from '@material-ui/lab'

function HappyCall() {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        var phone = GetPhoneNumber()
        Axios.get("HappyCallHappyCall?msisdn=" + phone, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.status === 200) {
                var num = 0
                var update = res.data.map(row => {
                    row.id_idx = num + 1
                    row.date_buy = moment(row.recordDate).format("DD-MM-YYYY HH:mm:ss")
                    // row.date_pay = moment(row.lastdatetime).format("DD-MM-YYYY HH:mm:ss")
                    num = num + 1
                    return row
                })
                setData(update)
                setTimeout(() => {
                    setStop(true)
                }, 200)
                // console.log(update)
            }
        }).catch(err => {
            setStop(true)
        })
    }, [])
    const columns = [
        { title: 'No', field: 'id_idx', maxWidth: 50 },
        { title: 'MSISDN', field: 'msisdn' },
        { title: 'ເວລາຢືມ', field: 'date_buy', minWidth: 200 },
        { title: 'UserID', field: 'userId' },
        // { title: 'Chanel', field: 'chanel' },
        { title: 'SrvType', field: 'srvtype' },
        { title: 'ເວລາເລີ່ມ', field: 'startTime', minWidth: 200, render: row => moment(row.startTime).format("DD-MM-YYYY HH:mm:ss") },
        { title: 'ເວລາສິ້ນສຸດ', field: 'stopTime', minWidth: 200, render: row => moment(row.stopTime).format("DD-MM-YYYY HH:mm:ss") },
        { title: 'ຈຳນວນເງິນ', field: 'balance', type: 'numeric', render: row => row.balance > 0 ? row.balance.toLocaleString() : row.balance },
        { title: 'ສະຖານະ', field: 'resultDesc' },
    ]
    function ShowData() {
        return (
            <>
                <MyTable tTitle={"HappyCall"} tData={data} tColumns={columns} />

                <Grid container>
                    <Grid item xs={12} className="more">
                        <HappyCallDialog />
                    </Grid>
                </Grid>
            </>
        )
    }
    return (
        <div className="center">
            <Grid container style={{marginBottom: 10}}>
                <Grid item md={2} lg={3} xl={4}></Grid>
                <Grid item xs={12} md={8} lg={6} xl={4}>
                    <Alert variant="outlined" severity="info" style={{ marginTop: 10 }}>
                        ກໍລະນີທີ່ຕ້ອງການສະແດງຂໍ້ມູນຫຼາຍກ່ວາ 10 ລາຍການ ໃຫ້ຄຼິກໄປທີ່ More Detail ຢູ່ດ້ານລຸ່ມ
                    </Alert>
                </Grid>
            </Grid>
            <form target="_blank" action="http://172.28.24.20/ltc/users/login" id="UserLoginForm" method="post" accept-charset="utf-8">
                <div style={{ display: 'none' }} >
                    <input type="hidden" name="_method" value="POST" />
                </div>
                <div className="input text required" style={{ display: 'none' }}>
                    <label for="UserUsername">Username</label>
                    <input name="data[User][username]" value="boualy" size="15" className="smallinput" style={{ textAlign: 'center' }} maxlength="100" type="hidden" id="UserUsername" />
                </div>
                <div className="input password required" style={{ display: 'none' }}>
                    <label for="UserPassword">Password</label>
                    <input name="data[User][password]" value="boualy@123" size="15" class="smallinput" style={{ textAlign: 'center' }} type="hidden" id="UserPassword" /></div>
                <div className="submit">
                    <Button type="submit" variant="contained" color="primary">ເບິ່ງຂໍ້ມູນ ແລະ ແກ້ໄຂ ເບື້ອງ HappyCall ກົດທີນີ່ !! </Button>
                </div>
            </form>
            <div style={{marginTop: 10 }}>
                {!stop ? <LoadingLottie loadStop={stop} loadHeight={800} /> : <ShowData />}
            </div>
        </div>
    )
}

export default HappyCall
