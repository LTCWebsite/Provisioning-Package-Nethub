import { Grid } from '@material-ui/core'
import React from 'react'
import Axios from '../../Components/Axios'
import Crypt from '../../Components/Crypt'
import LoadingLottie from '../../Components/LoadingLottie'
import cookie from 'js-cookie'
import CountUp from 'react-countup';

function BalanceAndData() {
    const [stop, setStop] = React.useState(false)
    const [alert, setAlert] = React.useState(false)
    const [data, setData] = React.useState([])
    const [data2, setData2] = React.useState([])
    const myLoad = () => {
        var phone = Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") })
        Axios.get("/CheckPoint?msisdn=" + phone.text, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.status === 200) {
                setData2(res.data.checkPointResult)
                setTimeout(() => {
                    setStop(true)
                    setAlert(false)
                }, 200)
            }
        }).catch(err => {
            setStop(true)
            setAlert(true)
        })
    }
    React.useEffect(() => {
        setStop(false)
        setAlert(false)
        var phone = Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") })
        Axios.get("/CheckBalance?msisdn=" + phone.text, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.status === 200) {
                setData(res.data)
                myLoad()
            }
            // console.log(res.data)
        }).catch(err => {
            setStop(true)
            setAlert(true)
        })
    }, [])
    return (
        <>
            {!stop ? <LoadingLottie isStopped={stop} /> : <>
                <Grid item xs={12}><h2 className="center">{alert ? <label className="error">Balance and data</label> : 'Balance and data'}</h2></Grid>
                <Grid item xs={6}><div><b>Balance:</b></div></Grid>
                {/* <Grid item xs={6}><div>{data.mainBalance ? parseInt(data.mainBalance).toLocaleString() : '-'}</div></Grid> */}
                <Grid>
                    <CountUp
                        style={{ color: '#5a5c69!important', fontWeight: '700!important' }}
                        start={0}
                        end={data.mainBalance}
                        // decimals={}
                        decimal=","
                        separator=","
                        duration={2.75}
                    />
                </Grid>

                <Grid item xs={6}><div><b>Free Balance:</b></div></Grid>
                {/* <Grid item xs={6}><div>{data.freeBalance ? parseInt(data.freeBalance).toLocaleString() : '-'}</div></Grid> */}
                <Grid>
                    <CountUp
                        style={{ color: '#5a5c69!important', fontWeight: '700!important' }}
                        start={0}
                        end={data.freeBalance}
                        separator=","
                        decimal=","
                        duration={2.75}
                    />
                </Grid>
                <Grid item xs={6}><div><b>Bonus Balance:</b></div></Grid>
                {/* <Grid item xs={6}><div>{data.bonusBalance ? parseInt(data.bonusBalance).toLocaleString() : '-'}</div></Grid> */}
                <Grid>
                    <CountUp
                        style={{ color: '#5a5c69!important', fontWeight: '700!important' }}
                        start={0}
                        end={data.bonusBalance}
                        // decimals={}
                        decimal=","
                        separator=","
                        duration={2.75}
                    />
                </Grid>
                <Grid item xs={6}><div><b>Point:</b></div></Grid>
                {/* <Grid item xs={6}><div>{data2.resultPoint ? parseInt(data2.resultPoint).toLocaleString() : '-'}</div></Grid> */}
                <Grid>
                    <CountUp
                        style={{ color: '#5a5c69!important', fontWeight: '700!important' }}
                        start={0}
                        end={data2.resultPoint}
                        separator=","
                        decimal=","
                        duration={2.75}
                    />
                </Grid>


            </>}
        </>
    )
}

export default BalanceAndData
