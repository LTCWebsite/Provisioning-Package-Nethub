import React from 'react'
import LoadingLottie from '../../Components/LoadingLottie'
import MyTable from '../Table/Table'
import Axios from '../../Components/Axios'
import GetPhoneNumber from '../../Components/GetPhoneNumber'
import moment from 'moment'
import { Grid } from '@material-ui/core'
import GameLoftDialog from '../page/GameLoftDialog'
import cookie from 'js-cookie'

function GameLoft() {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        var phone = GetPhoneNumber()
        Axios.get("GameLoft?msisdn=" + phone, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.status === 200) {
                var num = 0
                var update = res.data.map(row => {
                    row.id_idx = num + 1
                    row.date_buy = moment(row.deductDate).format("DD-MM-YYYY HH:mm:ss")
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
        { title: 'TranID', field: 'transactionId' },
        { title: 'ເວລາຕັດເງິນ', field: 'date_buy', minWidth: 200 },
        { title: 'ປະເພດ', field: 'cardType', minWidth: 180 },
        { title: 'ຊື່ເກມ', field: 'gameName' },
        { title: 'ມູນຄ່າ', field: 'amount', type: 'numeric', render: row => row.amount > 0 ? row.amount.toLocaleString() : row.amount },
        { title: 'ມູນຄ່າກ່ອນຊື້', field: 'oldBalance', type: 'numeric', render: row => row.oldBalance > 0 ? row.oldBalance.toLocaleString() : row.oldBalance },
        { title: 'ມູນຄ່າຫຼັງຊື້', field: 'newBalance', type: 'numeric', render: row => row.newBalance > 0 ? row.newBalance.toLocaleString() : row.newBalance },
        { title: 'ສະຖານະ', field: 'smsStatus' },
    ]
    function ShowData() {
        return (
            <>
                <MyTable tTitle={"GameLoft"} tData={data} tColumns={columns} />

                <Grid container>
                    <Grid item xs={12} className="more">
                        <GameLoftDialog />
                    </Grid>
                </Grid>
            </>
        )
    }
    return (
        <>
            {!stop ? <LoadingLottie loadStop={stop} loadHeight={800} /> : <ShowData />}
        </>
    )
}

export default GameLoft
