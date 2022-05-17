import React from 'react'
// import LoadingLottie from '../../Components/LoadingLottie'
import MyTable from '../Table/Table'
import Axios from '../../Components/Axios'
import GetPhoneNumber from '../../Components/GetPhoneNumber'
import cookie from 'js-cookie'
import moment from 'moment'
import { LoadingTable } from '../../../Loading/TableLoading'

function Offering() {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        var phone = GetPhoneNumber()
        Axios.get("OcsOfferringCode?msisdn=" + phone, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.status === 200) {
                var num = 0
                var update = res.data.map(row => {
                    row.id_idx = num + 1
                    row.start = moment(row.useStartTime).format("DD-MM-YYYY HH:mm:ss")
                    row.end = moment(row.useEndTime).format("DD-MM-YYYY HH:mm:ss")
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
        { title: 'ID', field: 'id' },
        { title: 'Offering ID', field: 'offeringId' },
        { title: 'Offering Name', field: 'offeringName' },
        { title: 'Start Time', field: 'start'},
        { title: 'End Time', field: 'end'}
    ]
    function ShowData() {
        return (
            <>
                <MyTable tTitle={"Offering"} tData={data} tColumns={columns} />
            </>
        )
    }
    return (
        <>
            {!stop ? <LoadingTable /> : <ShowData />}
        </>
    )
}

export default Offering
