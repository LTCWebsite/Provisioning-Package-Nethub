import { Close } from '@mui/icons-material';
import { Alert, Dialog, Grid, Slide } from '@mui/material'
import React, { useState } from 'react'
import { AxiosReq } from '../../../../../../Components/Axios';
import MmoneyTabs from './MmoneyTabs';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Mmoney({ open, cb, done, count }) {
    const [stop, setStop] = useState(true)

    React.useEffect(() => {
        setStop(false)
        var phone = localStorage.getItem("ONE_PHONE")
        AxiosReq.get("NewLmmPackage?msisdn=" + phone + "&page=0&limit=0").then((res) => {
            if (res.status === 200) {
                setStop(true);
                done(false)
                count(res?.data?.total)
            }
        }).catch((err) => {
            setStop(true);
        })

    }, [])
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
                        <Grid item xs={10}><div className="center"><h1>M-money</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className='right'><Close className='icon' onClick={() => cb(!open)} /></div>
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: 0 }}>
                            <MmoneyTabs />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}

export default Mmoney