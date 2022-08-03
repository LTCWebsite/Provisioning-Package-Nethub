import React from 'react'
import MyTable from '../../../../../Components/MyTable'
import { AxiosReq } from '../../../../../Components/Axios'
import moment from 'moment'
import { LoadingTable } from '../../../../../Components/TableLoading'

function Offering() {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        var phone = localStorage.getItem("ONE_PHONE")
        AxiosReq.get("OcsOfferringCode?msisdn=" + phone).then(res => {
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
        { title: 'Start Time', field: 'start' },
        { title: 'End Time', field: 'end' }
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
