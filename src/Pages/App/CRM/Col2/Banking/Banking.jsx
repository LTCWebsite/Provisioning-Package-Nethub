import { AddToPhotos, AttachMoney, LocalAtm, MoneyOff } from '@mui/icons-material'
import { Grid, Skeleton } from '@mui/material'
import React, { useState, useCallback } from 'react'
import Fadao from './Model/Fadao'
import BorrowNew from './Model/BorrowNew'
import MTopup from './Model/MTopup'
import Payment from './Model/Payment'
import Topup from './Model/Topup'

function Banking() {
    const [open, setOpen] = useState({ mservice: false, mmoney: false, topup: false, fadao: false, borrowNew: false, sms: false, mtopup: false, payment: false })
    const [count, setCount] = useState({ fadao: 0, borrowNew: 0, sms: 0, topup: 0, mtopup: 0 })
    const [loading, setLoading] = useState({ fadao: true, borrowNew: true, sms: true, topup: true, mtopup: true })

    const [lMtopup, setLMtopup] = useState(true)
    const [lTopup, setLTopup] = useState(true)
    const [lPayment, setLPayment] = useState(true)
    const [cMtopup, setCMtopup] = useState(0)
    const [cTopup, setCTopup] = useState(0)
    const [cPayment, setCPayment] = useState(0)

    const handleOpen = useCallback((key) => {
        setOpen({ mservice: false, mmoney: false, topup: false, fadao: false, borrowNew: false, sms: false, mtopup: false, payment: false, [key]: true })
    }, [])

    const handleClose = useCallback((key, value) => {
        setOpen(prev => ({ ...prev, [key]: value }))
    }, [])

    const handleCount = useCallback((key, value) => {
        setCount(prev => ({ ...prev, [key]: value }))
    }, [])

    const handleLoading = useCallback((key, value) => {
        setLoading(prev => ({ ...prev, [key]: value }))
    }, [])

    const handleCloseFadao = useCallback((e) => handleClose('fadao', e), [handleClose])
    const handleCloseBorrowNew = useCallback((e) => handleClose('borrowNew', e), [handleClose])
    const handleCloseMtopup = useCallback((e) => handleClose('mtopup', e), [handleClose])
    const handleCloseTopup = useCallback((e) => handleClose('topup', e), [handleClose])
    const handleClosePayment = useCallback((e) => handleClose('payment', e), [handleClose])

    const handleCountFadao = useCallback((e) => handleCount('fadao', e), [handleCount])
    const handleCountBorrowNew = useCallback((e) => handleCount('borrowNew', e), [handleCount])

    const handleLoadingFadao = useCallback((e) => handleLoading('fadao', e), [handleLoading])
    const handleLoadingBorrowNew = useCallback((e) => handleLoading('borrowNew', e), [handleLoading])

    return (
        <>
            <div style={{ padding: '16px', backgroundColor: '#f8f9fc', borderRadius: '12px' }}>
                <Grid container spacing={2}>
                    {/* ຢືມ ແລະ ຕັດເງິນ */}
                    <Grid item xs={6} sm={4}>
                        <div className="modern-banking-card" onClick={() => handleOpen('fadao')}>
                            <div className={`modern-count-badge ${count.fadao > 0 ? 'bage-success-modern' : 'bage-error-modern'}`}>
                                {count.fadao}
                            </div>
                            <div className="modern-icon-container">
                                <AttachMoney />
                            </div>
                            <div className="modern-card-title">ຢືມ ແລະ ຕັດເງິນ</div>
                            {loading.fadao && <Skeleton className="modern-skeleton" animation="wave" />}
                        </div>
                    </Grid>

                    {/* ຢືມ ແລະ ຕັດເງິນ (New) */}
                    <Grid item xs={6} sm={4}>
                        <div className="modern-banking-card" onClick={() => handleOpen('borrowNew')}>
                            <div className={`modern-count-badge ${count.borrowNew > 0 ? 'bage-success-modern' : 'bage-error-modern'}`}>
                                {count.borrowNew}
                            </div>
                            <div className="modern-icon-container" style={{ color: '#4e73df' }}>
                                <AttachMoney />
                            </div>
                            <div className="modern-card-title">ຢືມ ແລະ ຕັດເງິນ (New)</div>
                            {loading.borrowNew && <Skeleton className="modern-skeleton" animation="wave" />}
                        </div>
                    </Grid>

                    {/* Topup And M-Topup */}
                    <Grid item xs={6} sm={4}>
                        <div className="modern-banking-card" onClick={() => handleOpen('mtopup')}>
                            <div className={`modern-count-badge ${cMtopup > 0 ? 'bage-success-modern' : 'bage-error-modern'}`}>
                                {cMtopup}
                            </div>
                            <div className="modern-icon-container" style={{ color: '#1cc88a' }}>
                                <AddToPhotos />
                            </div>
                            <div className="modern-card-title">Topup And M-Topup</div>
                            {lMtopup && <Skeleton className="modern-skeleton" animation="wave" />}
                        </div>
                    </Grid>

                    {/* Topup Banking */}
                    <Grid item xs={6} sm={4}>
                        <div className="modern-banking-card" onClick={() => handleOpen('topup')}>
                            <div className={`modern-count-badge ${cTopup > 0 ? 'bage-success-modern' : 'bage-error-modern'}`}>
                                {cTopup}
                            </div>
                            <div className="modern-icon-container" style={{ color: '#f6c23e' }}>
                                <LocalAtm />
                            </div>
                            <div className="modern-card-title">Topup Banking</div>
                            {lTopup && <Skeleton className="modern-skeleton" animation="wave" />}
                        </div>
                    </Grid>

                    {/* Payment */}
                    <Grid item xs={6} sm={4}>
                        <div className="modern-banking-card" onClick={() => handleOpen('payment')}>
                            <div className={`modern-count-badge ${cPayment > 0 ? 'bage-success-modern' : 'bage-error-modern'}`}>
                                {cPayment}
                            </div>
                            <div className="modern-icon-container" style={{ color: '#e74a3b' }}>
                                <MoneyOff />
                            </div>
                            <div className="modern-card-title">Payment</div>
                            {lPayment && <Skeleton className="modern-skeleton" animation="wave" />}
                        </div>
                    </Grid>
                </Grid>
            </div>

            <Fadao open={open.fadao} cb={handleCloseFadao} count={handleCountFadao} stop={handleLoadingFadao} />
            <BorrowNew open={open.borrowNew} cb={handleCloseBorrowNew} count={handleCountBorrowNew} stop={handleLoadingBorrowNew} />
            <MTopup open={open.mtopup} cb={handleCloseMtopup} count={(e) => setCMtopup(e)} stop={(e) => setLMtopup(e)} />
            <Topup open={open.topup} cb={handleCloseTopup} count={(e) => setCTopup(e)} stop={(e) => setLTopup(e)} />
            <Payment open={open.payment} cb={handleClosePayment} count={(e) => setCPayment(e)} stop={(e) => setLPayment(e)} />
        </>
    )
}

export default Banking