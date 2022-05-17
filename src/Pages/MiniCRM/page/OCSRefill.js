import React from 'react'
// import LoadingLottie from '../../Components/LoadingLottie'
import MyTable from '../Table/Table'
import Axios from '../../Components/Axios'
import GetPhoneNumber from '../../Components/GetPhoneNumber'
import moment from 'moment'
import { Grid } from '@material-ui/core'
import cookie from 'js-cookie'
import { LoadingTable } from '../../../Loading/TableLoading'

function OCSRefill() {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        var phone = GetPhoneNumber()
        Axios.get("OCSRefill?msisdn_=" + phone, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.status === 200) {
                var num = 0
                var update = res.data.map(row => {
                    row.id_idx = num + 1
                    row.date = moment(row.recordDate).format("DD-MM-YYYY HH:mm:ss")
                    num = num + 1
                    return row
                })
                setData(update)
                setTimeout(() => {
                    setStop(true)
                }, 200)
                // console.log(res.data);
            }
        }).catch(err => {
            setStop(true)
        })
    }, [])

    const columns = [
        { title: 'ລຳດັບ', field: 'id_idx', maxWidth: 80 },
        { title: 'ເບີໂທລະສັບ', field: 'msisdn' },
        { title: 'Serial Number', field: 'serialnumber', minWidth: 200 },
        { title: 'ວັນທີ', field: 'date', minWidth: 180 },
        { title: 'ລາຄາ', field: 'faceValue', type: 'numeric', render: row => row.faceValue > 0 ? parseInt(row.faceValue).toLocaleString() : row.faceValue},
    ]
    function ShowData() {
        return (
            <>
                <MyTable tTitle={"OCSRefill"} tData={data} tColumns={columns} />

                <Grid container>
                    <Grid item xs={12} className="more">
                        {/* <DeductDialog /> */}
                    </Grid>
                </Grid>
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
