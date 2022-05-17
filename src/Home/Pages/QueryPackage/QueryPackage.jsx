import React from 'react'
import LoadingLottie from '../../Components/LoadingLottie'
import MyTable from '../Table/Table'
import Axios from '../../Components/Axios'
import GetPhoneNumber from '../../Components/GetPhoneNumber'
import moment from 'moment'
import cookie from 'js-cookie'
import Crypt from '../../Components/Crypt'
import Doing from '../../Components/Doing'

function QueryPackage() {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        var phone = GetPhoneNumber()
        Axios.get("QueryPackage?msisdn=" + phone, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.status === 200) {
                // console.log(res.data);
                var num = 0
                var update = res.data.map(row => {
                    row.id_idx = num + 1
                    row.date_expire = moment(row.expiryTime).format("DD-MM-YYYY HH:mm:ss")
                    row.date_start = moment(row.startTime).format("DD-MM-YYYY HH:mm:ss")
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
                    detail: 'check package',
                    resualt: 'Operation successed.',
                })
            }
        }).catch(err => {
            setStop(true)
        })
    }, [])
    const columns = [
        { title: 'No', field: 'id_idx', maxWidth: 50 },
        { title: 'MSISDN', field: 'msisdn' },
        { title: 'ຊື່ແພັກເກັດ', field: 'counterName', minWidth: 250 },
        { title: 'ເລີ່ມວັນທີ', field: 'date_start', minWidth: 200 },
        { title: 'ໝົດອາຍຸ', field: 'date_expire', minWidth: 200 },
        { title: 'Priority', field: 'priority', maxWidth: 80 },
        // { title: 'ProNumber', field: 'productNumber', maxWidth: 100 },
        { title: 'Remaining', field: 'remaining', type: 'numeric', render: row => row.remaining > 0 ? parseInt(row.remaining).toLocaleString() : row.remaining, maxWidth: 130 },
        // { title: '4GIR', field: 'speed._4gir', maxWidth: 80, render: row => row.speed._4gir ?? '-' },
        // { title: '4G', field: 'speed._4g', maxWidth: 80, render: row => row.speed._4g ?? '-' },
        // { title: '3GNR', field: 'speed._3gnr', maxWidth: 80, render: row => row.speed._3gnr ?? '-' },
        // { title: '3GIR', field: 'speed._3gir', maxWidth: 80, render: row => row.speed._3gir ?? '-' },
        // { title: '3G2100', field: 'speed._3g2100', maxWidth: 100, render: row => row.speed._3g2100 ?? '-' },
        // { title: '3G900', field: 'speed._3g900', maxWidth: 100, render: row => row.speed._3g900 ?? '-' },
        // { title: '2GIR', field: 'speed._2gir', maxWidth: 80, render: row => row.speed._2gir ?? '-' },
        // { title: '2G', field: 'speed._2g', maxWidth: 80, render: row => row.speed._2g ?? '-' },
    ]
    function ShowData() {
        return (
            <>
                <MyTable tTitle={"Package"} tData={data} tColumns={columns} />
            </>
        )
    }
    return (
        <>
            {!stop ? <LoadingLottie loadStop={stop} loadHeight={800} /> : <ShowData />}
        </>
    )
}

export default QueryPackage
