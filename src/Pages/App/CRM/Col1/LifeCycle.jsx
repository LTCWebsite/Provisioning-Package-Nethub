import { Check } from '@mui/icons-material'
import { Grid, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AxiosReq } from '../../../../Components/Axios'

function LifeCycle() {
    const [cycle, setCycle] = useState([])
    const [show, setShow] = useState(false)
    const [date, setDate] = useState({ active: '', barring: '', suspend: '' })
    useEffect(() => {
        setShow(false)
        let phone = "2059944454"
        AxiosReq.get("NewQuerySubLifeCycle?msisdn=" + phone).then(res => {
            if (res.status === 200) {
                // console.log(res.data)
                let active = res.data.list[0].statusExpireTime
                let barring = res.data.list[1].statusExpireTime
                let suspend = res.data.list[2].statusExpireTime
                setDate({
                    ...date,
                    active: active.substring(0, 4) + '-' + active.substring(4, 6) + '-' + active.substring(6, 8) + ' ' + active.substring(8, 10) + ':' + active.substring(10, 12) + ':' + active.substring(12, 14),
                    barring: barring.substring(0, 4) + '-' + barring.substring(4, 6) + '-' + barring.substring(6, 8) + ' ' + barring.substring(8, 10) + ':' + barring.substring(10, 12) + ':' + barring.substring(12, 14),
                    suspend: suspend.substring(0, 4) + '-' + suspend.substring(4, 6) + '-' + suspend.substring(6, 8) + ' ' + suspend.substring(8, 10) + ':' + suspend.substring(10, 12) + ':' + suspend.substring(12, 14)
                })
                setCycle(res.data)
                setShow(true)
            }
        })
    }, [])
    const unBlackList = (e) => {
        if (e === 0) {
            console.log('ok')
        }
    }

    return (
        <>
            {show ?
                <Grid item xs={12} container className='next'>
                    <Grid Grid item container xs={12} className={cycle?.blacklistStatus === 1 ? 'link-box-red' : 'link-box-green'} onClick={() => unBlackList(cycle?.blacklistStatus)}>
                        <Grid item xs={6}><div>Black List : </div></Grid>
                        <Grid item xs={6}><div className='text-right'>{cycle?.blacklistStatus === 0 ? <>
                            No
                        </> : <>
                            Yes
                        </>}</div></Grid>
                    </Grid >
                    <Grid item container xs={12} className='link-box-defult'>
                        <Grid item xs={4}><div>Active Stop : </div></Grid>
                        <Grid item xs={8}><div className='text-right'>{date.active}</div></Grid>
                    </Grid>
                    <Grid item container xs={12} className='link-box-defult'>
                        <Grid item xs={4}><div>Suspend Stop : </div></Grid>
                        <Grid item xs={8}><div className='text-right'>{date.barring}</div></Grid>
                    </Grid>
                    <Grid item container xs={12} className='link-box-defult'>
                        <Grid item xs={4}><div>Disable Stop : </div></Grid>
                        <Grid item xs={8}><div className='text-right'>{date.suspend}</div></Grid>
                    </Grid>
                </Grid > :
                <Grid item xs={12} container>
                    <Grid item xs={12}>
                        <Skeleton animation="wave" className="wave" />
                    </Grid>
                    <Grid item xs={12}>
                        <Skeleton animation="wave" className="wave" />
                    </Grid>
                    <Grid item xs={12}>
                        <Skeleton animation="wave" className="wave" />
                    </Grid>
                    <Grid item xs={12}>
                        <Skeleton animation="wave" className="wave" />
                    </Grid>
                </Grid>}
        </>
    )
}

export default LifeCycle