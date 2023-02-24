import React from 'react'
import MyTable from '../../../../../Components/MyTable'
import { AxiosReq } from '../../../../../Components/Axios'
import moment from 'moment'
import { LoadingTable } from '../../../../../Components/TableLoading'
import axios from 'axios'

function OCSRefill() {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        let send = {
            "msisdn": localStorage.getItem("ONE_PHONE")
        }
        axios.post("http://10.30.6.148:3000/ocs_refill", send, {
            auth: {
                username: "one",
                password: "#Ltc1qaz2wsx@one"
            }
        }).then(res => {
            console.log(res.data)
            if (res.status === 200) {
                let resp = res.data?.QueryRechargeLogResultMsg?.QueryRechargeLogResult?.Record_ItemGroup
                setData(resp === undefined ? [] : resp)
                setStop(true)
            }
        }).catch(er => {
            setStop(true)
        })
    }, [])

    const columns = [
        // { title: 'ລຳດັບ', field: 'id_idx', maxWidth: 80 },
        { title: 'ເບີໂທລະສັບ', field: 'RechargeNumber' },
        { title: 'Serial Number', field: 'SerialNo', minWidth: 200 },
        { title: 'ວັນທີ', field: 'TradeTime', minWidth: 180, render: row => row?.TradeTime.toString().substr(0, 4) + '-' + row?.TradeTime.toString().substr(4, 2) + '-' + row?.TradeTime.toString().substr(6, 2) + ' ' + row?.TradeTime.toString().substr(8, 2) + ':' + row?.TradeTime.toString().substr(10, 2) + ':' + row?.TradeTime.toString().substr(12, 2) },
        { title: 'ລາຄາ', field: 'FaceValue', type: 'numeric', render: row => row.FaceValue.toLocaleString() },
    ]
    function ShowData() {
        return (
            <>
                <MyTable tTitle={"OCSRefill"} tData={data} tColumns={columns} />
            </>
        )
    }
    return (
        <>
            {!stop ? <LoadingTable /> : <ShowData />}
        </>
    )
}

export default OCSRefill
