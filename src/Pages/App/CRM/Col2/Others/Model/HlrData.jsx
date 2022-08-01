import { Close } from '@mui/icons-material'
import { Dialog, Grid, Slide } from '@mui/material'
import React from 'react'
import HLRtab from './HLRtab'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

function HlrData({ open, cb }) {
    
    return (
        <>
            <Dialog
                maxWidth="xl"
                open={open}
                onClose={() => cb(!open)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container style={{ width: 1200 }}>
                    <Grid item container xs={12}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}><div className="center"><h1>HLR</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className='right'><Close className='icon' onClick={() => cb(!open)} /></div>
                        </Grid>
                        <Grid item xs={12}>
                            <HLRtab />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default HlrData
