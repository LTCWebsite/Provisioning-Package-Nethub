import React from 'react'
import MyTable from '../../../../../Components/MyTable'
import { AxiosReq } from '../../../../../Components/Axios'
import { LoadingTable } from '../../../../../Components/TableLoading'
import { MyCrypt } from "../../../../../Components/MyCrypt"

function AllFree() {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        var phone = localStorage.getItem("ONE_PHONE")
        // AxiosReq.get("OCSAllFree?msisdn_=" + phone).then(res => {
        //     if (res.status === 200) {
        //         var num = 0
        //         var update = res.data.map(row => {
        //             row.id_idx = num + 1
        //             row.freeAmount = row?.freeAmount?.toLocaleString()
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
        let type = MyCrypt("de", localStorage.getItem("ONE_NETWORK"))
        AxiosReq.get("/api/QueryFreeUnit?msisdn=" + phone).then(res => {
            
            if (res.status === 200 && res.data.resultCode === '0') {
                var num = 0
                // console.log(res.data)
                // var update = res.data.map(row => {
                //     row.id_idx = num + 1
                //     row.freeAmount = row?.freeAmount?.toLocaleString()
                //     num = num + 1
                //     return row
                // })
                // setData(update)

                var update = res.data.result.map(row => {
                    row.id_idx = num + 1
                    row.offeringID = row?.offeringID
                    row.offeringName = row?.offeringName
                    row.effectiveTime = row?.effectiveTime.substring(0, 4) + '-' + row?.effectiveTime.substring(4, 6) + '-' + row?.effectiveTime.substring(6, 8) + ' ' + row?.effectiveTime.substring(8, 10) + ':' + row?.effectiveTime.substring(10, 12) + ':' + row?.effectiveTime.substring(12, 14)
                    row.expireTime = row?.expireTime.substring(0, 4) + '-' + row?.expireTime.substring(4, 6) + '-' + row?.expireTime.substring(6, 8) + ' ' + row?.expireTime.substring(8, 10) + ':' + row?.expireTime.substring(10, 12) + ':' + row?.expireTime.substring(12, 14)
                    row.totalInitialAmount = row?.totalInitialAmount?.toLocaleString()
                    row.totalUnusedAmount = row?.totalUnusedAmount?.toLocaleString()
                    row.measureUnitName = row?.measureUnitName
                    num = num + 1
                    return row
                })
                setData(update)

                // setData(res.data.result)
                setTimeout(() => {
                    setStop(true)
                }, 200)
            }
        }).catch(err => {
            setStop(true)
        })
    }, [])
    // const columns = [
    //     { title: 'No', field: 'id_idx', maxWidth: 50 },
    //     { title: 'Name', field: 'freeTypeName' },
    //     { title: 'Type', field: 'freeType' },
    //     { title: 'Amount', field: 'freeAmount'},
    //     { title: 'Expire Date', field: 'expireDate'}
    // ]

    const columns = [
        { title: 'No', field: 'id_idx', maxWidth: 50 },
        { title: 'ປະເພດ', field: 'freeUnitType'},
        { title: 'Offering ID', field: 'offeringID' },
        { title: 'Offering Name', field: 'offeringName' },
        { title: 'ວັນທີເລີ່ມ', field: 'effectiveTime'},
        { title: 'ໝົດອາຍຸ', field: 'expireTime'},
        { title: 'ຈຳນວນ', field: 'totalInitialAmount' },
        { title: 'ຍັງບໍ່ໄດ້ໃຊ້', field: 'totalUnusedAmount'},
        { title: 'ຫົວໜ່ວຍ', field: 'measureUnitName'}
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
