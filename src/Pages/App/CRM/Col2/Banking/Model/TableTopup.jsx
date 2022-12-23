import React from 'react'
import { LoadingTable } from '../../../../../../Components/TableLoading'
import MyTable from '../../../../../../Components/MyTable'
import { Tooltip } from '@mui/material'

function TableTopup({ topupData }) {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        setData(topupData)
        setStop(true)
    }, [])
    const columns = [
        { title: 'No', field: 'id_idx', maxWidth: 50 },
        { title: 'seq_number', field: 'seqnumber_' },
        { title: 'chanel', field: 'chanel_' },
        { title: 'srvtype', field: 'srvtype_' },
        { title: 'type', field: 'type_' },
        { title: 'userId', field: 'userId_' },
        { title: 'msisdn', field: 'msisdn_' },
        { title: 'amount', field: 'amount_' },
        { title: 'requestdate', field: 'requestdate_'},
        { title: 'errcode', field: 'errcode_' },
        { title: 'errdesc', field: 'errdesc_'},
        { title: 'receipt', field: 'receipt_' }
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
