import { Close } from '@mui/icons-material';
import { Alert, Dialog, Grid, Slide } from '@mui/material'
import React from 'react'
import MServiceTab from './MserviceTabs';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Mservice({ open, cb, count }) {
    return (
        <>
            <Dialog
                maxWidth="xl"
                fullWidth={true}
                open={open}
                onClose={() => cb(!open)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12}>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={10}><div className="center"><h1>M-Service</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className='right'><Close className='icon' onClick={() => cb(!open)} /></div>
                        </Grid>
                        <Grid item md={2} lg={3} xl={4}></Grid>
                        <Grid item xs={12} md={8} lg={6} xl={4}>
                            <Alert variant="outlined" severity="info" style={{ marginTop: 10 }}>
                                ກໍລະນີທີ່ຕ້ອງການສະແດງຂໍ້ມູນຫຼາຍກ່ວາ 10 ລາຍການ ໃຫ້ຄຼິກໄປທີ່ More Detail ຢູ່ດ້ານລຸ່ມ
                            </Alert>
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: 10 }}>
                            <MServiceTab count={(e) => count(e)} />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default Mservice