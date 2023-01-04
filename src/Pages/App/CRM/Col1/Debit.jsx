import { Grid, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AxiosReq } from '../../../../Components/Axios'

function Debit() {
    const [debit, setDebit] = useState([])
    const [show, setShow] = useState(false)
    useEffect(() => {
        setShow(false)
        let phone = localStorage.getItem("ONE_PHONE")
        AxiosReq.get("NewQueryDebit?msisdn=" + phone).then(res => {
            if (res.status === 200) {
                setDebit(res.data)
                setShow(true)
            }
        })
    }, [])
    return (
        <Grid item xs={12} container className=''>
            {!show ?
                <Grid item xs={12} container>
                    <Grid item xs={12}>
                        <Skeleton animation="wave" className="wave" />
                    </Grid>
                    <Grid item xs={12}>
                        <Skeleton animation="wave" className="wave" />
                    </Grid>
                </Grid> :
                // balance?.map((row, key) => {
                //     return (
                //         <Grid item container xs={12} className='link-box-green' key={key}>
                //             <Grid item xs={8}><div>{row.balanceTypeName} : </div></Grid>
                //             <Grid item xs={4}><div className='text-right'>{parseInt(row.totalAmount).toLocaleString()}</div></Grid>
                //         </Grid>
                //     )
                // })
                <Grid item container xs={12} className='link-box-green'>
                    <Grid item xs={6}><div>ຍອດໜີ້ : </div></Grid>
                    <Grid item xs={6}><div className='text-right'>{parseInt(debit?.totalDebit).toLocaleString()}</div></Grid>
                </Grid>

            }
        </Grid>
    )
}

export default Debit