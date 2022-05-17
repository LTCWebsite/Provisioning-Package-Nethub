import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { Grid } from '@material-ui/core';

export default function VASConfirm({ body, data, st }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }
    

    return (
        <div>
            <div className="right link" onClick={handleClickOpen}>ປະຫວັດການຊຳລະ</div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Grid container style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Grid item container xs={12}>
                        <Grid item xs={12}><div className="center"><h2>ຢືນຢັນການນຳໃຊ້</h2></div></Grid>
                        <Grid item xs={12}><div className="center">{body}</div></Grid>
                        <Grid item container xs={12}>
                            <Grid item xs={6}>
                                <div className="center"><Button color="primary" onClick={handleClose}>No</Button></div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="center"><Button variant="contained" color="primary">Yes</Button></div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    );
}
