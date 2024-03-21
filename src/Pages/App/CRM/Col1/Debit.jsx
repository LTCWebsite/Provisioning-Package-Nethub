import { Grid, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AxiosCBS, AxiosReq } from '../../../../Components/Axios'

function Debit() {
    const [debit, setDebit] = useState([])
    const [show, setShow] = useState(false)
    // const [data, setdata] = useState([])
    useEffect(() => {
        setShow(false)
        let phone = localStorage.getItem("ONE_PHONE")
        AxiosReq.get("NewQueryDebit?msisdn=" + phone).then(res => {
            if (res.status === 200) {
                setDebit(res.data)
                setShow(true)
            }
        }).catch(er => {
            setDebit({
                totalDebit: null
            })
            setShow(true)
        })
        // let sendData = {
        //     msisdn: phone
        // }
        // AxiosCBS.post("query_balance", sendData).then(res => {
        //     if(res.status === 200){
        //         setdata(res.data)
        //         setShow(true)
        //     }
        // })
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
                <Grid item container xs={12} className='link-box-green'>
                    <Grid item xs={8}><div>ຍອດໜີ້ : </div></Grid>
                    <Grid item xs={4}><div className='text-right'>{debit.totalDebit === null ? null : parseInt(debit.totalDebit).toLocaleString()}</div></Grid>
                </Grid>
                // balance?.map((row, key) => {
                //     return (
                //         <Grid item container xs={12} className='link-box-green' key={key}>
                //             <Grid item xs={8}><div>{row.balanceTypeName} : </div></Grid>
                //             <Grid item xs={4}><div className='text-right'>{parseInt(row.totalAmount).toLocaleString()}</div></Grid>
                //         </Grid>
                //     )
                // })
                // <Grid item container xs={12} className='link-box-green'>
                //     <Grid item xs={6}><div>ຍອດໜີ້ : </div></Grid>
                //     {/* <Grid item xs={6}><div className='text-right'>{parseInt(debit?.totalDebit).toLocaleString()}</div></Grid> */}
                //     <Grid item xs={6}><div className='text-right'>{parseInt(data?.Summary?.Total).toLocaleString()}</div></Grid>
                // </Grid>

            }
        </Grid>
    )
}

export default Debit