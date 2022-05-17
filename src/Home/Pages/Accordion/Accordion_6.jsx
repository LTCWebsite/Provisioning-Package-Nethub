import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { NetworkWifi, Article, Close } from '@mui/icons-material'
import { Dialog, Grid, Slide, Badge, IconButton } from '@mui/material'
import GetPhoneNumber from '../../../Pages/Components/GetPhoneNumber';
import Axios from '../../../Pages/Components/Axios';
import Cookies from 'js-cookie';
import moment from 'moment';

import WifiTab from '../../../Pages/MiniCRM/page/WifiTab'
import HLR from '../../../Pages/MiniCRM/page/HLR'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Accordion_6() {
    const expanded = false
    const [open, setOpen] = React.useState({ wifi: false, hlr: false })
    const [wifi, setWifi] = React.useState({ st: '', data: [] })

    React.useEffect(() => {
        var phone = GetPhoneNumber()
        setWifi({ st: 'loading', data: [] })
        Axios.get("HistoryBuyPackageLTCWiFi?msisdn=" + phone, { headers: { 'Authorization': 'Bearer ' + Cookies.get("one_session") } }).then(res => {
            if (res.status === 200) {
                var num = 0
                var update = res.data.map(row => {
                    row.id_idx = num + 1
                    row.date_buy = moment(row.dateTime).format("DD-MM-YYYY HH:mm:ss")
                    num = num + 1
                    return row
                })
                setWifi({ st: num, data: update })
            }
        }).catch(err => {
            setWifi({ st: 'No', data: [] })
        })
    }, [])


    return (
        <div className="box-accordion">

            <Accordion expanded={expanded === 'panel4'} onClick={() => setOpen({ ...open, wifi: true })}>
                <AccordionSummary>
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                        <NetworkWifi className="n-icon" />
                        <Badge badgeContent={wifi.st >= 10 ? wifi.st + '+' : wifi.st.toString()} color={wifi.st === '' ? 'default' : wifi.st === 'loading' ? 'info' : wifi.st <= 0 ? 'secondary' : 'primary'}>
                            <u className="nav-text">LTC Wifi &nbsp;</u>
                        </Badge>
                    </Typography>
                </AccordionSummary>
            </Accordion>

            <Accordion expanded={expanded === 'panel4'} onClick={() => setOpen({ ...open, hlr: true })}>
                <AccordionSummary>
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                        <Article className="n-icon" /><u className="nav-text">HLR</u>
                    </Typography>
                </AccordionSummary>
            </Accordion>

            <Dialog
                maxWidth="xl"
                fullWidth={true}
                open={open.wifi}
                onClose={() => setOpen({ ...open, wifi: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12}>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={10}><div className="center"><h1>LTC Wifi History</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setOpen({ ...open, wifi: false })}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: 20 }}>
                            <WifiTab />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>

            <Dialog
                maxWidth="xl"
                fullWidth={true}
                open={open.hlr}
                onClose={() => setOpen({ ...open, hlr: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12}>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={10}><div className="center"><h1>HLR</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setOpen({ ...open, hlr: false })}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <HLR />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>

        </div>
    )
}
