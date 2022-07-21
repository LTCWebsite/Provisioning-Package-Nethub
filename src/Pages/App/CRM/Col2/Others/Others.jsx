import { Info, SentimentSatisfiedAlt, SettingsBackupRestore, SimCardAlert, Textsms } from '@mui/icons-material'
import { Grid, Skeleton } from '@mui/material'
import React, { useState } from 'react'
import HappyCall from './Model/HappyCall'
import Info178 from './Model/Info178'
import MasterSim from './Model/MasterSim'
import ResetSim from './Model/ResetSim'
import SmsTicket from './Model/SmsTicket'

function Others() {
    const [open, setOpen] = useState({ reset: false, sms_ticket: false, happyCall: false, mastersim: false, info178: false })
    const [countSms, setCountSms] = useState(0)
    const [countHC, setCountHC] = useState(0)
    const [loadHC, setLoadHC] = useState(true)
    const [loadSms, setLoadSms] = useState(true)

    return (
        <>
            <Grid container>
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
            <MasterSim open={open.mastersim} cb={(e) => setOpen({ ...open, mastersim: e })} />
            <Info178 open={open.info178} cb={(e) => setOpen({ ...open, info178: e })} />
        </>
    )
}

export default Others