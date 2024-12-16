import { Close } from '@mui/icons-material'
import { Dialog, DialogTitle, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AxiosCBS } from '../../../../../../Components/Axios'
import UnbarTable from './UnbarTable'

function QueryUnbar({ open, cb }) {
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(false)
    useEffect(() => {
        setloading(true)
        let msisdn = localStorage.getItem("ONE_PHONE")
        AxiosCBS.post(`http://10.30.6.86:9192/controller/QueryUnBar?msisdn_=${msisdn}`).then(res => {
            if (res.status === 200) {
                setdata(res.data)
                console.log(res.data)
                setTimeout(() => {
                    setloading(false)
                }, 500);
            } else {
                setloading(false)
            }
        }).catch(er => {
            setloading(false)
        })
    }, [])

    return (
        <>
            <Dialog
                open={open}
                onClose={() => cb(!open)}
                maxWidth={1000}
            >
                <Grid container>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                        <DialogTitle className='center'>Query Unbar</DialogTitle>
                    </Grid>
                    <Grid item xs={3}>
                        <div className='right'><Close className='icon' onClick={() => cb(!open)} /></div>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} style={{ width: 1400 }}>
                        <UnbarTable
                            data={data?.result}
                            loading={loading}
                        />
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default QueryUnbar