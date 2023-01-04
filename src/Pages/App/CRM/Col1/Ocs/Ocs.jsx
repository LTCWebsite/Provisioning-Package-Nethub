import { CheckCircle, Close, } from '@mui/icons-material'
import { Dialog, Grid, Skeleton, Slide } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Can from '@material-ui/icons/Cancel'
import { Visibility } from '@material-ui/icons'
import OCSTab from './OCSTab'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Ocs({ cus, load, st }) {
    const [show, setShow] = useState(false)
    const [open, setOpen] = useState(false)

    // console.log(cus)
    useEffect(() => {
        setShow(load)
    }, [])

    return (
        <>
            {!show ?
                <Grid item xs={12}>
                    <Skeleton animation="wave" className="wave" />
                </Grid> :
                <>
                    {/* <Grid item container xs={12} className={st === "Active" ? 'link-box-success-click-hover next' : 'link-box-error-click next'} onClick={() => setOpen(st === "Active" ? true : false)}>
                        <Grid item xs={1}><Visibility style={{ paddingTop: 4 }} /></Grid>
                        <Grid item xs={5}><div style={{ paddingTop: 4 }}>&nbsp;CBS Status : </div></Grid>
                        <Grid item xs={5} className="text-right">
                            <div>&nbsp;{st}</div>
                        </Grid>
                        <Grid item xs={1}>
                            {st === "Active" ?
                                <CheckCircle className={'link-icon-error'} style={{ paddingTop: 4 }} /> :
                                <Can className={'link-icon-success'} style={{ paddingTop: 4 }} />}
                        </Grid>
                    </Grid> */}
                    <Grid item container xs={12} className={cus?.resultCode === "0" ? 'link-box-success-click-hover next' : 'link-box-error-click next'} onClick={() => setOpen(cus?.resultCode === "0" ? true : false)}>
                        <Grid item xs={1}><Visibility style={{ paddingTop: 4 }} /></Grid>
                        <Grid item xs={5}><div style={{ paddingTop: 4 }}>&nbsp;CBS Status : </div></Grid>
                        <Grid item xs={5} className="text-right">
                            <div>&nbsp;{st}</div>
                        </Grid>
                        <Grid item xs={1}>
                            {cus?.resultCode === "0" ?
                                <CheckCircle className={'link-icon-error'} style={{ paddingTop: 4 }} /> :
                                <Can className={'link-icon-success'} style={{ paddingTop: 4 }} />}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container className=''>
                        <Grid item container xs={12} className='link-box'>
                            <Grid item xs={6}><div>Offering ID : </div></Grid>
                            <Grid item xs={6}><div className='text-right'>{cus?.primaryOffering}</div></Grid>
                        </Grid>
                        <Grid item container xs={12} className='link-box'>
                            <Grid item xs={6}><div>Offering Name : </div></Grid>
                            <Grid item xs={6}><div className='text-right'>{cus?.offeringName}</div></Grid>
                        </Grid>
                    </Grid>
                </>}

            <Dialog
                maxWidth="xl"
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}><div className="center"><h1>ຂໍ້ມູນການລົງທະບຽນ CBS</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className='right'><Close className='icon' onClick={() => setOpen(!open)} /></div>
                        </Grid>
                        <Grid item xs={12} style={{ width: 1000 }}>
                            <OCSTab />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default Ocs