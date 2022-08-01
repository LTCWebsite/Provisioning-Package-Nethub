import React from 'react'
import MyTable from '../../../../../../Components/MyTable'
import { AxiosReq } from '../../../../../../Components/Axios'
import moment from 'moment'
import { LoadingTable } from '../../../../../../Components/TableLoading'

function Borrow({ borData }) {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        setData(borData)
        setStop(true)
        // var phone = localStorage.getItem("ONE_PHONE")
        // AxiosReq.get("BorrowfadaoAndKalsym?msisdn_=" + phone).then(res => {
        //     if (res.status === 200) {
        //         var num = 0
        //         var update = res.data.map(row => {
        //             row.id_idx = num + 1
        //             row.date_buy = moment(row.recordDate).format("DD-MM-YYYY HH:mm:ss")
        //             row.date_pay = moment(row.lastdatetime).format("DD-MM-YYYY HH:mm:ss")
        //             num = num + 1
        //             return row
        //         })
        //         setData(update)
        //         setTimeout(() => {
        //             setStop(true)
        //         }, 200)
        //         // console.log(update)
        //     }
        // }).catch(err => {
        //     setStop(true)
        // })
    }, [])
    const columns = [
        { title: 'No', field: 'id_idx', maxWidth: 50 },
        { title: 'BorrowID', field: 'borrowId' },
        { title: 'MSISDN', field: 'msisdn' },
        { title: 'ເວລາຢືມ', field: 'date_buy', minWidth: 200 },
        { title: 'ເວລາຈ່າຍ', field: 'date_pay', minWidth: 200 },
        { title: 'UserID', field: 'userId' },
        { title: 'ປະເພດ', field: 'borrowType' },
        { title: 'ຢືມ', field: 'borrowAmount', type: 'numeric', render: row => row.borrowAmount > 0 ? row.borrowAmount.toLocaleString() : row.borrowAmount },
        { title: 'ຄ່າທຳນຽມ', field: 'persentAmount', type: 'numeric', render: row => row.persentAmount > 0 ? row.persentAmount.toLocaleString() : row.persentAmount },
        { title: 'ທັງໝົດ', field: 'amount', type: 'numeric', render: row => row.amount > 0 ? row.amount.toLocaleString() : row.amount },
        { title: 'ເງິນທີ່ຈ່າຍ', field: 'paid', type: 'numeric', render: row => row.paid > 0 ? row.paid.toLocaleString() : <u className="red">{row.paid}</u> },
        { title: 'ສະຖານະ', field: 'resultDesc' },
    ]
    function ShowData() {
        return (
            <>
                <MyTable tTitle={"Borrow"} tData={data} tColumns={columns} />
            </>
        )
    }
    return (
        <>
            {!stop ? <LoadingTable md={true} /> : <ShowData />}
        </>
    )
}

export default Borrow
