import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Typography, Grid, Dialog, Slide, Button, Badge, IconButton } from '@mui/material';
import { AppSettingsAlt, Close, MonetizationOn } from '@mui/icons-material'

import MService from '../../../Pages/MiniCRM/page/MService';
import MmoneyTab from '../../../Pages/MiniCRM/page/MmoneyTab';
import Cookies from 'js-cookie';
import Axios from '../../../Pages/Components/Axios';
import GetPhoneNumber from '../../../Pages/Components/GetPhoneNumber';
import moment from 'moment';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
export default function Accordion_3() {
    const expanded = false
    const [open, setOpen] = React.useState({ m_service: false, m_money: false })
    const [m_service, setM_service] = React.useState({ st: '', data: [] })
    const [m_money, setM_money] = React.useState({ st: '', data: [] })
    React.useEffect(() => {
        var phone = GetPhoneNumber()
        setM_service({ st: 'loading', data: [] })
        Axios.get("MServicesTopup?msisdn=" + phone + "&status=" + 'ALL', { headers: { Authorization: "Bearer " + Cookies.get("one_session") }, }).then((res) => {
            if (res.status === 200) {
                var num = 0;
                var update = res.data.map((row) => {
                    row.id_idx = num + 1;
                    row.recodeDate = moment(row.recodeDate).format(
                        "DD-MM-YYYY HH:mm:ss"
                    );
                    num = num + 1;
                    return row;
                });
                setM_service({ st: num, data: update })
            }
        }).catch((err) => {
            setM_service({ st: 'No', data: [] })
        })

        setM_money({ st: 'loading', data: [] })
        Axios.get("MMoneyTopupLog?msisdn=" + phone, { headers: { 'Authorization': 'Bearer ' + Cookies.get("one_session") } }).then(res => {
            if (res.status === 200) {
                var num = 0
                var update = res.data.map(row => {
                    row.id_idx = num + 1
                    row.date_buy = moment(row.createDate).format("DD-MM-YYYY HH:mm:ss")
                    row.all_status = row.resultCode === '200' ? false : true
                    num = num + 1
                    return row
                })
                setM_money({ st: num, data: update })
            }
        }).catch(err => {
            setM_money({ st: 'No', data: [] })
        })

    }, [])

    return (
        <div className="box-accordion">

            <Accordion expanded={expanded === 'panel2'} onClick={() => setOpen({ ...open, m_service: true })}>
                <AccordionSummary>
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                        <AppSettingsAlt className="n-icon" />
                        <Badge badgeContent={m_service.st >= 10 ? m_service.st + '+' : m_service.st.toString()} color={m_service.st === '' ? 'default' : m_service.st === 'loading' ? 'info' : m_service.st <= 0 ? 'secondary' : 'primary'}>
                            <u className="nav-text">M-Service &nbsp;</u>
                        </Badge>
                    </Typography>
                </AccordionSummary>
            </Accordion>

            <Accordion expanded={expanded === 'panel3'} onClick={() => setOpen({ ...open, m_money: true })}>
                <AccordionSummary>
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                        <MonetizationOn className="n-icon" />
                        <Badge badgeContent={m_money.st >= 10 ? m_money.st + '+' : m_money.st.toString()} color={m_money.st === '' ? 'default' : m_money.st === 'loading' ? 'info' : m_money.st <= 0 ? 'secondary' : 'primary'}>
                            <u className="nav-text">M-Money &nbsp;</u>
                        </Badge>
                    </Typography>
                </AccordionSummary>
            </Accordion>

            <Dialog
                maxWidth="xl"
                fullWidth={true}
                open={open.m_service}
                onClose={() => setOpen({ ...open, m_service: false })}
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
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setOpen({ ...open, m_service: false })}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: 20 }}>
                            <MService />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>

            <Dialog
                maxWidth="xl"
                fullWidth={true}
                open={open.m_money}
                onClose={() => setOpen({ ...open, m_money: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12}>
                        <Grid item xs={1}>

                        </Grid>
                        <Grid item xs={10}><div className="center"><h1>M-Money</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setOpen({ ...open, m_money: false })}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: 20 }}>
                            <MmoneyTab />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>

        </div>
    )
}
