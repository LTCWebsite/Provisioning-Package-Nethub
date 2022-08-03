import React from 'react'
import MyTable from '../../../../../Components/MyTable'
import { AxiosReq } from '../../../../../Components/Axios'
import { LoadingTable } from '../../../../../Components/TableLoading'

function AllFree() {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        var phone = localStorage.getItem("ONE_PHONE")
        AxiosReq.get("OCSAllFree?msisdn_=" + phone).then(res => {
            if (res.status === 200) {
                var num = 0
                var update = res.data.map(row => {
                    row.id_idx = num + 1
                    row.freeAmount = row?.freeAmount?.toLocaleString()
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
        { title: 'Name', field: 'freeTypeName' },
        { title: 'Type', field: 'freeType' },
        { title: 'Amount', field: 'freeAmount'},
        { title: 'Expire Date', field: 'expireDate'}
    ]
    function ShowData() {
        return (
            <>
                <MyTable tTitle={"AllFree"} tData={data} tColumns={columns} />
            </>
        )
    }
    return (
        <>
            {!stop ? <LoadingTable /> : <ShowData />}
        </>
    )
}

export default AllFree
