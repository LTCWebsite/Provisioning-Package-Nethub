import { Grid } from '@material-ui/core'
import React from 'react'
import CountUp from 'react-countup';
import NavLoad from '../Components/NavLoad'

function BAD({ allData }) {
    const [stop, setStop] = React.useState(false)
    const [data, setData] = React.useState([])
    const [data2, setData2] = React.useState([])
    React.useEffect(() => {
        setTimeout(() => {
            setData(allData.use)
            setData2(allData.data)
            setStop(true)
        }, 300)
    }, [])
    return (
        <>
            <NavLoad height={115} use={!stop} />
            <Grid container item xs={12} className="text">
                <Grid item xs={6}><div><b>Main Balance:</b></div></Grid>
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
                <Grid item xs={12}>
                    <div className="hr-1"></div>
                </Grid>
            </Grid>
        </>
    )
}

export default BAD
