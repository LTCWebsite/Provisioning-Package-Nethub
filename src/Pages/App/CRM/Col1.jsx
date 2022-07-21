import { PhoneIphone } from '@material-ui/icons'
import { CheckCircle, PersonOutline } from '@mui/icons-material'
import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Register3Grab from './Col1/3grab/Register3Grab'
import Balance from './Col1/Balance'
import BlackList from './Col1/BlackList/BlackList'
import BssRegister from './Col1/Bss/BssRegister'
import LifeCycle from './Col1/LifeCycle'
import MobileService from './Col1/MobileService/MobileService'
import Network from './Col1/Network'
import { AxiosReq } from '../../../Components/Axios'
import VAS from './Col1/VAS/VAS'
import Application from './Col1/Application/Application'

function Col1() {
    const phone = localStorage.getItem("ONE_PHONE")
    const [check, setCheck] = useState({ n_3g: false, n_4g: false, rbt: false, ir_call: false, ir_data: false, load: true })
    const [bss, setBSS] = useState('')
    const [backlist, setBacklist] = useState('')
    const [load, setLoad] = useState(true)

    useEffect(() => {
        let phone = localStorage.getItem("ONE_PHONE")
        AxiosReq.get("QueryHLRInfo?msisdn=" + phone).then(res => {
            if (res.status === 200) {
                // console.log(res.data)
                setCheck({
                    ...check,
                    n_3g: res.data?.queryServiceResult?.open3G === '1' ? true : false,
                    n_4g: res.data?.queryServiceResult?.open4G === '1' ? true : false,
                    rbt: res.data?.queryServiceResult?.openRBT === '1' ? true : false,
                    ir_call: res.data?.queryServiceResult?.irCall === '1' ? true : false,
                    ir_data: res.data?.queryServiceResult?.irData === '1' ? true: false,
                    load: false
                })
            }
        }).catch(er => {
            console.log(er)
        })
    }, [])

    return (
        <>
            <Grid container>
                <Grid item xs={12} md={12} lg={6} className="box-crm">
                    <Grid item xs={12}><h2 className='blue'>Info</h2></Grid>
                    <Grid item container xs={12} className='link-box'>
                        <Grid item xs={4}><PhoneIphone /></Grid>
                        <Grid item xs={8}><div className='text-right'>{phone}</div></Grid>
                    </Grid>
                    <Grid item container xs={12} className='link-box'>
                        <Grid item xs={4}><PersonOutline /></Grid>
                        <Grid item xs={8}><div className='text-right'>{bss?.name !== "" ? bss.name : "---"}</div></Grid>
                    </Grid>

                    <BssRegister cb={(e) => setBSS(e)} />


                    <Grid item container xs={12} className='link-box-success'>
                        <Grid item xs={6}><div>OCS status : </div></Grid>
                        <Grid item xs={5} className="text-right"><div>Active</div></Grid>
                        <Grid item xs={1}><CheckCircle className='link-icon' /></Grid>
                    </Grid>

                    <Register3Grab />

                    <Balance />

                    <Network />

                    <BlackList data={backlist} load={load} />

                    <h2 className='blue'>Value Add Service</h2>
                    <VAS />

                </Grid>

                <Grid item xs={12} md={12} lg={6} className="box-crm">
                    <h2 className='blue'>Life Cycle</h2>
                    <LifeCycle cb={(e) => setBacklist(e)} load={(e) => setLoad(e)} />
                    <h2 className='blue'>Mobile Service Data</h2>
                    <MobileService check={check} cb={(e) => setCheck(e)} />

                    <h2 className='blue'>Application</h2>
                    <Application />

                </Grid>

            </Grid>
        </>
    )
}

export default Col1