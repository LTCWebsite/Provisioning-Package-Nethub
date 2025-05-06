import React from 'react'
import { LoadingTable } from '../../../../../../Components/TableLoading'
import MyTable from '../../../../../../Components/MyTable'

function TableBundle({ FtthData }) {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        setData(FtthData)
        setStop(true)
    }, [])
    const columns = [
        { title: 'No', field: 'idx', maxWidth: 50 },
        { title: 'ເບີທີ່ຜູກ FTTH', field: 'bundle' },
        { title: 'ວັນທີຜູກລ່າສຸຸດ', field: 'latestDate' },
            ]
    function ShowData() {
        return (
            <>
                <MyTable tTitle={"FTTH Bundle"} tData={data} tColumns={columns} />
            </>
        )
    }
    return (
        <>
            {!stop ? <LoadingTable /> : <ShowData />}
        </>
    )
}

export default TableBundle
