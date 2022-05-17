import React from 'react'
import LoadingLottie from '../../Components/LoadingLottie'
import MyTable from '../Table/Table'
import Axios from '../../Components/Axios'
import GetPhoneNumber from '../../Components/GetPhoneNumber'
import moment from 'moment'
import { Grid } from '@material-ui/core'
import MTopupDialog from '../page/MTopupDialog'
import cookie from 'js-cookie'

function MTopup() {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        var phone = GetPhoneNumber()
        Axios.get("M-TopUp?msisdn=" + phone, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.status === 200) {
                var num = 0
                var update = res.data.map(row => {
                    row.id_idx = num + 1
                    row.date_buy = moment(row.date).format("DD-MM-YYYY HH:mm:ss")
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
        { title: 'No', field: 'id_idx' },
        { title: 'ເວລາຊື້', field: 'date_buy', minWidth: 200 },
        { title: 'ປະເພດ', field: 'type' },
        { title: 'ເບີຕົ້ນທາງ', field: 'sourceMsisdn' },
        { title: 'ເບີປາຍທາງ', field: 'destDeduct' },
        { title: 'ມູນຄ່າ', field: 'amount', type: 'numeric', render: row => row.amount > 0 ? parseInt(row.amount).toLocaleString() : row.amount },
        { title: 'Bonus', field: 'bonus' },
        { title: 'ມູນຄ່າກ່ອນຊື້', field: 'code', type: 'numeric', render: row => row.code > 0 ? parseInt(row.code).toLocaleString() : row.code },
        { title: 'ສະຖານະ', field: 'description', minWidth: 250 },
    ]
    function ShowData() {
        return (
            <>
                <MyTable tTitle={"M-Topup"} tData={data} tColumns={columns} />

                <Grid container>
                    <Grid item xs={12} className="more">
                        <MTopupDialog />
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

export default MTopup
