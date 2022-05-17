import React from 'react'
// import LoadingLottie from '../../Components/LoadingLottie'
import MyTable from '../Table/Table'
import Axios from '../../Components/Axios'
import GetPhoneNumber from '../../Components/GetPhoneNumber'
import moment from 'moment'
import { Grid } from '@material-ui/core'
import MmoneyTopupDialog from './MmoneyTopupDialog'
import cookie from 'js-cookie'
import { LoadingTable } from '../../../Loading/TableLoading'

function MmoneyTopup() {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        var phone = GetPhoneNumber()
        Axios.get("MMoneyTopupLog?msisdn=" + phone, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.status === 200) {
                var num = 0
                var update = res.data.map(row => {
                    row.id_idx = num + 1
                    row.date_buy = moment(row.createDate).format("DD-MM-YYYY HH:mm:ss")
                    row.all_status = row.resultCode === '200' ? false : true
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
        { title: 'ເບີຕົ້ນທາງ', field: 'msisdn' },
        { title: 'ເບີປາຍທາງ', field: 'telephone' },
        { title: 'ເວລາຊື້', field: 'date_buy', minWidth: 200 },
        { title: 'ປະເພດ', field: 'phoneType' },
        { title: 'Operator', field: 'operator' },
        { title: 'ມູນຄ່າ', field: 'amount', type: 'numeric', render: row => row.amount > 0 ? parseInt(row.amount).toLocaleString() : row.amount },
        { title: 'CashIn', field: 'cashin', type: 'numeric', render: row => row.cashin > 0 ? row.cashin.toLocaleString() : row.cashin },
        { title: 'ມູນຄ່າກ່ອນຊື້', field: 'oldBalance', minWidth: 130, type: 'numeric', render: row => row.oldBalance > 0 ? parseInt(row.oldBalance).toLocaleString() : row.oldBalance },
        { title: 'ມູນຄ່າຫຼັງຊື້', field: 'newBalance', type: 'numeric', render: row => row.newBalance > 0 ? parseInt(row.newBalance).toLocaleString() : row.newBalance },
        { title: 'ສະຖານະ', field: 'resultDesc', minWidth: 180, render: row => <u className={row.all_status && 'dis_active'}>{row.resultDesc}</u> },
    ]
    function ShowData() {
        return (
            <>
                <MyTable tTitle={"M-Money Topup"} tData={data} tColumns={columns} />

                <Grid container>
                    <Grid item xs={12} className="more">
                        <MmoneyTopupDialog />
                    </Grid>
                </Grid>
            </>
        )
    }
    return (
        <>
            {!stop ? <LoadingTable md={true} /> : <ShowData />}
        </>
    )
}

export default MmoneyTopup
