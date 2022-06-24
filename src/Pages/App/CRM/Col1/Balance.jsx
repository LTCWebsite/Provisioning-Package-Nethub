import { Grid, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AxiosReq } from '../../../../Components/Axios'

function Balance() {
    const [balance, setBalance] = useState([])
    const [show, setShow] = useState(false)
    useEffect(() => {
        setShow(false)
        let phone = localStorage.getItem("ONE_PHONE")
        AxiosReq.get("NewQueryBalance?msisdn=" + phone).then(res => {
            if (res.status === 200) {
                setBalance(res.data.list)
                setShow(true)
            }
        })
    }, [])
    return (
        <Grid item xs={12} container className='next'>
            {!show ?
                <Grid item xs={12} container>
                    <Grid item xs={12}>
                        <Skeleton animation="wave" className="wave" />
                    </Grid>
                    <Grid item xs={12}>
                        <Skeleton animation="wave" className="wave" />
                    </Grid>
                </Grid> :
                balance?.map((row, key) => {
                    return (
                        <Grid item container xs={12} className='link-box-green' key={key}>
                            <Grid item xs={8}><div>{row.balanceTypeName} : </div></Grid>
                            <Grid item xs={4}><div className='text-right'>{parseInt(row.totalAmount).toLocaleString()}</div></Grid>
                        </Grid>
                    )
                })}
        </Grid>
    )
}

export default Balance