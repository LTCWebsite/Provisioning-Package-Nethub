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
import { Grid, Select, MenuItem } from '@material-ui/core';
import DatePick from '../../../../../../Components/DatePick'
import Search from '@material-ui/icons/Search';
import moment from 'moment';
import { AxiosReq } from '../../../../../../Components/Axios'
import MyTable from '../../../../../../Components/MyTable'
import { LoadingTable } from '../../../../../../Components/TableLoading'

const useStyles = makeStyles((theme) => ({
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function MServiceTopupDialog() {
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
    const [select, setSelect] = React.useState("REQUEST");

    const dataStatus = [
        {
            name: "ເບີຕົ້ນທາງ", value: "REQUEST",
        },
        {
            name: "ເບີປາຍທາງ", value: "SOURCE"
        },
        {
            name: "ທັງໝົດ", value: "ALL",
        },
    ];
    React.useEffect(() => {
        let newPhone = localStorage.getItem("ONE_PHONE")
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
            status: select,
            startDate: date_start,
            endDate: date_end,
        }
        AxiosReq.post("MServicesTopup", sendData).then(res => {
            if (res.status === 200) {
                var num = 0
                var update = res.data.map(row => {
                    row.id_idx = num + 1
                    row.recodeDate = moment(row.recodeDate).format("DD-MM-YYYY HH:mm:ss")
                    row.all_status = row.resultCode === '200' ? false : true
                    num = num + 1
                    return row
                })
                setData(update)
                setTimeout(() => {
                    setLoad(false)
                }, 500)
                // console.log(update);
            }
        }).catch(err => {
            setLoad(false)
        })
    }





    const columns = [
        { title: 'No', field: 'id_idx', maxWidth: 50 },
        { title: 'ເບີຕົ້ນທາງ', field: 'msisdnRequest' },
        { title: 'ເບີປາຍທາງ', field: 'msisdnSource' },
        { title: 'ຍີ່ຫໍ້ອຸປະກອນ', field: 'deviceModel', minWidth: 180, render: row => row.deviceModel === 'null' ? 'ບໍ່ພົບຍີ່ຫໍ້' : row.deviceModel ? row.deviceModel : '-' },
        { title: 'ເວີຊັນ', field: 'osversion', render: row => row.osversion === 'null' ? 'ບໍ່ພົບເວີຊັນ' : row.osversion ? row.osversion : '-' },
        { title: 'ມູນຄ່າ', field: 'amount', type: 'numeric', render: row => row.amount > 0 ? row.amount.toLocaleString() : row.amount },
        { title: 'ວັນທີເລີ່ມຕັດເງິນ', field: 'recodeDate', minWidth: 200 },
        { title: 'ຄຳອະທິບາຍ', field: 'resultMessage', render: row => <u className={row.all_status && 'dis_active'}>{row.resultMessage}</u> },
    ]
    function ShowData() {
        return (
            <>
                <MyTable tTitle={"M-Service Topup Detail [ " + moment(startDate).format("DD-MM-YYYY") + ' - ' + moment(endDate).format("DD-MM-YYYY") + " ]"} tData={data} tColumns={columns} />
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
                            M-Service Topup Detail ( {phone} )
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid container xs={12}>
                    <Grid container item xs={12} md={12} className="dialog-body">
                        <Grid item xs={2}></Grid>
                        <Grid container item xs={8} spacing={2}>
                            <Grid item xs={3}>
                                <DatePick title="ວັນທີ່ເລີ່ມຕົ້ນ" date={startDate} onChange={setStartDate} />
                            </Grid>
                            <Grid item xs={3} >
                                <DatePick title="ວັນທີ່ສິ້ນສຸດ" date={endDate} onChange={setEndDate} />
                            </Grid>
                            <Grid item xs={3} style={{ marginTop: 32 }}>
                                <Select
                                    fullWidth
                                    defaultValue={dataStatus[0].value}
                                    value={select}
                                    onChange={(e) => { setSelect(e.target.value) }}
                                >
                                    {dataStatus?.map(row =>
                                        <MenuItem
                                            value={row.value}
                                        >
                                            {row.name}
                                        </MenuItem>
                                    ) ?? null}

                                </Select>
                            </Grid>
                            <Grid item xs={3} style={{ paddingBottom: 20 }}>
                                <Button fullWidth variant="contained" className="btn-primary" style={{ marginTop: 27 }} onClick={CodaPayFilter}><Search /></Button>
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
