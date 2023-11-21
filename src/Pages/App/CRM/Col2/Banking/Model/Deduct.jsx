import React from 'react'
import MyTable from '../../../../../../Components/MyTable'
import { AxiosReq } from '../../../../../../Components/Axios'
import moment from 'moment'
import { LoadingTable } from '../../../../../../Components/TableLoading'
import cookie from 'js-cookie'

function Deduct() {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        var phone = localStorage.getItem("ONE_PHONE")
        AxiosReq.get("DeductfadaoAndKalsym?msisdn_=" + phone,{ headers: { 'Authorization': 'Bearer ' + cookie.get("ONE_TOKEN") } }).then(res => {
            if (res.status === 200) {
                var num = 0
                var update = res.data.map(row => {
                    row.id_idx = num + 1
                    row.date = moment(row.recordDate).format("DD-MM-YYYY HH:mm:ss")
                    num = num + 1
                    return row
                })
                setData(update)
                setTimeout(() => {
                    setStop(true)
                }, 200)
                // console.log(res.data)
            }
        }).catch(err => {
            setStop(true)
        })
    }, [])
    const columns = [
        { title: 'No', field: 'id_idx', maxWidth: 80 },
        { title: 'BorrowID', field: 'borrowId', minWidth: 180 },
        { title: 'MSISDN', field: 'msisdn' },
        { title: 'ເວລາ', field: 'date', minWidth: 200 },
        { title: 'UserID', field: 'userId' },
        { title: 'ປະເພດ', field: 'srvType', minWidth: 150},
        { title: 'ມູນຄ່າ', field: 'amount', type: 'numeric', render: row => row.amount > 0 ? row.amount.toLocaleString() : row.amount},
        { title: 'ລາຍລະອຽດ', field: 'resultDesc'},
    ]
    function ShowData() {
        return (
            <>
                <MyTable tTitle={"Deduct"} tData={data} tColumns={columns} />
            </>
        )
    }
    return (
        <>
            {!stop ? <LoadingTable /> : <ShowData />}
        </>
    )
}

export default Deduct
