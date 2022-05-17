import { Grid } from '@material-ui/core'
import React from 'react'
import Axios from '../../Components/Axios'
import Crypt from '../../Components/Crypt'
import cookie from 'js-cookie'
import { LoadingFadoaw } from '../../../Loading/TableLoading'
import NavLoad from '../../../Home/Pages/Components/NavLoad'

function Fadao() {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    const [alert, setAlert] = React.useState(false)
    React.useEffect(() => {
        setStop(false)
        setAlert(false)
        var phone = Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") })
        const token = cookie.get("one_session")
        Axios.get("FadaoBorrowAndDeduct?msisdn_=" + phone.text, { headers: { 'Authorization': 'Bearer ' + token } }).then(res => {
            if (res.status === 200) {
                setData(res.data)
                setTimeout(() => {
                    setStop(true)
                }, 100)
            }
        }).catch(err => {
            setAlert(true)
            setStop(true)
        })
    }, [])
    return (
        <>
            <NavLoad height={90} use={!stop} />
            <Grid container className='text vas-font'>
                {/* <Grid item xs={12}><h2 className="center">{alert ? <label className="error">ຢືມ ແລະ ຕັດເງິນ ຟ້າດາວ</label> : 'ຢືມ ແລະ ຕັດເງິນ ຟ້າດາວ'}</h2></Grid> */}
                <Grid item xs={6}><div><b>ຢືມ:</b></div></Grid>
                <Grid item xs={6}><div>{parseInt(data.borrow).toLocaleString() ?? '-'}</div></Grid>
                <Grid item xs={6}><div><b>ຕັດເງິນ:</b></div></Grid>
                <Grid item xs={6}><div>{parseInt(data.deduct).toLocaleString() ?? '-'}</div></Grid>
                <Grid item xs={6}><div><b>ຍອດຄົງຄ້າງ:</b></div></Grid>
                <Grid item xs={6}><div>{parseInt(data.remaining).toLocaleString() ?? '-'}</div></Grid>
                <Grid item xs={12}>
                    <div className="hr-1"></div>
                </Grid>
            </Grid>
        </>
    )
}

export default Fadao
