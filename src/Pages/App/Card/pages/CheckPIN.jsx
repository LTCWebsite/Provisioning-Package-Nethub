import React from 'react'
import { Grid, Button, Card, CardContent, Tooltip } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { AxiosReq } from '../../../../Components/Axios'
import MyTable from '../../../../Components/MyTable'
import moment from 'moment'
// import cookie from 'js-cookie'
// import Crypt from '../../Components/Crypt'
// import Doing from '../../Components/Doing'
import { LoadingTable } from '../../../../Components/TableLoading'

function CheckPIN() {
    const [stop, setStop] = React.useState(null)
    const [pin, setPIN] = React.useState('')
    const [data, setData] = React.useState([])
    const Search178 = () => {
        setStop(false)
        AxiosReq.get("api/CheckPin?pin=" + pin).then(res => {
            if (res.status === 200) {
                var num = 1
                var date = res.data.map(row => {
                    row.idx = num
                    num = num + 1
                    return row
                })
                setTimeout(() => {
                    setStop(true)
                    setData(date)
                }, 500)
                // console.log(update)
                // Doing({
                //     msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                //     username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                //     detail: 'check pin',
                //     resualt: 'Operation successed.',
                // })
            }
        }).catch(err => {
            setStop(true)
            // Doing({
            //     msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
            //     username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
            //     detail: 'check pin',
            //     resualt: 'error',
            // })
        })
    }
    const columns = [
        { title: 'ລຳດັບ', field: 'idx', maxWidth: 50 },
        { title: 'ເບີຕົ້ນທາງ', field: 'sendNumber' },
        { title: 'ເບີທີ່ຖືກເຕີມ', field: 'receiveNumber' },
        { title: 'ໝາຍເລກ PIN', field: 'pinNumber', maxWidth: 150 },
        { title: 'ຈຳນວນເງິນ', field: 'amount', type: 'numeric', render: row => row.amount > 0 ? parseInt(row.amount).toLocaleString() : row.amount },
        { title: 'ເງິນຍັງເຫຼືອ', field: 'currentBalance', type: 'numeric', render: row => row.currentBalance > 0 ? parseInt(row.currentBalance).toLocaleString() : row.currentBalance },
        { title: 'ຊ່ອງທາງ', field: 'chanel' },
        { title: 'ວັນທີເຕີມ', field: 'requestDate', render: row => moment(row.requestDate).format("DD-MM-YYYY HH:mm:ss"), minWidth: 200 },
        {
            title: 'ຄຳອະທິບາຍ', field: 'sms', minWidth: 300, render: row => <Tooltip title={row.sms}><div>{row.sms.substring(0, 20)} ...</div></Tooltip>
        }
    ]

    function ShowAll() {
        return (
            <MyTable tTitle={"Check PIN"} tData={data} tColumns={columns} />
        )
    }
    return (
        <>
            <Grid container style={{ marginTop: 15 }}>
                <Grid container item xs={12}>
                    <Grid item xs={3}></Grid>
                    <Grid item container xs={4}>
                        <Grid item xs={12} style={{ paddingRight: 17 }} >
                            <input max={15} className="input" placeholder="ປ້ອນໝາຍເລກ PIN..." onChange={(e) => { setPIN(e.target.value) }} />
                        </Grid>
                    </Grid>
                    <Grid item xs={2} style={{ paddingLeft: 35, paddingBottom: 20 }}>
                        <Button fullWidth variant="contained" className="btn-primary" onClick={Search178}><Search /></Button>
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10} style={{ height: '75vh' }}>
                        {stop === null && <Card>
                            <CardContent className="content-1">
                                <Grid item xs={12} style={{ paddingBottom: 50 }}>
                                    <h1 className="dialog-center">ກະລຸນາກົດຄົ້ນຫາ</h1>
                                </Grid>
                            </CardContent>
                        </Card>}
                        {stop === false && <LoadingTable />}
                        {stop === true && <ShowAll />}
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}


export default CheckPIN

