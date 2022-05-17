import React from 'react'
import LoadingLottie from '../../Components/LoadingLottie'
import MyTable from '../Table/Table'
import Axios from '../../Components/Axios'
import GetPhoneNumber from '../../Components/GetPhoneNumber'
import moment from 'moment'
import { Grid } from '@material-ui/core'
import BSSdialog from './BSSdialog'
import cookie from 'js-cookie'
import Crypt from '../../Components/Crypt'
import Doing from '../../Components/Doing'

function BSS() {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        var phone = GetPhoneNumber()
        Axios.get("QueryBSS?MSISDN=" + phone, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.status === 200) {
                // console.log(res.data)
                var num = 0
                var update = res.data.map(row => {
                    row.id_idx = num + 1
                    row.date = moment(row.month_Bill).format("DD-MM-YYYY")
                    num = num + 1
                    return row
                })
                setData(update)
                setTimeout(() => {
                    setStop(true)
                }, 200)
                // console.log(update)
                Doing({
                    msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                    username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                    detail: 'check BSS',
                    resualt: 'Operation successed.',
                })
            }
        }).catch(err => {
            setStop(true)
            Doing({
                msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                detail: 'check BSS',
                resualt: 'error',
            })
        })
    }, [])
    const columns = [
        { title: 'ລຳດັບ', field: 'id_idx', maxWidth: 50 },
        { title: 'ບິນຂອງເດືອນ', field: 'date' },
        { title: 'ຊ່ອງທາງການຊຳລະ', field: 'staffcode' },
        { title: 'ຄ່າບໍລິການໃນເດືອນ', field: 'monthly_Fee', type: 'numeric', render: row => row.monthly_Fee > 0 ? parseInt(row.monthly_Fee).toLocaleString() : row.monthly_Fee },
        { title: 'ຈຳນວນທີ່ຈ່າຍເກີນ', field: 'overPaid_Amount', type: 'numeric', render: row => row.overPaid_Amount > 0 ? parseInt(row.overPaid_Amount).toLocaleString() : row.overPaid_Amount },
        { title: 'ຍອດຍັງເຫຼືອ', field: 'owe', type: 'numeric', render: row => row.owe > 0 ? parseInt(row.owe).toLocaleString() : row.owe },
        { title: 'ຈຳນວນຈ່າຍໂຕຈິງ', field: 'payment', type: 'numeric', render: row => row.payment > 0 ? parseInt(row.payment).toLocaleString() : row.payment },
    ]
    function ShowData() {
        return (
            <>
                <MyTable tTitle={"BSS"} tData={data} tColumns={columns} />

                <Grid container>
                    <Grid item xs={12} className="more">
                        <BSSdialog />
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

export default BSS
