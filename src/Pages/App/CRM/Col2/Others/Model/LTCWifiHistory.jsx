import React from 'react'
import MyTable from '../../../../../../Components/MyTable'
import { AxiosReq } from '../../../../../../Components/Axios'
import moment from 'moment'
import { LoadingTable } from '../../../../../../Components/TableLoading'
import cookie from 'js-cookie'

function LTCWifiHistory() {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        var phone = localStorage.getItem("ONE_PHONE")
        AxiosReq.get("HistoryBuyPackageLTCWiFi?msisdn=" + phone,{ headers: { 'Authorization': 'Bearer ' + cookie.get("ONE_TOKEN") } }).then(res => {
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
        { title: 'ເວລາຊື້', field: 'date_buy', minWidth: 200 },
        { title: 'Chanel', field: 'chanel' },
        { title: 'WiFiCode', field: 'wiFiCode' },
        { title: 'ມູນຄ່າ', field: 'wiFiPrice', type: 'numeric', render: row => row.wiFiPrice > 0 ? row.wiFiPrice.toLocaleString() : row.wiFiPrice },
        { title: 'ສະຖານະ', field: 'resultDesc', minWidth: 500 },
    ]
    function ShowData() {
        return (
            <>
                <MyTable tTitle={"LTC Wifi History"} tData={data} tColumns={columns} />
            </>
        )
    }
    return (
        <>
            {!stop ? <LoadingTable /> : <ShowData />}
        </>
    )
}

export default LTCWifiHistory
