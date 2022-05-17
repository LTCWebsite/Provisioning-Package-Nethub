import React from 'react'
// import LoadingLottie from '../../Components/LoadingLottie'
import MyTable from '../Table/Table'
import Axios from '../../Components/Axios'
import GetPhoneNumber from '../../Components/GetPhoneNumber'
import moment from 'moment'
import { Grid } from '@material-ui/core'
import PinLTCWifiHistoryDialog from '../page/PinLTCWifiHistoryDialog'
import cookie from 'js-cookie'
import { LoadingTable } from '../../../Loading/TableLoading'

function PinLTCWifiHistory() {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        var phone = GetPhoneNumber()
        Axios.get("HistoryBuyPackagePinLtcWifi?msisdn=" + phone, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.status === 200) {
                var num = 0
                var update = res.data.map(row => {
                    row.id_idx = num + 1
                    row.date_buy = moment(row.dateTime).format("DD-MM-YYYY HH:mm:ss")
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
        { title: 'No', field: 'id_idx' },
        { title: 'ເວລາຊື້', field: 'date_buy', minWidth: 200},
        { title: 'Chanel', field: 'chanel' },
        // { title: 'RemoteIP', field: 'remoteIp' },
        { title: 'WiFiCode', field: 'wiFiCode' },
        { title: 'ມູນຄ່າ', field: 'pinPrice', type: 'numeric', render: row => row.pinPrice > 0 ? row.pinPrice.toLocaleString() : row.pinPrice },
        { title: 'ສະຖານະ', field: 'resultDesc', minWidth: 500 },
    ]
    function ShowData() {
        return (
            <>
                <MyTable tTitle={"Pin LTC Wifi History"} tData={data} tColumns={columns} />

                <Grid container>
                    <Grid item xs={12} className="more">
                        <PinLTCWifiHistoryDialog />
                    </Grid>
                </Grid>
            </>
        )
    }
    return (
        <>
            {!stop ? <LoadingTable /> : <ShowData />}
        </>
    )
}

export default PinLTCWifiHistory
