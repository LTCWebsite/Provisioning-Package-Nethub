import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Backpack, Close, FactCheck, Inventory } from '@mui/icons-material'
import { Dialog, Grid, Slide, IconButton, Badge, Alert } from '@mui/material'
import Axios from '../../../Pages/Components/Axios';
import Cookies from 'js-cookie';
import Index from './Accordion8/Index';
import GetPhoneNumber from "../../../Pages/Components/GetPhoneNumber";
import BSSAutoPackageDialog from '../../../Pages/MiniCRM/page/BSSAutoPackageDialog';
import MyTable from '../../../Pages/MiniCRM/Table/Table';
import Doing from "../../../Pages/Components/Doing";
import Crypt from "../../../Pages/Components/Crypt";
import moment from 'moment';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Accordion_8() {
    const expanded = false
    const [open, setOpen] = React.useState({ information: false, delete: false, buy: false, ir: false, autopk: false, sp: false })

    // const [bssNetworkType, setBssNetworkType] = React.useState()
    const [sp, setSp] = React.useState({ st: "", data: [] })
    // const [bssAutoPK, setBssAutoPK] = React.useState({ st: "", data: [] })

    React.useEffect(() => {
        var phone = GetPhoneNumber()
        // Axios.get("api/CheckNetworkType?msisdn=" + phone, { headers: { Authorization: "Bearer " + Cookies.get("one_session") } }).then((res) => {
        //     if (res.status === 200) {
        //         var bssNetworkType = res.data.networK_CODE
        //         setBssNetworkType(bssNetworkType)
        //         if (bssNetworkType === "G") {
        //             setBssAutoPK({ st: "loading", data: [] })
        //             Axios.get("BSSAutoPackage?MSISDN=" + phone, { headers: { Authorization: "Bearer " + Cookies.get("one_session") } }).then((res) => {
        //                 if (res.status === 200) {
        //                     var num = 0;
        //                     var update = res.data.map((row) => {
        //                         row.id_idx = num + 1;
        //                         num = num + 1;
        //                         return row;
        //                     })
        //                     setBssAutoPK({ st: num, data: update })
        //                 }
        //             }).catch((err) => {
        //                 setBssAutoPK({ st: "No", data: [] })
        //             })
        //         }
        //     }
        // })

        setSp({ st: "loading", data: [] });
        Axios.get("api/SpecialPackage?msisdn=" + phone, { headers: { Authorization: "Bearer " + Cookies.get("one_session") } }).then((res) => {
            if (res.status === 200) {
                var num = 0;
                var update = res.data.map((row) => {
                    row.id_idx = num + 1;
                    num = num + 1;
                    return row;
                })
                setSp({ st: num, data: update });
            }
        }).catch((err) => {
            setSp({ st: "No", data: [] });
        })

    }, [])

    // const columns_bssAutoPK = [
    //     { title: "No", field: "id_idx", maxWidth: 50 },
    //     { title: "ເບີ", field: "isdn" },
    //     { title: "month", field: "month", minWidth: 200 },
    //     { title: "seR_TYPE", field: "seR_TYPE", minWidth: 50 },
    //     { title: "seR_NAME", field: "seR_NAME" },
    //     { title: "ເວລາເລີ່ມ", field: "stA_DATE" },
    //     { title: "ເວລາສິ້ນສຸດ", field: "enD_DATE" },
    //     { title: "cmS_CTX", field: "cmS_CTX", minWidth: 200 },
    // ];
    const columns_sp = [
        { title: "No", field: "id_idx", maxWidth: 50 },
        { title: "PromotionID", field: "prmtId", maxWidth: 200 },
        { title: "ເບີເລີ່ມຕົ້ນ", field: "start", maxWidth: 150 },
        { title: "ເບີສິ້ນສຸດ", field: "stop", maxWidth: 150 },
        {
            title: "ເວລາເລີ່ມ",
            field: "startTime",
            minWidth: 200,
            render: (row) => moment(row.startTime).format("DD-MM-YYYY HH:mm:ss"),
        },
        {
            title: "ເວລາສິ້ນສຸດ",
            field: "stopTime",
            minWidth: 200,
            render: (row) => moment(row.stopTime).format("DD-MM-YYYY HH:mm:ss"),
        },
        { title: "Province", field: "province" },
    ];

    return (
        <div>

            {/* <Accordion expanded={expanded === 'panel4'} onClick={() => setOpen({ ...open, information: true })}>
                <AccordionSummary>
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                        <Backpack className="n-icon" /><u className="nav-text">ກວດຂໍ້ມູນ Package</u>
                    </Typography>
                </AccordionSummary>
            </Accordion> */}

            <Accordion expanded={expanded === "panel4"} onClick={() => {
                setOpen({ ...open, sp: true })
                Doing({
                    msisdn: Crypt({
                        type: "decrypt",
                        value: localStorage.getItem("input-phone"),
                    }).text,
                    username: Crypt({
                        type: "decrypt",
                        value: localStorage.getItem("one_info"),
                    }).username,
                    detail: "check sepecial package",
                    resualt: "Operation successed.",
                })
            }}>
                <AccordionSummary>
                    <Typography sx={{ width: "100%", flexShrink: 0 }}>
                        <FactCheck className="n-icon" />
                        <Badge badgeContent={sp.st >= 10 ? sp.st + '+' : sp.st.toString()} color={sp.st === '' ? 'default' : sp.st === 'loading' ? 'info' : sp.st <= 0 ? 'secondary' : 'primary'}>
                            <u className="nav-text">Special Package &nbsp;</u>
                        </Badge>
                    </Typography>
                </AccordionSummary>
            </Accordion>

            {/* {bssNetworkType === "G" ? <Accordion expanded={expanded === 'panel4'} onClick={() => {
                setOpen({ ...open, autopk: true })
                Doing({
                    msisdn: Crypt({
                        type: "decrypt",
                        value: localStorage.getItem("input-phone"),
                    }).text,
                    username: Crypt({
                        type: "decrypt",
                        value: localStorage.getItem("one_info"),
                    }).username,
                    detail: "check auto package",
                    resualt: "Operation successed.",
                })
            }}>
                <AccordionSummary>
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                        <Inventory className="n-icon" />
                        <Badge badgeContent={bssAutoPK.st >= 10 ? bssAutoPK.st + '+' : bssAutoPK.st.toString()} color={bssAutoPK.st === '' ? 'default' : bssAutoPK.st === 'loading' ? 'info' : bssAutoPK.st <= 0 ? 'secondary' : 'primary'}>
                            <u className="nav-text">BSS Auto Package &nbsp;</u>
                        </Badge>
                    </Typography>
                </AccordionSummary>
            </Accordion> : null} */}



            <Dialog
                maxWidth="xl"
                fullWidth={true}
                open={open.information}
                onClose={() => setOpen({ ...open, information: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12}>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={10}><div className="center"><h1>Package Information</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setOpen({ ...open, information: false })}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Index />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>

            {/* <Dialog
                maxWidth="xl"
                open={open.autopk}
                onClose={() => setOpen({ ...open, autopk: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}>
                            <div className="center">
                                <h1>BSS Auto Package</h1>
                            </div>
                        </Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => setOpen({ ...open, autopk: false })}
                                >
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item md={2} lg={3} xl={4}></Grid>
                        <Grid item xs={12} md={8} lg={6} xl={4}>
                            <Alert
                                variant="outlined"
                                severity="info"
                                style={{ marginTop: 10 }}
                            >
                                ກໍລະນີທີ່ຕ້ອງການສະແດງຂໍ້ມູນຫຼາຍກ່ວາ 10 ລາຍການ ໃຫ້ຄຼິກໄປທີ່ More
                                Detail ຢູ່ດ້ານລຸ່ມ
                            </Alert>
                        </Grid>

                        <Grid item xs={12}>
                            <MyTable
                                tTitle={"BSS Auto Package"}
                                tData={bssAutoPK.data}
                                tColumns={columns_bssAutoPK}
                            />
                        </Grid>
                        <Grid item xs={12} className="more-me">
                            <BSSAutoPackageDialog />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog> */}

            <Dialog
                maxWidth="lg"
                open={open.sp}
                onClose={() => setOpen({ ...open, sp: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}>
                            <div className="center">
                                <h1>Special Package</h1>
                            </div>
                        </Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => setOpen({ ...open, sp: false })}
                                >
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item md={2} lg={3} xl={4}></Grid>
                        <Grid item xs={12} className="center">
                            <MyTable
                                tTitle={"Special Package"}
                                tData={sp.data}
                                tColumns={columns_sp}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>

        </div>
    )
}
