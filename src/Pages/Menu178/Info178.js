import React from 'react'
import { Grid, Button, Card, CardContent, MenuItem, Select } from '@material-ui/core'
import { Search } from '@material-ui/icons'
// import LoadingLottie from '../Components/LoadingLottie'
import Axios from '../../Pages/Components/Axios'
import MyTable from '../MiniCRM/Table/Table'
import moment from 'moment'
import cookie from 'js-cookie'
import Crypt from '../Components/Crypt'
import Doing from '../Components/Doing'
import { LoadingTable } from '../../Loading/TableLoading'

function Info178() {
    const [stop, setStop] = React.useState(null)
    const [name, setName] = React.useState('')
    const [place, setPlace] = React.useState('')
    const [data, setData] = React.useState([])
    const [sl, setSl] = React.useState({ data: [], select: 0 })
    React.useEffect(() => {
        Axios.get("api/Province", { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.status === 200) {
                setSl({ ...sl, data: res.data })
                // console.log(res.data)
            } else {
                setSl({ ...sl, data: [] })
            }
        })
    }, [])

    const Search178 = () => {
        setStop(false)
        let send = ''
        if(sl.select !== 0){
            send = "Infomation178?Name=" + name + "&Address=" + place + '&TelephoneNo=' + sl.select
            // console.log(send)
        }else{
            send = "Infomation178?Name=" + name + "&Address=" + place
        }
        Axios.get(send, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.status === 200) {
                var num = 1
                var update = res.data.map(row => {
                    row.idx = num
                    num = num + 1
                    return row
                })
                setTimeout(() => {
                    setStop(true)
                    setData(update)
                }, 500)
                // console.log(update)
                Doing({
                    msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                    username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                    detail: 'check information 178',
                    resualt: 'Operation successed.',
                })
            }
        }).catch(err => {
            setStop(true)
            Doing({
                msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                detail: 'check information 178',
                resualt: 'error',
            })
        })
    }
    const columns = [
        { title: 'No', field: 'idx', maxWidth: 50 },
        { title: 'ຊື່', field: 'nameL1', minWidth: 400, render: row => row.nameL2 !== '' ? row.nameL1 + " - " + row.nameL2 : row.nameL1 },
        { title: 'ປະເພດ', field: 'titleName', maxWidth: 150 },
        { title: 'ສະຖານທີ', field: 'address1', minWidth: 400, render: row => row.address2 !== '' ? row.address1 + " - " + row.address2 : row.address1 },
        { title: 'ເບີຕິດຕໍ່', field: 'telephoneNo', type: 'numeric' },
        { title: 'StatusDate', field: 'statusDate', type: 'numeric', render: row => row.statusDate === null ? null : moment(row.statusDate).format("DD-MM-YYYY") },
        // { title: 'Facebook', field: 'facebook' },
        // { title: 'Email', field: 'email' },
        // { title: 'Website', field: 'website' },
    ]
    function ShowAll() {
        return (
            <MyTable tTitle={"Information 178"} tData={data} tColumns={columns} />
        )
    }
    return (
        <>
            <Grid container style={{ marginTop: 15 }}>
                <Grid container item xs={12}>
                    <Grid item xs={12} container style={{ paddingLeft: 10, paddingRight: 10 }}>
                        <Grid item container xs={10} spacing={3}>
                            <Grid item xs={4} style={{ paddingRight: 17 }}>
                                <input className="input" placeholder="ຄົ້ນຫາຊື່..." onChange={(e) => { setName(e.target.value) }} />
                            </Grid>
                            <Grid item xs={4} style={{ paddingLeft: 17 }}>
                                <input className="input" placeholder="ຄົ້ນຫາສະຖານທີ່ຕ່າງໆ..." onChange={(e) => { setPlace(e.target.value) }} />
                            </Grid>
                            <Grid item xs={4} style={{ paddingLeft: 25 }}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    variant='filled'
                                    fullWidth
                                    value={sl.select}
                                    defaultValue={0}
                                    onChange={(e) => setSl({ ...sl, select: e.target.value })}
                                >
                                    <MenuItem value={0} disabled className='option'>ເລືອກແຂວງ</MenuItem>
                                    {sl.data?.map(row => {
                                        return (
                                            <MenuItem value={row.codeKey}>{row?.codeDesc}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid item xs={2} style={{ paddingLeft: 35, paddingBottom: 20 }}>
                            <Button fullWidth variant="contained" className="btn-primary" onClick={Search178}><Search /></Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        {stop === null && <Card>
                            <CardContent className="content-1">
                                <Grid item xs={12} style={{ paddingBottom: 50 }}>
                                    <h1 className="dialog-center">ກະລຸນາກົດຄົ້ນຫາ</h1>
                                </Grid>
                            </CardContent>
                        </Card>}
                        {stop === false && <LoadingTable md={true} />}
                        {stop === true && <ShowAll />}
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Info178
