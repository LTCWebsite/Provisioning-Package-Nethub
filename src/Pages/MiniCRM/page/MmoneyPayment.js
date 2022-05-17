import React from 'react'
// import LoadingLottie from '../../Components/LoadingLottie'
import MyTable from '../Table/Table'
import Axios from '../../Components/Axios'
import GetPhoneNumber from '../../Components/GetPhoneNumber'
import moment from 'moment'
import { Grid } from '@material-ui/core'
import MmoneyPaymentDialog from './MmoneyPaymentDialog'
import cookie from 'js-cookie'
import { LoadingTable } from '../../../Loading/TableLoading'

function MmoneyPayment() {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        var phone = GetPhoneNumber()
        Axios.get("MMoneyPaymentLog?msisdn=" + phone, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
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
        { title: 'ເບີຕົ້ນທາງ', field: 'telephone' },
        { title: 'ເບີປາຍທາງ', field: 'msisdn' },
        { title: 'ເວລາຊື້', field: 'date_buy', minWidth: 200 },
        { title: 'ReceiptNo', field: 'receiptNo' },
        { title: 'PaymentId', field: 'paymentId' },
        { title: 'ປະເພດ', field: 'paymentType' },
        { title: 'Operator', field: 'operator' },
        { title: 'ມູນຄ່າ', field: 'amount', type: 'numeric', render: row => row.amount > 0 ? parseInt(row.amount).toLocaleString() : row.amount },
        { title: 'CashIn', field: 'cashIn', type: 'numeric', render: row => row.cashIn > 0 ? row.cashIn.toLocaleString() : row.cashIn },
        { title: 'ສະຖານະ', field: 'resultDesc', minWidth: 180, render: row => <u className={row.all_status && 'dis_active'}>{row.resultDesc}</u> },
    ]
    function ShowData() {
        return (
            <>
                <MyTable tTitle={"M-Money Payment"} tData={data} tColumns={columns} />

                <Grid container>
                    <Grid item xs={12} className="more">
                        <MmoneyPaymentDialog />
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

export default MmoneyPayment
