import React from 'react'
import { LoadingTable } from '../../../../../../Components/TableLoading'
import MyTable from '../../../../../../Components/MyTable'

function TableTopup({ topupData }) {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        setData(topupData)
        setStop(true)
    }, [])
    const columns = [
        { title: 'No', field: 'id_idx', maxWidth: 50 },
        { title: 'ເບີຕົ້ນທາງ', field: 'sourceMsisdn' },
        { title: 'ເບີປາຍທາງ', field: 'destDeduct' },
        { title: 'ເວລາຊື້', field: 'date_buy', minWidth: 200 },
        { title: 'ປະເພດ', field: 'type' },
        { title: 'Code', field: 'code' },
        { title: 'ມູນຄ່າ', field: 'amount', type: 'numeric', render: row => row.amount > 0 ? parseInt(row.amount).toLocaleString() : row.amount },
        { title: 'Bonus', field: 'bonus', type: 'numeric', render: row => row.bonus > 0 ? row.bonus.toLocaleString() : row.bonus },
        { title: 'ສະຖານະ', field: 'description', minWidth: 200, render: row => <u className={row.all_status && 'dis_active'}>{row.description}</u> },
    ]
    function ShowData() {
        return (
            <>
                <MyTable tTitle={"Topup Banking"} tData={data} tColumns={columns} />
            </>
        )
    }
    return (
        <>
            {!stop ? <LoadingTable /> : <ShowData />}
        </>
    )
}

export default TableTopup
