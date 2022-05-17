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
import DatePick from '../../Components/DatePick'
import Search from '@material-ui/icons/Search';
import Crypt from '../../Components/Crypt';
import moment from 'moment';
import Axios from '../../Components/Axios'
// import LoadingLottie from '../../Components/LoadingLottie'
import MyTable from '../Table/Table'
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


export default function DeductDialog() {
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
        // var sendData = {
        //     msisdn: phone,
        //     startDate: date_start,
        //     endDate: date_end,
        // }

        Axios.post("DeductfadaoAndKalsym?start_date=" + date_start + "&en_date=" + date_end + "&msisdn=" + phone, {}, { headers: { 'Authorization': 'Bearer ' + cookie.get("one_session") } }).then(res => {
            if (res.status === 200) {
                var num = 0
                var update = res.data.map(row => {
                    row.id_idx = num + 1
                    row.date = moment(row.recordDate).format("DD-MM-YYYY HH:mm:ss")
                    num = num + 1
                    return row
                })
                setData(update)
                setTimeout(() => {
                    setLoad(false)
                }, 500)
            }
        }).catch(err => {
            setLoad(false)
        })
    }

    const columns = [
        { title: 'No', field: 'id_idx', maxWidth: 80 },
        { title: 'BorrowID', field: 'borrowId', minWidth: 180 },
        { title: 'MSISDN', field: 'msisdn' },
        { title: 'ເວລາ', field: 'date', minWidth: 200 },
        { title: 'UserID', field: 'userId' },
        { title: 'ປະເພດ', field: 'srvType', minWidth: 150 },
        { title: 'ມູນຄ່າ', field: 'amount', type: 'numeric', render: row => row.amount > 0 ? row.amount.toLocaleString() : row.amount },
        { title: 'ສະຖານະ', field: 'resultDesc' },
    ]
    function ShowData() {
        return (
            <>
                <MyTable tTitle={"Deduct Detail [ " + moment(startDate).format("DD-MM-YYYY") + ' - ' + moment(endDate).format("DD-MM-YYYY") + " ]"} tData={data} tColumns={columns} />
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
                            Deduct Detail ( {phone} )
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
