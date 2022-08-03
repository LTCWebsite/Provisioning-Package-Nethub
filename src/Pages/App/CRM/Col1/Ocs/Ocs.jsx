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

function Ocs({ load, st }) {
    const [show, setShow] = useState(false)
    const [open, setOpen] = useState(false)

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
                    <Grid item container xs={12} className={st === "Active" ? 'link-box-success-click-hover' : 'link-box-error-click'} onClick={() => setOpen(st === "Active" ? true : false)}>
                        <Grid item xs={1}><Visibility style={{ paddingTop: 4 }} /></Grid>
                        <Grid item xs={5}><div style={{ paddingTop: 4 }}>&nbsp;OCS Status : </div></Grid>
                        <Grid item xs={5} className="text-right">
                            <div>&nbsp;{st}</div>
                        </Grid>
                        <Grid item xs={1}>
                            {st === "Active" ?
                                <CheckCircle className={'link-icon-error'} style={{ paddingTop: 4 }} /> :
                                <Can className={'link-icon-success'} style={{ paddingTop: 4 }} />}
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
                        <Grid item xs={10}><div className="center"><h1>ຂໍ້ມູນການລົງທະບຽນ OCS</h1></div></Grid>
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