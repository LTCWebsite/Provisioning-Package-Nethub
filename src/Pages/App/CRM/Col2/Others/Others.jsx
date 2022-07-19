import { SentimentSatisfiedAlt, SettingsBackupRestore, Textsms } from '@mui/icons-material'
import { Grid, Skeleton } from '@mui/material'
import React, { useState } from 'react'
import HappyCall from './Model/HappyCall'
import ResetSim from './Model/ResetSim'
import SmsTicket from './Model/SmsTicket'

function Others() {
    const [open, setOpen] = useState({ reset: false, sms_ticket: false, happyCall: false })
    const [count, setCount] = useState({ sms_ticket: 0, happyCall: 0 })
    const [countSms, setCountSms] = useState(0)
    const [countHC, setCountHC] = useState(0)
    const [loadHC, setLoadHC] = useState(true)
    const [loadSms, setLoadSms] = useState(true)

    return (
        <>
            <Grid container>
                <Grid item xs={12} container className='link-box-pointer' onClick={() => setOpen({ ...open, reset: true })}>
                    <Grid item xs={2}><SettingsBackupRestore /></Grid>
                    <Grid item xs={10}>Reset Sim</Grid>
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
            </Grid>

            <ResetSim show={open.reset} cb={(e) => setOpen({ ...open, reset: e })} />
            <HappyCall open={open.happyCall} cb={(e) => setOpen({ ...open, happyCall: e })} count={(e) => setCountHC(e)} done={loadHC} ifdone={(e) => setLoadHC(e)} />
            <SmsTicket open={open.sms_ticket} cb={(e) => setOpen({ ...open, sms_ticket: e })} count={(e) => setCountSms(e)} done={loadSms} ifdone={(e) => setLoadSms(e)} />
        </>
    )
}

export default Others