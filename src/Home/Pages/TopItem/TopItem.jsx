import React from 'react'
import { Card, CardContent, Dialog, Grid, IconButton, Slide } from '@mui/material'
import { Close } from '@mui/icons-material'

import Other from '../../../Pages/Menu/Other'
import MasterSim from '../../../Pages/MasterSim/MasterSim'
import Info178 from '../../../Pages/Menu178/Info178'
import Checkcard from './CheckCard'

const Transition_down = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />
})
const Transition_left = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />
})
const Transition_up = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})
const Transition_right = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props} />
})

function TopItem() {
    const [open, setOpen] = React.useState({ card: false, info: false, sim: false, others: false })

    return (
        <>
            <Grid item xs={12} md={3}>
                <Card elevation={0} className="box-1" style={{ borderLeft: '5px solid #E74A3B' }} onClick={() => setOpen({ ...open, card: true })}>
                    <CardContent className="content-1">
                        <div className="box-text">Check Card</div>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={3}>
                <Card elevation={0} className="box-1" style={{ borderLeft: '5px solid #1CC88A' }} onClick={() => setOpen({ ...open, info: true })}>
                    <CardContent className="content-1">
                        <div className="box-text">Information 178</div>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={3}>
                <Card elevation={0} className="box-1" style={{ borderLeft: '5px solid #4E73DF' }} onClick={() => setOpen({ ...open, sim: true })}>
                    <CardContent className="content-1">
                        <div className="box-text">Master Sim</div>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={3}>
                <Card elevation={0} className="box-1" style={{ borderLeft: '5px solid #F6C23D' }} onClick={() => setOpen({ ...open, others: true })}>
                    <CardContent className="content-1">
                        <div className="box-text">Others</div>
                    </CardContent>
                </Card>
            </Grid>

            <Dialog
                maxWidth="xl"
                open={open.others}
                onClose={() => setOpen({ ...open, others: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition_down}
            >
                <Grid container style={{ width: 1200, height: 600 }}>
                    <Grid item container xs={12}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}><div className="center"><h1>Others</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setOpen({ ...open, others: false })}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Other />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>

            <Dialog
                maxWidth="xl"
                open={open.sim}
                onClose={() => setOpen({ ...open, sim: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition_left}
            >
                <Grid container style={{ width: 1200 }}>
                    <Grid item container xs={12}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}><div className="center"><h1>Master Sim</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setOpen({ ...open, sim: false })}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <MasterSim />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>

            <Dialog
                maxWidth="xl"
                open={open.info}
                onClose={() => setOpen({ ...open, info: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition_right}
            >
                <Grid container style={{ width: 1200 }}>
                    <Grid item container xs={12}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}><div className="center"><h1>Information 178</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setOpen({ ...open, info: false })}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Info178 />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>

            <Dialog
                maxWidth="xl"
                open={open.card}
                onClose={() => setOpen({ ...open, card: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition_up}
            >
                <Grid container style={{ width: 1200 }}>
                    <Grid item container xs={12}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}><div className="center"><h1>Check Card</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setOpen({ ...open, card: false })}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Checkcard />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>

        </>
    )
}

export default TopItem
