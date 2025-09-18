import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid } from '@mui/material';
import { Close } from '@mui/icons-material';
import ElasticSearchTable from './ElasticSearchTable';

export default function PackageHistoryNew({ open, cb, total }) {
    return (
        <Dialog
            open={open}
            onClose={() => cb(!open)}
            maxWidth={"lg"} // use lg for large table inside dialog
            fullWidth
        >
            <Grid container alignItems="center">
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <DialogTitle className="center">Package History (New)</DialogTitle>
                </Grid>
                <Grid item xs={3}>
                    <div className="right">
                        <Close className="icon" onClick={() => cb(!open)} />
                    </div>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={12} style={{ padding: '16px' }}>
                    {/* Insert ElasticSearchTable here */}
                    <ElasticSearchTable  />
                </Grid>
            </Grid>
        </Dialog>
    );
}
