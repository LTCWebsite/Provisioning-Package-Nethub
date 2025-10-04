import { Block, ClearAll, Info, SentimentSatisfiedAlt, SettingsBackupRestore, SignalWifi3Bar, SimCardAlert, Subject, Textsms, CurrencyExchange, AddCard } from '@mui/icons-material'
import { Grid, Skeleton } from '@mui/material'
import React, { useState } from 'react'
import HappyCall from './Model/HappyCall'
import HlrData from './Model/HlrData'
import Info178 from './Model/Info178'
import MasterSim from './Model/MasterSim'
import ResetSim from './Model/ResetSim'
import SmsTicket from './Model/SmsTicket'
import Wifi from './Model/Wifi'
import OrderChange from './Model/OrderChage'
import UserBlacklist from './Model/UserBlacklist'
import QueryAdjustLog from './Model/QueryAdjustLog'
import CheckPackageBSS from './Model/CheckPackageBSS'
// import QueryUnbar from './Model/QueryUnbar'
// import { MyCrypt } from '../../../../../Components/MyCrypt'

function Others() {
    const [open, setOpen] = useState({ reset: false, sms_ticket: false, happyCall: false, mastersim: false, info178: false, wifi: false, hlr: false, orderChange: false, user_blacklist: false, queryunbar: false, adjustment_log: false, package_bss: false})
    const [hlr, setHlr] = useState(false)
    const [countSms, setCountSms] = useState(0)
    const [countHC, setCountHC] = useState(0)
    const [countWifi, setCountWifi] = useState(0)
    const [loadHC, setLoadHC] = useState(true)
    const [loadSms, setLoadSms] = useState(true)
    const [loadWifi, setLoadWifi] = useState(true)
    const [loadOrderChange, setLoadOrderChange] = useState(true)
    const [orderChangeCount, setOrderChangeCount] = useState(0)
    // let type = MyCrypt("de", localStorage.getItem("ONE_NETWORK"))

    return (
        <>
            <Grid container>
                <Grid item xs={12} container className='link-box-pointer' onClick={() => setOpen({ ...open, orderChange: true })}>
                    <Grid item xs={2}><ClearAll /></Grid>
                    <Grid item xs={5}>ປະຫວັດການປ່ຽນແປງ</Grid>
                    <Grid item xs={5}>
                        {loadOrderChange ? <Skeleton animation="wave" /> : <div className={orderChangeCount > 0 ? 'text-right bage-success' : 'text-right bage-error'}><u>{orderChangeCount}</u></div>}
                    </Grid>
                </Grid>
                <Grid item xs={12} container className='link-box-pointer' onClick={() => setOpen({ ...open, mastersim: true })}>
                    <Grid item xs={2}><SimCardAlert /></Grid>
                    <Grid item xs={10}>Master Sim</Grid>
                </Grid>
                <Grid item xs={12} container className='link-box-pointer' onClick={() => setOpen({ ...open, info178: true })}>
                    <Grid item xs={2}><Info /></Grid>
                    <Grid item xs={10}>Information 178</Grid>
                </Grid>
                <Grid item xs={12} container className='link-box-pointer' onClick={() => setOpen({ ...open, reset: true })}>
                    <Grid item xs={2}><SettingsBackupRestore /></Grid>
                    <Grid item xs={10}>Reset Sim</Grid>
                </Grid>
                <Grid item xs={12} container className='link-box-pointer' onClick={() => setHlr(true)}>
                    <Grid item xs={2}><Subject /></Grid>
                    <Grid item xs={4}>HLR</Grid>
                </Grid>
                <Grid item xs={12} container className='link-box-pointer' onClick={() => setOpen({ ...open, happyCall: true })}>
                    <Grid item xs={2}><SentimentSatisfiedAlt /></Grid>
                    <Grid item xs={4}>Happy Call</Grid>
                    <Grid item xs={6}>
                        {loadHC ? <Skeleton animation="wave" /> : <div className={countHC > 0 ? 'text-right bage-success' : 'text-right bage-error'}><u>{countHC}</u></div>}
                    </Grid>
                </Grid>
                <Grid item xs={12} container className='link-box-pointer' onClick={() => setOpen({ ...open, sms_ticket: true })}>
                    <Grid item xs={2}><Textsms /></Grid>
                    <Grid item xs={4}>SMS Ticket</Grid>
                    <Grid item xs={6}>
                        {loadSms ? <Skeleton animation="wave" /> : <div className={countSms > 0 ? 'text-right bage-success' : 'text-right bage-error'}><u>{countSms}</u></div>}
                    </Grid>
                </Grid>

                <Grid item xs={12} container className='link-box-pointer' onClick={() => setOpen({ ...open, wifi: true })}>
                    <Grid item xs={2}><SignalWifi3Bar /></Grid>
                    <Grid item xs={4}>LTC WIFI</Grid>
                    <Grid item xs={6}>
                        {loadWifi ? <Skeleton animation="wave" /> : <div className={countWifi > 0 ? 'text-right bage-success' : 'text-right bage-error'}><u>{countWifi}</u></div>}
                    </Grid>
                </Grid>

                <Grid item xs={12} container className='link-box-pointer' onClick={() => setOpen({ ...open, user_blacklist: true })}>
                    <Grid item xs={2}><Block /></Grid>
                    <Grid item xs={10}>user blacklist</Grid>
                </Grid>
                <Grid item xs={12} container className='link-box-pointer' onClick={() => setOpen({ ...open, adjustment_log: true })}>
                    <Grid item xs={2}><CurrencyExchange /></Grid>
                    <Grid item xs={10}>Adjustment log (CBS)</Grid>
                </Grid>
                <Grid item xs={12} container className='link-box-pointer' onClick={() => setOpen({ ...open, package_bss: true })}>
                    <Grid item xs={2}><AddCard /></Grid>
                    <Grid item xs={10}>Package log (BSS)</Grid>
                </Grid>
                {/* {type?.NETWORK_CODE === 'F' && <Grid item xs={12} container className='link-box-pointer' onClick={() => setOpen({ ...open, queryunbar: true })}>
                    <Grid item xs={2}><RemoveCircleOutline /></Grid>
                    <Grid item xs={10}>Query Unbar</Grid>
                </Grid>} */}

            </Grid>

            <ResetSim show={open.reset} cb={(e) => setOpen({ ...open, reset: e })} />
            <HappyCall open={open.happyCall} cb={(e) => setOpen({ ...open, happyCall: e })} count={(e) => setCountHC(e)} done={loadHC} ifdone={(e) => setLoadHC(e)} />
            <SmsTicket open={open.sms_ticket} cb={(e) => setOpen({ ...open, sms_ticket: e })} count={(e) => setCountSms(e)} done={loadSms} ifdone={(e) => setLoadSms(e)} />
            <MasterSim open={open.mastersim} cb={(e) => setOpen({ ...open, mastersim: e })} />
            <Info178 open={open.info178} cb={(e) => setOpen({ ...open, info178: e })} />

            <HlrData open={hlr} cb={(e) => setHlr(e)} />
            <Wifi open={open.wifi} cb={(e) => setOpen({ ...open, wifi: e })} count={(e) => setCountWifi(e)} stop={(e) => setLoadWifi(e)} />
            <OrderChange open={open.orderChange} cb={(e) => setOpen({ ...open, orderChange: e })} count={(e) => setOrderChangeCount(e)} done={loadOrderChange} ifdone={(e) => setLoadOrderChange(e)} />
            <UserBlacklist
                open={open.user_blacklist}
                cb={(e) => setOpen({ ...open, user_blacklist: e })}
            />
            <QueryAdjustLog
                open={open.adjustment_log}
                cb={(e) => setOpen({ ...open, adjustment_log: e })}
            />
            <CheckPackageBSS
                open={open.package_bss}
                cb={(e) => setOpen({ ...open, package_bss: e })}
            />
            {/* <QueryUnbar
                open={open.queryunbar}
                cb={(e) => setOpen({ ...open, queryunbar: e })}
            /> */}
        </>
    )
}

export default Others