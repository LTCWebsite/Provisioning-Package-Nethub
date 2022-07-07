import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid } from '@mui/material';
import { Close } from '@mui/icons-material'
import Tablepackage from './Tablepackage';

export default function PackageHistory({ open, cb, total }) {
    return (
        <>
            <Dialog
                open={open}
                onClose={() => cb(!open)}
                maxWidth={"95%"}
            >
                <Grid container>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                        <DialogTitle className='center'>Package History</DialogTitle>
                    </Grid>
                    <Grid item xs={3}>
                        <div className='right'><Close className='icon' onClick={() => cb(!open)} /></div>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} style={{ width: '95%' }}>
                        <Tablepackage total={total} />
                    </Grid>
                </Grid>
            </Dialog>
        </>
    );
}
