import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Typography, Slide, Dialog, Grid, Badge, Alert, IconButton, Tooltip } from '@mui/material';
import { AttachMoney, Sms, Countertops, AddToPhotos, Close, LocalAtm } from '@mui/icons-material'
import BorrowAndDeduct from '../../../Pages/MiniCRM/page/BorrowAndDeduct';
import GetPhoneNumber from '../../../Pages/Components/GetPhoneNumber';
import Axios from '../../../Pages/Components/Axios';
import Cookies from 'js-cookie';
import moment from 'moment';
import TopupDialog from '../../../Pages/MiniCRM/page/TopupDialog';
import TopupBankingDialog from '../../../Pages/MiniCRM/page/TopupBankingDialog';
import SmsBankingDialog from '../../../Pages/MiniCRM/page/SmsBankingDialog'
import MyTable from '../../../Pages/MiniCRM/Table/Table';
import Doing from '../../../Pages/Components/Doing';
import Crypt from '../../../Pages/Components/Crypt';
import PaymentDialog from '../../../Pages/MiniCRM/components/PaymentDialog';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

export default function Accordion_3() {
    const expanded = false
    const [open, setOpen] = React.useState({ fadoa: false, m_topup: false, top_bank: false, sms_bank: false, payment: false })
    const [fadao, setFadao] = React.useState({ st: '', data: [] })
    const [m_topup, setM_topup] = React.useState({ st: '', data: [] })
    const [top_bank, setTop_bank] = React.useState({ st: '', data: [] })
    const [sms_bank, setSms_bank] = React.useState({ st: '', data: [] })
    const [payment, setPayment] = React.useState({ st: '', data: [] })
    const [network, setNetwork] = React.useState('M')

    React.useEffect(() => {
        var phone = GetPhoneNumber()
        Axios.get("api/CheckNetworkType?msisdn=" + phone, { headers: { 'Authorization': 'Bearer ' + Cookies.get("one_session") } }).then(res => {
            if (res.status === 200) {
                setNetwork(res.data.networK_CODE)
                var network_code = res.data.networK_CODE
                if (network_code !== "F") {
                    setFadao({ st: 'loading', data: [] })
                    Axios.get("BorrowfadaoAndKalsym?msisdn_=" + phone, { headers: { 'Authorization': 'Bearer ' + Cookies.get("one_session") } }).then(res => {
                        if (res.status === 200) {
                            var num = 0
                            var update = res.data.map(row => {
                                row.id_idx = num + 1
                                row.date_buy = moment(row.recordDate).format("DD-MM-YYYY HH:mm:ss")
                                row.date_pay = moment(row.lastdatetime).format("DD-MM-YYYY HH:mm:ss")
                                num = num + 1
                                return row
                            })
                            setFadao({ st: num, data: update })
                        }
                    }).catch(err => {
                        setFadao({ st: 'No', data: [] })
                    })

                    setSms_bank({ st: 'loading', data: [] })
                    Axios.get("CheckSmSBankingNew?msisdnn=" + phone, { headers: { 'Authorization': 'Bearer ' + Cookies.get("one_session") } }).then(res => {
                        if (res.status === 200) {
                            var num = 0
                            var update = res.data.map(row => {
                                row.id_idx = num + 1
                                row.date_buy = moment(row.record_date).format("DD-MM-YYYY HH:mm:ss")
                                num = num + 1
                                return row
                            })
                            setSms_bank({ st: num, data: update })
                        }
                    }).catch(err => {
                        setSms_bank({ st: 'No', data: [] })
                    })
                }
            }
        })


        setM_topup({ st: 'loading', data: [] })
        Axios.get("controller?Telephone=" + phone, { headers: { 'Authorization': 'Bearer ' + Cookies.get("one_session") } }).then(res => {
            if (res.status === 200) {
                var num = 0
                var update = res.data.map(row => {
                    row.id_idx = num + 1
                    row.date_buy = moment(row.date).format("DD-MM-YYYY HH:mm:ss")
                    // row.all_status = row.description === 'Operation successed.' ? false : true
                    num = num + 1
                    return row
                })
                setM_topup({ st: num, data: update })
            }
        }).catch(err => {
            setM_topup({ st: 'No', data: [] })
        })

        setTop_bank({ st: 'loading', data: [] })
        Axios.get("CheckTopupBankingNew?msisdnn=" + phone, { headers: { 'Authorization': 'Bearer ' + Cookies.get("one_session") } }).then(res => {
            if (res.status === 200) {
                var num = 0
                var update = res.data.map(row => {
                    row.id_idx = num + 1
                    row.date_buy = moment(row.requestdate_).format("DD-MM-YYYY HH:mm:ss")
                    num = num + 1
                    return row
                })
                setTop_bank({ st: num, data: update })
            }
        }).catch(err => {
            setTop_bank({ st: 'No', data: [] })
        })



        setPayment({ st: 'loading', data: [] })
        Axios.get("Payment?msisdn=" + phone, { headers: { 'Authorization': 'Bearer ' + Cookies.get("one_session") } }).then(res => {
            if (res.status === 200) {
                var num = 0
                var update = res.data.map(row => {
                    row.id_idx = num + 1
                    num = num + 1
                    return row
                })
                setPayment({ st: num, data: update })
            }
        }).catch(err => {
            setPayment({ st: 'No', data: [] })
        })

    }, [])

    const columns = [
        { title: 'No', field: 'id_idx', maxWidth: 100 },
        { title: 'MSISDN', field: 'sourceMsisdn' },
        { title: 'ເວລາຊື້', field: 'date_buy', minWidth: 200 },
        { title: 'ປະເພດ', field: 'type' },
        { title: 'Code', field: 'code' },
        { title: 'ມູນຄ່າ', field: 'amount', type: 'numeric', render: row => row.amount > 0 ? parseInt(row.amount).toLocaleString() : row.amount },
        { title: 'Bonus', field: 'bonus', type: 'numeric', render: row => row.bonus > 0 ? row.bonus.toLocaleString() : row.bonus },
        { title: 'ສະຖານະ', field: 'description', minWidth: 200, render: row => <u className={row.all_status && 'dis_active'}>{row.description}</u> },
    ]
    const columns_2 = [
        { title: 'No', field: 'id_idx', maxWidth: 80 },
        { title: 'TranID', field: 'seqnumber_', minWidth: 150 },
        { title: 'ReceiptID', field: 'receipt_', minWidth: 150 },
        { title: 'MSISDN', field: 'msisdn_' },
        { title: 'ເວລາຊື້', field: 'date_buy', minWidth: 200 },
        { title: 'ປະເພດ', field: 'srvtype_' },
        { title: 'Chanel', field: 'chanel_' },
        { title: 'UserID', field: 'userId_' },
        { title: 'ມູນຄ່າ', field: 'amount_', minWidth: 100, type: 'numeric', render: row => row.amount_ > 0 ? parseInt(row.amount_).toLocaleString() : row.amount_ },
        { title: 'ສະຖານະ', field: 'errdesc_', render: row => <u className={row.all_status && 'dis_active'}>{row.errdesc_}</u> },
    ]
    const columns_3 = [
        { title: 'No', field: 'id_idx', maxWidth: 50 },
        { title: 'MSISDN', field: 'msisdn_' },
        { title: 'ເວລາຊື້', field: 'date_buy', minWidth: 200 },
        { title: 'UserID', field: 'userId_' },
        { title: 'Network', field: 'network_' },
        { title: 'Header', field: 'header_' },
        { title: 'STS', field: 'sts_', render: row => <u className={row.all_status && 'dis_active'}>{row.sts_}</u> },
        // { title: 'ຂໍ້ຄວາມ', field: 'sms_', minWidth: 600},
    ]
    const columns_4 = [
        { title: 'No', field: 'id_idx', maxWidth: 50 },
        { title: 'ເບີຕົ້ນທາງ', field: 'sendNumber', maxWidth: 120 },
        { title: 'ເບີປາຍທາງ', field: 'receiveNumber', minWidth: 120 },
        { title: 'ເວລາ', field: 'requestDate', maxWidth: 170 },
        { title: 'Chanel', field: 'chanel', maxWidth: 100 },
        { title: 'ມູນຄ່າ', field: 'amount', maxWidth: 100, type: 'numeric', render: row => row.amount > 0 ? parseInt(row.amount).toLocaleString() : row.amount },
        { title: 'ຍອດເງິນປະຈຸບັນ', field: 'currentBalance', maxWidth: 120, type: 'numeric', render: row => row.currentBalance > 0 ? parseInt(row.currentBalance).toLocaleString() : row.currentBalance },
        { title: 'ສະຖານະ', field: 'sms', maxWidth: 200, render: row => row.sms.length < 30 ? row.sms : <Tooltip title={row.sms}><div>{row.sms.substring(0, 30)}...</div></Tooltip> },
    ]

    return (
        <div className="box-accordion">
            {network !== "F" && <>
                <Accordion expanded={expanded === 'panel4'} onClick={() => setOpen({ ...open, fadoa: true })}>
                    <AccordionSummary>
                        <Typography sx={{ width: '100%', flexShrink: 0 }}>
                            <AttachMoney className="n-icon" />
                            <Badge badgeContent={fadao.st >= 10 ? fadao.st + '+' : fadao.st.toString()} color={fadao.st === '' ? 'default' : fadao.st === 'loading' ? 'info' : fadao.st <= 0 ? 'secondary' : 'primary'}>
                                <u className="nav-text">ຢືມ ແລະ ຕັດເງິນ ຟ້າດາວ &nbsp;</u>
                            </Badge>
                        </Typography>
                    </AccordionSummary>
                </Accordion>
            </>}


            <Accordion expanded={expanded === 'panel4'} onClick={() => {
                setOpen({ ...open, m_topup: true })
                Doing({
                    msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                    username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                    detail: 'check topup and m-topup',
                    resualt: 'Operation successed.',
                })
            }}>
                <AccordionSummary>
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                        <AddToPhotos className="n-icon" />
                        <Badge badgeContent={m_topup.st >= 10 ? m_topup.st + '+' : m_topup.st.toString()} color={m_topup.st === '' ? 'default' : m_topup.st === 'loading' ? 'info' : m_topup.st <= 0 ? 'secondary' : 'primary'}>
                            <u className="nav-text">Topup And M-Topup &nbsp;</u>
                        </Badge>
                    </Typography>
                </AccordionSummary>
            </Accordion>

            <Accordion expanded={expanded === 'panel4'} onClick={() => {
                setOpen({ ...open, top_bank: true })
                Doing({
                    msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                    username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                    detail: 'check topup banking',
                    resualt: 'Operation successed.',
                })
            }}>
                <AccordionSummary>
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                        <Countertops className="n-icon" />
                        <Badge badgeContent={top_bank.st >= 10 ? top_bank.st + '+' : top_bank.st.toString()} color={top_bank.st === '' ? 'default' : top_bank.st === 'loading' ? 'info' : top_bank.st <= 0 ? 'secondary' : 'primary'}>
                            <u className="nav-text">Topup Banking &nbsp;</u>
                        </Badge>
                    </Typography>
                </AccordionSummary>
            </Accordion>

            {network !== "F" && <>
                <Accordion expanded={expanded === 'panel4'} onClick={() => {
                    setOpen({ ...open, sms_bank: true })
                    Doing({
                        msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                        username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                        detail: 'check sms banking',
                        resualt: 'Operation successed.',
                    })
                }}>
                    <AccordionSummary>
                        <Typography sx={{ width: '100%', flexShrink: 0 }}>
                            <Sms className="n-icon" />
                            <Badge badgeContent={sms_bank.st >= 10 ? sms_bank.st + '+' : sms_bank.st.toString()} color={sms_bank.st === '' ? 'default' : sms_bank.st === 'loading' ? 'info' : sms_bank.st <= 0 ? 'secondary' : 'primary'}>
                                <u className="nav-text">SMS Banking &nbsp;</u>
                            </Badge>
                        </Typography>
                    </AccordionSummary>
                </Accordion>
            </>}

            <Accordion expanded={expanded === 'panel4'} onClick={() => {
                setOpen({ ...open, payment: true })
                // Doing({
                //     msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                //     username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                //     detail: 'check payment',
                //     resualt: 'Operation successed.',
                // })
            }}>
                <AccordionSummary>
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                        <LocalAtm className="n-icon" />
                        <Badge badgeContent={payment.st >= 10 ? payment.st + '+' : payment.st.toString()} color={payment.st === '' ? 'default' : payment.st === 'loading' ? 'info' : payment.st <= 0 ? 'secondary' : 'primary'}>
                            <u className="nav-text">Payment &nbsp;</u>
                        </Badge>
                    </Typography>
                </AccordionSummary>
            </Accordion>

            <Dialog
                maxWidth="xl"
                fullWidth={true}
                open={open.fadoa}
                onClose={() => setOpen({ ...open, fadoa: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12}>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={10}><div className="center"><h1>ຢືມ ແລະ ຕັດເງິນ ຟ້າດາວ</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setOpen({ ...open, fadoa: false })}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: 20 }}>
                            <BorrowAndDeduct />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>

            <Dialog
                maxWidth="xl"
                fullWidth={true}
                open={open.m_topup}
                onClose={() => setOpen({ ...open, m_topup: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12}>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={10}><div className="center"><h1>Topup And M-Topup</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setOpen({ ...open, m_topup: false })}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item md={2} lg={3} xl={4}></Grid>
                        <Grid item xs={12} md={8} lg={6} xl={4}>
                            <Alert variant="outlined" severity="info">
                                ກໍລະນີທີ່ຕ້ອງການສະແດງຂໍ້ມູນຫຼາຍກ່ວາ 10 ລາຍການ ໃຫ້ຄຼິກໄປທີ່ More Detail ຢູ່ດ້ານລຸ່ມ
                            </Alert>
                        </Grid>
                        <Grid item xs={12}>
                            <MyTable tTitle={"Topup and M-Topup"} tData={m_topup.data} tColumns={columns} />
                        </Grid>
                        <Grid item xs={12} className="more-me">
                            <TopupDialog />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>

            <Dialog
                maxWidth="xl"
                fullWidth={true}
                open={open.top_bank}
                onClose={() => setOpen({ ...open, top_bank: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12}>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={10}><div className="center"><h1>Topup Banking</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setOpen({ ...open, top_bank: false })}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item md={2} lg={3} xl={4}></Grid>
                        <Grid item xs={12} md={8} lg={6} xl={4}>
                            <Alert variant="outlined" severity="info">
                                ກໍລະນີທີ່ຕ້ອງການສະແດງຂໍ້ມູນຫຼາຍກ່ວາ 10 ລາຍການ ໃຫ້ຄຼິກໄປທີ່ More Detail ຢູ່ດ້ານລຸ່ມ
                            </Alert>
                        </Grid>
                        <Grid item xs={12}>
                            <MyTable tTitle={"Topup Banking"} tData={top_bank.data} tColumns={columns_2} />
                        </Grid>
                        <Grid item xs={12} className="more-me">
                            <TopupBankingDialog />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>

            <Dialog
                maxWidth="xl"
                fullWidth={true}
                open={open.sms_bank}
                onClose={() => setOpen({ ...open, sms_bank: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12}>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={10}><div className="center"><h1>Sms Banking</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setOpen({ ...open, sms_bank: false })}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item md={2} lg={3} xl={4}></Grid>
                        <Grid item xs={12} md={8} lg={6} xl={4}>
                            <Alert variant="outlined" severity="info">
                                ກໍລະນີທີ່ຕ້ອງການສະແດງຂໍ້ມູນຫຼາຍກ່ວາ 10 ລາຍການ ໃຫ້ຄຼິກໄປທີ່ More Detail ຢູ່ດ້ານລຸ່ມ
                            </Alert>
                        </Grid>
                        <Grid item xs={12}>
                            <MyTable tTitle={"Sms Banking"} tData={sms_bank.data} tColumns={columns_3} />
                        </Grid>
                        <Grid item xs={12} className="more-me">
                            <SmsBankingDialog />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>

            <Dialog
                maxWidth="xl"
                fullWidth={true}
                open={open.payment}
                onClose={() => setOpen({ ...open, payment: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12}>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={10}><div className="center"><h1>Payment</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setOpen({ ...open, payment: false })}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item md={2} lg={3} xl={4}></Grid>
                        <Grid item xs={12} md={8} lg={6} xl={4}>
                            <Alert variant="outlined" severity="info">
                                ກໍລະນີທີ່ຕ້ອງການສະແດງຂໍ້ມູນຫຼາຍກ່ວາ 10 ລາຍການ ໃຫ້ຄຼິກໄປທີ່ More Detail ຢູ່ດ້ານລຸ່ມ
                            </Alert>
                        </Grid>
                        <Grid item xs={12}>
                            <MyTable tTitle={"Payment"} tData={payment.data} tColumns={columns_4} />
                        </Grid>
                        <Grid item xs={12} className="more-me">
                            <PaymentDialog />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>

        </div>
    )
}
