import React from 'react'
import { Grid } from '@material-ui/core'
import Axios from '../../Components/Axios'
import Crypt from '../../Components/Crypt'
import LoadingLottie from '../../Components/LoadingLottie'
import cookie from 'js-cookie'

function UserDetail() {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    const [alert, setAlert] = React.useState(false)
    React.useEffect(() => {
        setStop(false)
        setAlert(false)
        var phone = Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") })
        Axios.get("/Register3Grab?msisdn=" + phone.text, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.status === 200) {
                setTimeout(() => {
                    setData(res.data)
                    setStop(true)
                }, 500)
            }
            // console.log(res.data)
        }).catch(err => {
            setAlert(true)
            setStop(true)
        })
    }, [])
    return (
        <>
            {!stop ? <Grid item xs={12} style={{ height: 280 }}><LoadingLottie isStopped={stop} height={200} /></Grid> : <>
                <Grid item xs={12}><h2 className="center">{alert ? <label className="error">ຂໍ້ມູນການລົງທະບຽນ (3 ແກັບ)</label> : <label>ຂໍ້ມູນການລົງທະບຽນ (3 ແກັບ)</label>}</h2></Grid>
                <Grid item xs={5}><div><b>ຊື່:</b></div></Grid>
                <Grid item xs={7}><div>{data.name !== 'None' ? <>{data.name} {data.surname}</> : '-'}</div></Grid>
                <Grid item xs={5}><div><b>ເພດ:</b></div></Grid>
                <Grid item xs={7}><div>{data.gender !== 'None' ? <>{data.gender === 'M' ? 'ຊາຍ' : 'ຍິງ'}</> : '-'}</div></Grid>
                <Grid item xs={5}><div><b>ທີ່ຢູ່:</b></div></Grid>
                <Grid item xs={7}><div>{data.address !== 'None' ? <>{data.address}</> : '-'}</div></Grid>
                {/* <Grid item xs={5}><div><b>ບ້ານ:</b></div></Grid>
                <Grid item xs={7}><div>{data.village !== 'None' ? <>{data.village}</> : '-'}</div></Grid>
                <Grid item xs={5}><div><b>ເມືອງ:</b></div></Grid>
                <Grid item xs={7}><div>{data.district !== 'None' ? <>{data.district}</> : '-'}</div></Grid> */}
                <Grid item xs={5}><div><b>ເບີໂທ:</b></div></Grid>
                <Grid item xs={7}><div>{data.phone !== 'None' ? <>{data.phone}</> : '-'}</div></Grid>
                <Grid item xs={5}><div><b>ແຂວງ:</b></div></Grid>
                <Grid item xs={7}><div>{data.province !== 'None' ? <>{data.province}</> : '-'}</div></Grid>
                <Grid item xs={5}><div><b>ວັນເກີດ:</b></div></Grid>
                <Grid item xs={7}><div>{data.birthday !== 'None' ? <>{data.birthday}</> : '-'}</div></Grid>
                {data !== [] && <><Grid item xs={5}><div><b>ລົງທະບຽນດ້ວຍ:</b></div></Grid>
                    <Grid item xs={7}>
                        <div>
                            {data.idcard !== 'None' ? data.idcard === "" ? '' : 'ບັດປະຈຳຕົວ' : '-'}
                            {data.passport !== 'None' ? data.passport === "" ? '' : 'Passport' : '-'}
                            {data.idfamily !== 'None' ? data.idfamily === "" ? '' : 'ສຳມະໂນຄົວ' : '-'}
                        </div>
                    </Grid>
                    <Grid item xs={5}><div><b>ໝາຍເລກ:</b></div></Grid>
                    <Grid item xs={7}>
                        <div>
                            {data.idcard !== 'None' ? data.idcard === "" || data.idcard === null ? '' : <>{data.idcard.substr(0, data.idcard.length - 5) + 'XXXXX'}</> : '-'}
                            {data.passport !== 'None' ? data.passport === "" || data.passport === null ? '' : <>{data.passport.substr(0, data.passport.length - 3) + 'XXX'}</> : '-'}
                            {data.idfamily !== 'None' ? data.idfamily === "" || data.idfamily === null ? '' : <>{data.idfamily.substr(0, data.idfamily.length - 2) + 'XX'}</> : '-'}
                        </div>
                    </Grid></>}
            </>}
        </>
    )
}

export default UserDetail
