import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Typography, Dialog, Grid, Slide, Badge, IconButton } from '@mui/material';
import { AddIcCall, Close, CurrencyExchange, VideoCall, WifiCalling3 } from '@mui/icons-material'

import OCSTab from '../../../Pages/MiniCRM/page/OCSTab'
import CBS from '../../../Pages/MiniCRM/page/CBS'
import Cookies from 'js-cookie';
import GetPhoneNumber from '../../../Pages/Components/GetPhoneNumber';
import Axios from '../../../Pages/Components/Axios';
import moment from 'moment';
import MyTable from '../../../Pages/MiniCRM/Table/Table';
import Doing from '../../../Pages/Components/Doing';
import Crypt from '../../../Pages/Components/Crypt';
import BSSdialog from '../../../Pages/MiniCRM/page/BSSdialog';
import { Alert } from '@material-ui/lab';
import ModalOCSTransferLog from './More/ModalOCSTransferLog';
import ModalBSS from './More/ModalBSS';
import Dialog_BSS_Register from '../Dialog/Dialog_BSS_Register';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function AllAccordion() {
    const expanded = false
    const [open, setOpen] = React.useState({ ocs: false, bss: false, transfer: false, bss_service: false, bssNoneGroup: false,cbs:false })
    const [bss, setBss] = React.useState({ st: '', data: [] })
    const [bssNone, setBssNone] = React.useState({ st: '', data: [] })
    const [bssService, setBssService] = React.useState({ st: '', data: [] })
    const [network, setNetwork] = React.useState('M')

    React.useEffect(() => {
        var phone = GetPhoneNumber()
        Axios.get("api/CheckNetworkType?msisdn=" + phone, { headers: { 'Authorization': 'Bearer ' + Cookies.get("one_session") } }).then(res => {
            if (res.status === 200) {
                setNetwork(res.data.networK_CODE)
            }
        })
        
        setBss({ st: 'loading', data: [] })
        Axios.get("QueryBSS?MSISDN=" + phone, { headers: { 'Authorization': 'Bearer ' + Cookies.get("one_session") } }).then(res => {
            if (res.status === 200) {
                var num = 0
                var update = res.data.map(row => {
                    row.id_idx = num + 1
                    row.date = moment(row.month_Bill).format("DD-MM-YYYY")
                    num = num + 1
                    return row
                })
                setBss({ st: num, data: update })
                // console.log(update)
            }
        }).catch(err => {
            setBss({ st: 'No', data: [] })
        })

        setBssService({ st: 'loading', data: [] })
        Axios.get("BSSRegisterService?MSISDN=" + phone, { headers: { 'Authorization': 'Bearer ' + Cookies.get("one_session") } }).then(res => {
            if (res.status === 200) {
                let num = 0
                var update = res.data.map(row => {
                    row.id_idx = num + 1
                    row.date_register = moment(row.reG_DATE).format("DD-MM-YYYY") + ' ' + String(row.reG_DATE).substring(9)
                    row.date_start = moment(row.stA_DATETIME).format("DD-MM-YYYY") + ' ' + String(row.stA_DATETIME).substring(9)
                    row.date_end = row.enD_DATETIME !== "" ? moment(row.enD_DATETIME).format("DD-MM-YYYY") + ' ' + String(row.enD_DATETIME).substring(9) : ''
                    num = num + 1
                    return row
                })
                // console.log(res.data)
                setBssService({ st: num, data: update })
            }
        }).catch(err => {
            console.log(err)
            setBssService({ st: 'No', data: [] })
        })

    }, [])

    const columns = [
        { title: 'ລຳດັບ', field: 'id_idx', maxWidth: 50 },
        // { title: 'ReceiptNo', field: 'receipt_no' },
        { title: 'ບິນຂອງເດືອນ', field: 'date' },
        { title: 'ຊ່ອງທາງການຊຳລະ', field: 'staffcode' },
        { title: 'ຄ່າບໍລິການໃນເດືອນ', field: 'monthly_Fee', type: 'numeric', render: row => row.monthly_Fee > 0 ? parseInt(row.monthly_Fee).toLocaleString() : row.monthly_Fee },
        { title: 'ຈຳນວນທີ່ຈ່າຍເກີນ', field: 'overPaid_Amount', type: 'numeric', render: row => row.overPaid_Amount > 0 ? parseInt(row.overPaid_Amount).toLocaleString() : row.overPaid_Amount },
        { title: 'ຍອດຍັງເຫຼືອ', field: 'owe', type: 'numeric', render: row => row.owe > 0 ? parseInt(row.owe).toLocaleString() : row.owe },
        { title: 'ຈຳນວນຈ່າຍໂຕຈິງ', field: 'payment', type: 'numeric', render: row => row.payment > 0 ? parseInt(row.payment).toLocaleString() : row.payment },
    ]
    const columnsService = [
        { title: 'ລຳດັບ', field: 'id_idx', maxWidth: 50 },
        // { title: 'Msisdn', field: 'isdn' },
        { title: 'ວັນທີ່ລົງທະບຽນ', field: 'date_register', minWidth: 180 },
        { title: 'ວັນທີ່ເລີ່ມຕົ້ນ', field: 'date_start', minWidth: 180 },
        { title: 'ວັນທີ່ສິ້ນສຸດ', field: 'date_end', minWidth: 180 },
        { title: 'ProductID', field: 'producT_ID' },
        { title: 'Type', field: 'g_TYPE' },
        { title: 'ServiceType', field: 'seR_TYPE' },
        { title: 'ServiceName', field: 'servicE_NAME' },
        { title: 'Username', field: 'useR_NAME' },
        { title: 'Value', field: 'value', minWidth: 150 },
        { title: 'ມູນຄ່າ', field: 'amount', type: 'numeric', render: row => parseInt(row.amount) > 0 ? parseInt(row.amount).toLocaleString() : '' },
        { title: 'ສະຖານະ', field: 'status', type: 'numeric' },
    ]

    return (
        <div className="box-accordion">

            {network !== "F" && <>
                <Accordion expanded={expanded === 'panel1'} onClick={() => setOpen({ ...open, ocs: true })}>
                    <AccordionSummary>
                        <Typography sx={{ width: '100%', flexShrink: 0 }}>
                            <AddIcCall className="n-icon" /><u className="nav-text">OCS</u>
                        </Typography>
                    </AccordionSummary>
                </Accordion>
                <Accordion expanded={expanded === 'panel1'} onClick={() => setOpen({ ...open, cbs: true })}>
                    <AccordionSummary>
                        <Typography sx={{ width: '100%', flexShrink: 0 }}>
                            <AddIcCall className="n-icon" /><u className="nav-text">CBSRecharge</u>
                        </Typography>
                    </AccordionSummary>
                </Accordion>

                <Accordion expanded={expanded === 'panel1'} onClick={() => {
                    setOpen({ ...open, transfer: true })
                }}>
                    <AccordionSummary>
                        <Typography sx={{ width: '100%', flexShrink: 0 }}>
                            <CurrencyExchange className="n-icon" />
                            <u className="nav-text">OCS Transfer Log &nbsp;&nbsp;</u>
                        </Typography>
                    </AccordionSummary>
                </Accordion>
            </>}

            {/* <Accordion expanded={expanded === 'panel1'} onClick={() => {
                setOpen({ ...open, bss: true })
                Doing({
                    msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                    username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                    detail: 'check BSS',
                    resualt: 'Operation successed.',
                })
            }}>
                <AccordionSummary>
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                        <WifiCalling3 className="n-icon" />
                        <Badge badgeContent={bss.st >= 10 ? bss.st + '+' : bss.st.toString()} color={bss.st === '' ? 'default' : bss.st === 'loading' ? 'info' : bss.st <= 0 ? 'secondary' : 'primary'}>
                            <u className="nav-text">BSS &nbsp;&nbsp;</u>
                        </Badge>
                    </Typography>
                </AccordionSummary>
            </Accordion> */}


            {/* BSS NONE GROUP */}
            <Accordion expanded={expanded === 'panel1'} onClick={() => {
                setOpen({ ...open, bssNoneGroup: true })
                Doing({
                    msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                    username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                    detail: 'check BSS',
                    resualt: 'Operation successed.',
                })
            }}>
                <AccordionSummary>
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                        <WifiCalling3 className="n-icon" />
                        <Badge badgeContent={bssNone.st >= 10 ? bssNone.st + '+' : bssNone.st.toString()} color={bssNone.st === '' ? 'default' : bssNone.st === 'loading' ? 'info' : bssNone.st <= 0 ? 'secondary' : 'primary'}>
                            <u className="nav-text">BSS &nbsp;&nbsp;</u>
                        </Badge>
                    </Typography>
                </AccordionSummary>
            </Accordion>

            <Accordion expanded={expanded === 'panel1'} onClick={() => {
                setOpen({ ...open, bss_service: true })
                // Doing({
                //     msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                //     username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                //     detail: 'check BSS',
                //     resualt: 'Operation successed.',
                // })
            }}>
                <AccordionSummary>
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                        <VideoCall className="n-icon" />
                        <Badge badgeContent={bssService.st >= 10 ? bss.st + '+' : bssService.st.toString()} color={bssService.st === '' ? 'default' : bssService.st === 'loading' ? 'info' : bssService.st <= 0 ? 'secondary' : 'primary'}>
                            <u className="nav-text">Subscriber Event History &nbsp;&nbsp;</u>
                        </Badge>
                    </Typography>
                </AccordionSummary>
            </Accordion>

            <Dialog
                maxWidth="lg"
                open={open.ocs}
                onClose={() => setOpen({ ...open, ocs: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container style={{ width: 1200 }}>
                    <Grid item container xs={12}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}><div className="center"><h1>OCS</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setOpen({ ...open, ocs: false })}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <OCSTab />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>

            <Dialog
                maxWidth="lg"
                open={open.cbs}
                onClose={() => setOpen({ ...open, cbs: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container style={{ width: 1200 }}>
                    <Grid item container xs={12}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}><div className="center"><h1>CBSRecharge</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setOpen({ ...open, cbs: false })}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <CBS />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>

            <Dialog
                maxWidth="xl"
                open={open.bss}
                onClose={() => setOpen({ ...open, bss: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container style={{ width: 1200 }}>
                    <Grid item container xs={12}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}><div className="center"><h1>BSS</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setOpen({ ...open, bss: false })}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item md={2} lg={3} xl={4}></Grid>
                        <Grid item xs={12} md={8} lg={6} xl={4}>
                            <Alert variant="outlined" severity="info" style={{ marginTop: 10 }}>
                                ກໍລະນີທີ່ຕ້ອງການສະແດງຂໍ້ມູນຫຼາຍກ່ວາ 10 ລາຍການ ໃຫ້ຄຼິກໄປທີ່ More Detail ຢູ່ດ້ານລຸ່ມ
                            </Alert>
                        </Grid>
                        <Grid item xs={12}>
                            <MyTable tTitle={"BSS"} tData={bss.data} tColumns={columns} />
                        </Grid>
                        <Grid item xs={12} className="more-me">
                            <BSSdialog />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>

            <Dialog
                maxWidth="xl"
                open={open.transfer}
                onClose={() => setOpen({ ...open, transfer: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}><div className="center"><h1>OCS Transfer Log</h1></div></Grid>
                    <Grid item xs={1}>
                        <div className="right">
                            <IconButton aria-label="delete" onClick={() => setOpen({ ...open, transfer: false })}>
                                <Close />
                            </IconButton>
                        </div>
                    </Grid>
                    <ModalOCSTransferLog />
                </Grid>
            </Dialog>


            {/* BSS NONE GROUP DIALOG */}
            <Dialog
                maxWidth="xl"
                open={open.bssNoneGroup}
                onClose={() => setOpen({ ...open, bssNoneGroup: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}><div className="center"><h1>BSS</h1></div></Grid>
                    <Grid item xs={1}>
                        <div className="right">
                            <IconButton aria-label="delete" onClick={() => setOpen({ ...open, bssNoneGroup: false })}>
                                <Close />
                            </IconButton>
                        </div>
                    </Grid>
                    <ModalBSS />
                </Grid>
            </Dialog>



            <Dialog
                maxWidth="xl"
                open={open.bss_service}
                onClose={() => setOpen({ ...open, bss_service: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}><div className="center"><h1>Subscriber Event History</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setOpen({ ...open, bss_service: false })}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item md={2} lg={3} xl={4}></Grid>
                        <Grid item xs={12} md={8} lg={6} xl={4}>
                            <Alert variant="outlined" severity="info" style={{ marginTop: 10 }}>
                                ກໍລະນີທີ່ຕ້ອງການສະແດງຂໍ້ມູນຫຼາຍກ່ວາ 10 ລາຍການ ໃຫ້ຄຼິກໄປທີ່ More Detail ຢູ່ດ້ານລຸ່ມ
                            </Alert>
                        </Grid>
                        <Grid item xs={12}>
                            <MyTable tTitle={"Subscriber Event History"} tData={bssService.data} tColumns={columnsService} />
                        </Grid>
                        <Grid item xs={12} className="more-me">
                            <Dialog_BSS_Register />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>

        </div>
    )
}
