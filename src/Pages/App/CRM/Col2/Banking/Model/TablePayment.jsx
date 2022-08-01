import React from 'react'
import { LoadingTable } from '../../../../../../Components/TableLoading'
import MyTable from '../../../../../../Components/MyTable'
import { Tooltip } from '@mui/material'

function TablePayment({ topupData }) {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        setData(topupData)
        setStop(true)
    }, [])
    const columns = [
        { title: 'No', field: 'idx', maxWidth: 50 },
        { title: 'ເບີຕົ້ນທາງ', field: '_source.send_number' },
        { title: 'ເບີປາຍທາງ', field: '_source.receve_number' },
        { title: 'ເວລາຊື້', field: 'date', minWidth: 200 },
        { title: 'ປະເພດ', field: '_source.chanel' },
        { title: 'PinNumber', field: '_source.pin_number' },
        { title: 'ມູນຄ່າ', field: '_source.paid_amt', type: 'numeric', render: row => row._source.paid_amt > 0 ? parseInt(row._source.paid_amt).toLocaleString() : row._source.paid_amt },
        { title: 'CurrentBalance', field: '_source.current_balance', type: 'numeric', render: row => row?._source.current_balance > 0 ? row?._source.current_balance.toLocaleString() : row?._source.current_balance },
        { title: 'Message', field: '_source.respon_sms', minWidth: 200, render: row => row?._source.respon_sms?.length <= 25 ? row?._source.respon_sms : <Tooltip title={row?._source.respon_sms}><div>{row?._source.respon_sms?.substring(0, 25)}...</div></Tooltip> },
    ]
    function ShowData() {
        return (
            <>
                <MyTable tTitle={"Payment History"} tData={data} tColumns={columns} />
            </>
        )
    }
    return (
        <>
            {!stop ? <LoadingTable /> : <ShowData />}
        </>
    )
}

export default TablePayment
