import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Typography, Badge, Dialog, Grid, IconButton, Alert, Button } from '@mui/material';
import { AccountTree, Call as C, Close, Inventory, PermDataSetting, PriceCheck } from '@mui/icons-material'
import GetPhoneNumber from '../../../Pages/Components/GetPhoneNumber';
import Axios from '../../../Pages/Components/Axios';
import Cookies from 'js-cookie';
import moment from 'moment';
import MyTable from '../../../Pages/MiniCRM/Table/Table';
import Slide from '@mui/material/Slide';

import Call from '../../../Pages/MiniCRM/page/Call';
import Deduction from '../../../Pages/MiniCRM/page/Deductions/Deduction';
import Doing from '../../../Pages/Components/Doing';
import Crypt from '../../../Pages/Components/Crypt';
import axios from 'axios';
import PanelTable from '../Components/PanelTable';
import BSSAutoPackageDialog from '../../../Pages/MiniCRM/page/BSSAutoPackageDialog';
import Accordion_8 from './Accordion_8';
import CircularProgress from '@material-ui/core/CircularProgress'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Accordion_1() {
    const expanded = false
    const [pk, setPackage] = React.useState({ st: '', data: [] })
    const [dataPk, setDataPk] = React.useState({ st: '', data: [] })
    const [open, setOpen] = React.useState({ pk: false, call: false, data: false, autopk: false })
    const [isShowConfirm, setIsShowConfirm] = React.useState(false)
    const [bssAutoPK, setBssAutoPK] = React.useState({ st: "", data: [] })
    const [bssNetworkType, setBssNetworkType] = React.useState()
    const [bk, setBk] = React.useState({ st: '', data: [] })
    const [pkCode, setPkCode] = React.useState('')
    const [isShowSuccess, setIsShowSuccess] = React.useState(false)
    const [bkData, setBkData] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(false)

    var sortBy = (function () {
        var toString = Object.prototype.toString,
            // default parser function
            parse = function (x) { return x; },
            // gets the item to be sorted
            getItem = function (x) {
                var isObject = x != null && typeof x === "object";
                var isProp = isObject && this.prop in x;
                return this.parser(isProp ? x[this.prop] : x);
            };

        /**
         * Sorts an array of elements.
         *
         * @param {Array} array: the collection to sort
         * @param {Object} cfg: the configuration options
         * @property {String}   cfg.prop: property name (if it is an Array of objects)
         * @property {Boolean}  cfg.desc: determines whether the sort is descending
         * @property {Function} cfg.parser: function to parse the items to expected type
         * @return {Array}
         */
        return function sortby(array, cfg) {
            if (!(array instanceof Array && array.length)) return [];
            if (toString.call(cfg) !== "[object Object]") cfg = {};
            if (typeof cfg.parser !== "function") cfg.parser = parse;
            cfg.desc = !!cfg.desc ? -1 : 1;
            return array.sort(function (a, b) {
                a = getItem.call(cfg, a);
                b = getItem.call(cfg, b);
                return cfg.desc * (a < b ? -1 : +(a > b));
            });
        };

    }());

    const _onBuyPackage = () => {
        setIsLoading(!isLoading)
        const datas = {
            "msisdn": GetPhoneNumber(),
            "packageCode": pkCode + "",
            "networkType": bssNetworkType
        }
        Axios.post("http://10.30.6.148:28899/Package", datas).then(res => {
            if (res.status === 200) {
                setBkData(res.data)
                setIsShowSuccess(!isShowSuccess)
                setIsShowConfirm(!isShowConfirm)
                setIsLoading(!isLoading)
            }
        }).catch(err => {
            console.log({ err })
        })
    }

    React.useEffect(() => {
        var phone = GetPhoneNumber()
        Axios.get("api/CheckNetworkType?msisdn=" + phone, { headers: { Authorization: "Bearer " + Cookies.get("one_session") } }).then((res) => {
            if (res.status === 200) {
                var bssNetworkType = res.data.networK_CODE
                setBssNetworkType(bssNetworkType)
                if (bssNetworkType === "G") {
                    setBssAutoPK({ st: "loading", data: [] })
                    Axios.get("BSSAutoPackage?MSISDN=" + phone, { headers: { Authorization: "Bearer " + Cookies.get("one_session") } }).then((res) => {
                        if (res.status === 200) {
                            var num = 0;
                            var update = res.data.map((row) => {
                                row.id_idx = num + 1;
                                num = num + 1;
                                return row;
                            })
                            setBssAutoPK({ st: num, data: update })
                        }
                    }).catch((err) => {
                        setBssAutoPK({ st: "No", data: [] })
                    })
                }
            }
        })
        setPackage({ st: 'loading', data: [] })
        setDataPk({ st: 'loading', data: [] })
        Axios.get("QueryHistoryPackage?msisdn=" + phone, { headers: { 'Authorization': 'Bearer ' + Cookies.get("one_session") } }).then(res => {
            if (res.status === 200) {
                var update = res.data.map(row => {
                    var initial = row.recordDate.split(/\//)
                    var n = [initial[1], initial[0], initial[2]].join('/')
                    row.date = n
                    return row
                })
                var newData = sortBy(update, { prop: "date", desc: true })
                var num = 0
                var newUpdate = newData.map(row => {
                    row.id_idx = num + 1
                    row.date = moment(row.date).format("DD-MM-YYYY HH:mm:ss")
                    row.all_status = row.result_desc === 'Operation successed.' ? false : true
                    num = num + 1
                    return row
                })
                setPackage({ st: num, data: newUpdate })
                // console.log(newUpdate)
            }
        }).catch(err => {
            setPackage({ st: '0', data: [] })
        })

        // Axios.get("QueryPackage?msisdn=" + phone, { headers: { 'Authorization': 'Bearer ' + Cookies.get("one_session") } }).then(res => {
        //     if (res.status === 200) {
        //         var num = 0
        //         var update = res.data.map(row => {
        //             row.id_idx = num + 1
        //             row.date_expire = moment(row.expiryTime).format("DD-MM-YYYY HH:mm:ss")
        //             row.date_start = moment(row.startTime).format("DD-MM-YYYY HH:mm:ss")
        //             num = num + 1
        //             return row
        //         })
        //         setDataPk({ st: num, data: update })
        //     }
        // }).catch(err => {
        //     setDataPk({ st: '0', data: [] })
        // })


        axios.get("http://172.28.14.49:3200/query_package/" + phone).then(res => {
            if (res.status === 200 && res.data.resultCode === "20000") {
                let num = 0
                let update = res.data.amfCounterPack.map(row => {
                    row.id_idx = num + 1
                    row.date_buy = String(row.activationDate).substring(6, 8) + '-' + String(row.activationDate).substring(4, 6) + '-' + String(row.activationDate).substring(0, 4) + ' ' + String(row.activationDate).substring(8, 10) + ':' + String(row.activationDate).substring(10, 12) + ':' + String(row.activationDate).substring(12, 14)
                    row.date_stop = String(row.refillStopTime).substring(6, 8) + '-' + String(row.refillStopTime).substring(4, 6) + '-' + String(row.refillStopTime).substring(0, 4) + ' ' + String(row.refillStopTime).substring(8, 10) + ':' + String(row.refillStopTime).substring(10, 12) + ':' + String(row.refillStopTime).substring(12, 14)
                    row.date_expire = String(row.expiryTime).substring(6, 8) + '-' + String(row.expiryTime).substring(4, 6) + '-' + String(row.expiryTime).substring(0, 4) + ' ' + String(row.expiryTime).substring(8, 10) + ':' + String(row.expiryTime).substring(10, 12) + ':' + String(row.expiryTime).substring(12, 14)
                    num = num + 1
                    return row
                })
                setDataPk({ st: res.data.amfCounterPack.length, data: update })
                // console.log(res.data)
            }
        }).catch(err => {
            setDataPk({ st: '0', data: [] })
        })

    }, [])

    React.useEffect(() => {
        setBk({ st: 'loading', data: [] })
        Axios.get("http://10.30.6.148:28899/Package?networkType=" + bssNetworkType).then(res => {
            if (res.status === 200) {

                // console.log(res.data.listPackage)
                var num = 0
                var newUpdate = res.data.listPackage.map(row => {
                    row.id_idx = num + 1
                    num = num + 1
                    row.action =
                        <Button variant="contained" color="error" className='btn-primary' fullWidth style={{ height: 39, marginTop: 5 }} onClick={() => {
                            setPkCode(row.pK_CODE)
                            setIsShowConfirm(!isShowConfirm)
                        }}>
                            <a>ຊື້ແພັກເກັດ</a>
                        </Button>
                    return row
                })
                setBk({ st: num, data: newUpdate })
                // console.log(newUpdate)
            }
        }).catch(err => {
            setPackage({ st: '0', data: [] })
        })
    }, [bssNetworkType])

    const columns = [
        { title: 'No', field: 'id_idx', maxWidth: 50 },
        { title: 'ເວລາຊື້', field: 'date', minWidth: 180 },
        { title: 'MSISDN', field: 'msisdn', maxWidth: 140 },
        { title: 'Type', field: 'srvtype', maxWidth: 100 },
        { title: 'Chanel', field: 'chanel' },
        { title: 'Charging', field: 'data_charging' },
        { title: 'PKCode', field: 'pkcode' },
        { title: 'PKType', field: 'pktype' },
        { title: 'UserID', field: 'user_id' },
        { title: 'ມູນຄ່າ', field: 'charge_amt', type: 'numeric', render: row => row.charge_amt > 0 ? parseInt(row.charge_amt).toLocaleString() : row.charge_amt },
        { title: 'ສະຖານະ', field: 'result_desc', minWidth: 200, render: row => <u className={row.all_status && 'dis_active'}>{row.result_desc}</u> },
    ]
    const columnsPk = [
        { title: 'No', field: 'id_idx', maxWidth: 50, sorting: false },
        { title: 'productOffer', field: 'productOffer', minWidth: 200, sorting: false },
        { title: 'ActivationDate', field: 'date_buy', minWidth: 200 },
        { title: 'RefillStopTime', field: 'date_stop', minWidth: 200 },
        { title: 'ExpiryTime', field: 'date_expire', minWidth: 200 },
    ]

    const columnsBk = [
        { title: 'No', field: 'id_idx', maxWidth: 50, sorting: false },
        { title: 'ລະຫັດແພັກເກັດ', field: 'pK_CODE', minWidth: 200, sorting: false },
        { title: 'ຊື່ແພັກເກັດ', field: 'srV_NAME', minWidth: 200 },
        { title: 'ມື້', field: 'days', minWidth: 200 },
        { title: 'ຈຳນວນເງີນ', field: 'pK_CHG', minWidth: 200 },
        { title: 'ຈັດການ', field: 'action', minWidth: 200 },
    ]
    const columns_bssAutoPK = [
        { title: "No", field: "id_idx", maxWidth: 50 },
        { title: "ເບີ", field: "isdn" },
        { title: "month", field: "month", minWidth: 200 },
        { title: "seR_TYPE", field: "seR_TYPE", minWidth: 50 },
        { title: "seR_NAME", field: "seR_NAME" },
        { title: "ເວລາເລີ່ມ", field: "stA_DATE" },
        { title: "ເວລາສິ້ນສຸດ", field: "enD_DATE" },
        { title: "cmS_CTX", field: "cmS_CTX", minWidth: 200 },
    ]

    return (
        <div className="box-accordion">

            <Accordion expanded={expanded === 'panel1'} onClick={() => {
                setOpen({ ...open, data: true })
                Doing({
                    msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                    username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                    detail: 'check query package',
                    resualt: 'Operation successed.',
                })
            }}>
                <AccordionSummary>
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                        <PermDataSetting className="n-icon" />
                        <Badge badgeContent={dataPk.st >= 10 ? dataPk.st + '+' : dataPk.st.toString()} color={dataPk.st === '' ? 'default' : dataPk.st === 'loading' ? 'info' : dataPk.st <= 0 ? 'secondary' : 'primary'}>
                            <u className="nav-text">ດາຕ້າແພັກເກັດ &nbsp; </u>
                        </Badge>
                    </Typography>
                </AccordionSummary>
            </Accordion>

            <Accordion expanded={expanded === 'panel1'} onClick={() => {
                setOpen({ ...open, pk: true })
                Doing({
                    msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                    username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                    detail: 'check package history',
                    resualt: 'Operation successed.',
                })
            }}>
                <AccordionSummary>
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                        <AccountTree className="n-icon" />
                        <Badge badgeContent={pk.st >= 10 ? pk.st + '+' : pk.st.toString()} color={pk.st === '' ? 'default' : pk.st === 'loading' ? 'info' : pk.st <= 0 ? 'secondary' : 'primary'}>
                            <u className="nav-text">ປະຫວັດການຊື້ແພັກເກັດ &nbsp;</u>
                        </Badge>
                    </Typography>
                </AccordionSummary>
            </Accordion>

            {/*
            

            SPECIAL PACKAGE


            */}
            <Accordion>
                <Accordion_8 />
            </Accordion>


            {
                ["G", "H", "M"].includes(bssNetworkType)
                    ? <Accordion expanded={expanded === 'panel1'} onClick={() => {
                        setOpen({ ...open, bk: true })
                        Doing({
                            msisdn: Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") }).text,
                            username: Crypt({ type: "decrypt", value: localStorage.getItem("one_info") }).username,
                            detail: 'check package history',
                            resualt: 'Operation successed.',
                        })
                    }}>
                        <AccordionSummary>
                            <Typography sx={{ width: '100%', flexShrink: 0 }}>
                                <AccountTree className="n-icon" />
                                {/* <Badge badgeContent={bk.st >= 10 ? bk.st + '+' : pk.st.toString()} color={bk.st === '' ? 'default' : bk.st === 'loading' ? 'info' : bk.st <= 0 ? 'secondary' : 'primary'}> */}
                                <u className="nav-text">ຊື້ແພັກເກັດ &nbsp;</u>
                                {/* </Badge> */}
                            </Typography>
                        </AccordionSummary>
                    </Accordion> : null}

            {bssNetworkType === "G" ? <Accordion expanded={expanded === 'panel4'} onClick={() => {
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
            </Accordion> : null}

            <Accordion expanded={expanded === 'panel1'} onClick={() => setOpen({ ...open, call: true })}>
                <AccordionSummary>
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                        <C className="n-icon" />
                        <u className="nav-text">ປະຫວັດການໂທ &nbsp;</u>
                    </Typography>
                </AccordionSummary>
            </Accordion>

            {/* <Accordion expanded={expanded === 'panel1'} onClick={() => setOpen({ ...open, deduct: true })}>
                <AccordionSummary>
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                    <PriceCheck className="n-icon" />
                        <u className="nav-text">ປະຫວັດການຕັດເງິນ&nbsp;</u>
                    </Typography>
                </AccordionSummary>
            </Accordion> */}

            <Dialog
                maxWidth="xl"
                open={open.pk}
                onClose={() => setOpen({ ...open, pk: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}><div className="center"><h1>ປະຫວັດການຊື້ແພັກເກັດ</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setOpen({ ...open, pk: false })}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <MyTable tTitle={"Package History"} tData={pk.data} tColumns={columns} />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>

            <Dialog
                maxWidth="xl"
                open={open.bk}
                onClose={() => setOpen({ ...open, bk: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}><div className="center"><h1>ຊື້ແພັກເກັດ</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setOpen({ ...open, bk: false })}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <MyTable tTitle={"Buy Package"} tData={bk.data} tColumns={columnsBk} />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
            <Dialog
                maxWidth="xl"
                open={isShowConfirm}
                onClose={() => setIsShowConfirm(!isShowConfirm)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8}><div className="center"><h1>ຢືນຢັນການຊື້ແພັກເກັດ</h1></div></Grid>
                        <Grid item xs={2}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setIsShowConfirm(!isShowConfirm)}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={6} >
                            <div className="center"><Button variant="contained" color="primary" className='btn-defualt' fullWidth style={{ height: 39, marginTop: 5 }} aria-label="delete" onClick={() => setIsShowConfirm(!isShowConfirm)}>
                                <a>ຍົກເລີກ</a>
                            </Button></div>

                        </Grid>
                        <Grid item xs={6}>
                            <div className="center">
                                {<Button disabled={isLoading} variant="contained" color="primary" className='btn-success' fullWidth style={{ height: 39, marginTop: 5 }} aria-label="delete" onClick={_onBuyPackage}>
                                    {isLoading ? <>ກຳລັງກວດສອບ &nbsp;&nbsp;<CircularProgress /></> : <>ຕົກລົງ</>}
                                </Button>}
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
            <Dialog
                maxWidth="xl"
                open={isShowSuccess}
                onClose={() => setIsShowSuccess(!isShowSuccess)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}><div className="center"><h1>{bkData.resultDesc}</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setIsShowSuccess(!isShowSuccess)}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        {/* <Grid item xs={6} >
                        <div className="center"><Button variant="contained" color="primary" fullWidth style={{ height: 39, marginTop: 5 }} aria-label="delete" onClick={() => setIsShowConfirm(!isShowConfirm)}>
                        <a>ຍົກເລີກ</a>
                                </Button></div>
                        
                        </Grid>
                        <Grid item xs={6}>
                        <div className="center"><Button variant="contained" color="primary" fullWidth style={{ height: 39, marginTop: 5 }} aria-label="delete" onClick={_onBuyPackage}>
                        <a>ຕົກລົງ</a>
                                </Button></div>
                        </Grid> */}
                    </Grid>
                </Grid>
            </Dialog>

            <Dialog
                maxWidth="lg"
                open={open.call}
                onClose={() => setOpen({ ...open, call: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}><div className="center"><h1>ປະຫວັດການໂທ</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setOpen({ ...open, call: false })}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Call />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>


            <Dialog
                maxWidth="lg"
                open={open.deduct}
                onClose={() => setOpen({ ...open, deduct: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}><div className="center"><h1>ປະຫວັດການຕັດເງິນ</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setOpen({ ...open, deduct: false })}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Deduction />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>


            <Dialog
                maxWidth="xl"
                open={open.data}
                onClose={() => setOpen({ ...open, data: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
            >
                <Grid container>
                    <Grid item container xs={12}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}><div className="center"><h1>ດາຕ້າແພັກເກັດ</h1></div></Grid>
                        <Grid item xs={1}>
                            <div className="right">
                                <IconButton aria-label="delete" onClick={() => setOpen({ ...open, data: false })}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <PanelTable Title={"ດາຕ້າແພັກເກັດ"} Data={dataPk.data} Columns={columnsPk} />
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>

            <Dialog
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
            </Dialog>

        </div>
    )
}
