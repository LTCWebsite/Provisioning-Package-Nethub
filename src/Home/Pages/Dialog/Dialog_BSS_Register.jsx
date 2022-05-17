import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Grid } from '@material-ui/core';
import DatePick from '../../../Pages/Components/DatePick'
import Search from '@material-ui/icons/Search';
import Crypt from '../../../Pages/Components/Crypt';
import moment from 'moment';
import Axios from '../../../Pages/Components/Axios'
import MyTable from '../../../Pages/MiniCRM/Table/Table'
import cookie from 'js-cookie'
import { LoadingTable } from '../../../Loading/TableLoading'

const useStyles = makeStyles((theme) => ({
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function Dialog_BSS_Register() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }


    const [startDate, setStartDate] = React.useState(new Date())
    const [endDate, setEndDate] = React.useState(new Date())
    const [load, setLoad] = React.useState(null)
    const [phone, setPhone] = React.useState('')

    React.useEffect(() => {
        var newPhone = Crypt({ type: "decrypt", value: localStorage.getItem("input-phone") })
        newPhone = newPhone.text
        setPhone(newPhone)
    }, [])

    function ShowNull() {
        return (
            <>
                <Grid item xs={12}>
                    <h1 className="dialog-center">ກະລຸນາກົດຄົ້ນຫາ</h1>
                </Grid>
            </>
        )
    }

    const [data, setData] = React.useState([])
    const CodaPayFilter = () => {
        setLoad(true)
        var date_start = moment(startDate).format("YYYY-MM-DD")
        var date_end = moment(endDate).format("YYYY-MM-DD")
        var sendData = {
            msisdn: phone,
            startDate: date_start,
            endDate: date_end,
        }
        Axios.post("BSSRegisterService", sendData, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
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
                setData(update)
                setTimeout(() => {
                    setLoad(false)
                }, 200)
            }
        }).catch(err => {
            setLoad(false)
        })
    }

    const columns = [
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

    function ShowData() {
        return (
            <>
                <MyTable tTitle={"Subscriber Event History Detail [ " + moment(startDate).format("DD-MM-YYYY") + ' - ' + moment(endDate).format("DD-MM-YYYY") + " ]"} tData={data} tColumns={columns} />
            </>
        )
    }

    return (
        <div>
            <Button variant="outlined" className="btn-primary" onClick={handleClickOpen}>
                More Detail
            </Button>

            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className="dialog-header">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Subscriber Event History Detail ( {phone} )
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid container>
                    <Grid container item xs={12} className="dialog-body">
                        <Grid item xs={12} lg={2}></Grid>
                        <Grid container item xs={12} lg={8} spacing={2}>
                            <Grid item xs={5}>
                                <DatePick title="ວັນທີ່ເລີ່ມຕົ້ນ" date={startDate} onChange={setStartDate} />
                            </Grid>
                            <Grid item xs={5}>
                                <DatePick title="ວັນທີ່ສິ້ນສຸດ" date={endDate} onChange={setEndDate} />
                            </Grid>
                            <Grid item xs={2}>
                                <Button fullWidth variant="contained" className="btn-primary" style={{ marginTop: 25 }} onClick={CodaPayFilter}><Search /></Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>

                            {load === null && <ShowNull />}
                            {load === true && <LoadingTable md={true} />}
                            {load === false && <ShowData />}

                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    );
}
