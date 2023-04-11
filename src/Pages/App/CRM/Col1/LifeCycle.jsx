import { Check } from '@mui/icons-material'
import { Grid, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AxiosReq } from '../../../../Components/Axios'
import { MyCrypt } from "../../../../Components/MyCrypt"
import cookie from 'js-cookie'

function LifeCycle({ cb, cbCus, load }) {
    const [cycle, setCycle] = useState([])
    const [show, setShow] = useState(false)
    const [date, setDate] = useState({ active: '', barring: '', suspend: '' })
    const [offering, setOffering] = useState([])
    const [OShow, setOShow] = useState(false)

    useEffect(() => {
        setShow(false)
        load(true)
        let phone = localStorage.getItem("ONE_PHONE")
        let type = MyCrypt("de", localStorage.getItem("ONE_NETWORK"))
        console.log('NETWORK_CODE', type?.NETWORK_CODE)
        if( type?.NETWORK_CODE === 'M' || type?.NETWORK_CODE === 'H' || type?.NETWORK_CODE === 'W' || type?.NETWORK_CODE == undefined){
            AxiosReq.get("NewQuerySubLifeCycle?msisdn=" + phone).then(res => {
                if (res.status === 200) {
                    // console.log(res.data)
                    // let active = res.data?.list[0]?.statusExpireTime
                    // let barring = res.data?.list[1]?.statusExpireTime
                    // let suspend = res.data?.list[2]?.statusExpireTime

                    //console.log("por", res.data?.list?.filter(e => e.statusName==="Active")[0]?.statusExpireTime)

                    let active = res.data?.list?.filter(e => e.statusName==="Active")[0]?.statusExpireTime
                    let barring = res.data?.list?.filter(e => e.statusName==="Call Barring")[0]?.statusExpireTime
                    let suspend = res.data?.list?.filter(e => e.statusName==="Suspend")[0]?.statusExpireTime
                    setCycle(res.data)
                    cb(res.data)
                    setDate({
                        ...date,
                        // active: active.substring(0, 4) + '-' + active.substring(4, 6) + '-' + active.substring(6, 8) + ' ' + active.substring(8, 10) + ':' + active.substring(10, 12) + ':' + active.substring(12, 14),
                        // barring: barring.substring(0, 4) + '-' + barring.substring(4, 6) + '-' + barring.substring(6, 8) + ' ' + barring.substring(8, 10) + ':' + barring.substring(10, 12) + ':' + barring.substring(12, 14),
                        // suspend: suspend.substring(0, 4) + '-' + suspend.substring(4, 6) + '-' + suspend.substring(6, 8) + ' ' + suspend.substring(8, 10) + ':' + suspend.substring(10, 12) + ':' + suspend.substring(12, 14)

                        active: active.substring(6, 8) + '/' + active.substring(4, 6) + '/' + active.substring(0, 4)  + ' ' + active.substring(8, 10) + ':' + active.substring(10, 12) + ':' + active.substring(12, 14),
                        barring: barring.substring(6, 8) + '/' + barring.substring(4, 6) + '/' +barring.substring(0, 4)  + ' ' + barring.substring(8, 10) + ':' + barring.substring(10, 12) + ':' + barring.substring(12, 14),
                        suspend: suspend.substring(6, 8) + '/' + suspend.substring(4, 6) + '/' +suspend.substring(0, 4)  + ' ' + suspend.substring(8, 10) + ':' + suspend.substring(10, 12) + ':' + suspend.substring(12, 14)
                    })
                    
                    setShow(true)
                    load(false)
                }
            }).catch(er => {
                setShow(true)
            })
        }else{

            AxiosReq.get("NewCheckBlackListBss?msisdn=" + phone,{ headers: { 'Authorization': 'Bearer ' + cookie.get("ONE_TOKEN") } }).then(res => {
                if (res.status === 200) {
                    // console.log(res.data)
                    // let active = res.data.list[0].statusExpireTime
                    // let barring = res.data.list[1].statusExpireTime
                    // let suspend = res.data.list[2].statusExpireTime
                    // setDate({
                    //     ...date,
                    //     active: active.substring(0, 4) + '-' + active.substring(4, 6) + '-' + active.substring(6, 8) + ' ' + active.substring(8, 10) + ':' + active.substring(10, 12) + ':' + active.substring(12, 14),
                    //     barring: barring.substring(0, 4) + '-' + barring.substring(4, 6) + '-' + barring.substring(6, 8) + ' ' + barring.substring(8, 10) + ':' + barring.substring(10, 12) + ':' + barring.substring(12, 14),
                    //     suspend: suspend.substring(0, 4) + '-' + suspend.substring(4, 6) + '-' + suspend.substring(6, 8) + ' ' + suspend.substring(8, 10) + ':' + suspend.substring(10, 12) + ':' + suspend.substring(12, 14)
                    // })
                    // setCycle(res.data)
                    cb(res.data)
                    setShow(true)
                    load(false)
                }
            }).catch(er => {
                setShow(true)
            })
        }
        

        AxiosReq.get("NewCustomerInfoCbs?msisdn=" + phone).then(res => {
            if (res.status === 200) {
                let active = res?.data?.activationTime
                let barring = res?.data?.activeTimeLimit
                cbCus(res.data)
                setOffering({
                    firstActive: active.substring(6, 8) + '/' + active.substring(4, 6) + '/' +active.substring(0, 4)  + ' ' + active.substring(8, 10) + ':' + active.substring(10, 12) + ':' + active.substring(12, 14),
                    activeLimit: barring.substring(6, 8) + '/' + barring.substring(4, 6) + '/' +barring.substring(0, 4)  + ' ' + barring.substring(8, 10) + ':' + barring.substring(10, 12) + ':' + barring.substring(12, 14)
                })
                setOShow(true)
            }
        }).catch(er => {
            setOShow(true)
        })

    }, [])

    return (
        <>
            {OShow ?
                <Grid item xs={12} container className='next'>
                    <Grid item container xs={12} className='link-box-defult'>
                        <Grid item xs={4}><div>First Active : </div></Grid>
                        <Grid item xs={8}><div className='text-right'>{offering?.firstActive}</div></Grid>
                    </Grid>
                    <Grid item container xs={12} className='link-box-defult'>
                        <Grid item xs={4}><div>Register Date : </div></Grid>
                        <Grid item xs={8}><div className='text-right'>{offering?.activeLimit}</div></Grid>
                    </Grid>
                </Grid> :
                <Grid item xs={12} container>
                    <Grid item xs={12}>
                        <Skeleton animation="wave" className="wave" />
                    </Grid>
                    <Grid item xs={12}>
                        <Skeleton animation="wave" className="wave" />
                    </Grid>
                </Grid>
            }
            {
                show ?
                    <Grid item xs={12} container>
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
                    </Grid>
            }
        </>
    )
}

export default LifeCycle