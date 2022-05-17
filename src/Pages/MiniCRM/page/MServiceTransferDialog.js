import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { Grid, Select, MenuItem } from "@material-ui/core";
import DatePick from "../../Components/DatePick";
import Search from "@material-ui/icons/Search";
import Crypt from "../../Components/Crypt";
import moment from "moment";
import Axios from "../../Components/Axios";
// import LoadingLottie from "../../Components/LoadingLottie";
import MyTable from "../Table/Table";
import cookie from "js-cookie";
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

export default function MServiceTransferDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [load, setLoad] = React.useState(null);
  const [phone, setPhone] = React.useState("");
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
    var newPhone = Crypt({
      type: "decrypt",
      value: localStorage.getItem("input-phone"),
    });
    newPhone = newPhone.text;
    setPhone(newPhone);
  }, []);

  function ShowNull() {
    return (
      <>
        <Grid item xs={12}>
          <h1 className="dialog-center">ກະລຸນາກົດຄົ້ນຫາ</h1>
        </Grid>
      </>
    );
  }

  // const selectMe = () => {
  //   setLoad(true);
  //   var date_start = moment(startDate).format("YYYY-MM-DD");
  //   var date_end = moment(endDate).format("YYYY-MM-DD");
  //   var sendData = {
  //     msisdn: phone,
  //     status: select,
  //     startDate: date_start,
  //     endDate: date_end,
  //   };
  //   Axios.post("MServicesTransfer", sendData, {
  //     headers: { Authorization: "Bearer " + cookie.get("one_session") },
  //   })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         var num = 0;
  //         var update = res.data.map((row) => {
  //           row.id_idx = num + 1;
  //           row.recodeDate = moment(row.recodeDate).format(
  //             "DD-MM-YYYY HH:mm:ss"
  //           );
  //           num = num + 1;
  //           return row;
  //         });
  //         setData(update);
  //         setTimeout(() => {
  //           setLoad(false);
  //         }, 500);
  //       }
  //     })
  //     .catch((err) => {
  //       setLoad(false);
  //     });
  // };

  const [data, setData] = React.useState([]);
  const CodaPayFilter = () => {
    setLoad(true);
    var date_start = moment(startDate).format("YYYY-MM-DD");
    var date_end = moment(endDate).format("YYYY-MM-DD");
    var sendData = {
      msisdn: phone,
      status: select,
      startDate: date_start,
      endDate: date_end,
    };

    Axios.post("MServicesTransfer", sendData, {
      headers: { Authorization: "Bearer " + cookie.get("one_session") },
    })
      .then((res) => {
        if (res.status === 200) {
          var num = 0;
          var update = res.data.map((row) => {
            row.id_idx = num + 1;
            row.recodeDate = moment(row.recodeDate).format(
              "DD-MM-YYYY HH:mm:ss"
            );
            row.all_status = row.resultCode === '200' ? false : true
            num = num + 1;
            return row;
          });
          setData(update);
          setTimeout(() => {
            setLoad(false);
          }, 200);
          // console.log(update);
        }
      })
      .catch((err) => {
        setLoad(false);
      });
  };


  const columns = [
    { title: "No", field: "id_idx", maxWidth: 50 },
    { title: "ເບີຕົ້ນທາງ", field: "msisdnRequest", maxWidth: 130 },
    { title: "ເບີປາຍທາງ", field: "msisdnSource", maxWidth: 130 },
    { title: "ຍີ່ຫໍ້ອຸປະກອນ", field: "deviceModel", maxWidth: 150 },
    { title: "ເວີຊັນ", field: "osversion", maxWidth: 70 },
    {
      title: "ມູນຄ່າ",
      field: "amount",
      type: "numeric",
      maxWidth: 120,
      render: (row) =>
        row.amount > 0 ? row.amount.toLocaleString() : row.amount,
    },
    // { title: 'ປະເພດເຄືອຂ່າຍ', field: 'networkType' },
    // { title: 'ເຄືອຂ່າຍ', field: 'network' },
    // { title: "ລະຫັດອຸປະກອນ", field: "deviceKey" },
    { title: "ວັນທີເລີ່ມຕັດເງິນ", field: "recodeDate", maxWidth: 150 },
    { title: "ຄຳອະທິບາຍ", field: "resultMessage", render: row => <u className={row.all_status && 'dis_active'}>{row.resultMessage}</u> },
  ];
  function ShowData() {
    return (
      <>
        <MyTable
          tTitle={
            "M-Service Transfer Detail [ " +
            moment(startDate).format("DD-MM-YYYY") +
            " - " +
            moment(endDate).format("DD-MM-YYYY") +
            " ]"
          }
          tData={data}
          tColumns={columns}
        />
      </>
    );
  }


  return (
    <div>
      <Button
        variant="outlined"
        className="btn-primary"
        onClick={handleClickOpen}
      >
        More Detail
      </Button>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className="dialog-header">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              M-Service Transfer Detail ( {phone} )
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container xs={12}>
          <Grid container item xs={12} md={12} className="dialog-body">
            <Grid item xs={2}></Grid>
            <Grid container item xs={8} spacing={2}>
              <Grid item xs={3}>
                <DatePick
                  title="ວັນທີ່ເລີ່ມຕົ້ນ"
                  date={startDate}
                  onChange={setStartDate}
                />
              </Grid>
              <Grid item xs={3}>
                <DatePick
                  title="ວັນທີ່ສິ້ນສຸດ"
                  date={endDate}
                  onChange={setEndDate}
                />
              </Grid>
              <Grid item xs={3} style={{ paddingLeft: 30, marginTop: 30 }}>
                <Select
                  fullWidth
                  defaultValue={dataStatus[0].value}
                  value={select}
                  onChange={(e) => {
                    setSelect(e.target.value);
                  }}
                >
                  {dataStatus?.map((row) => (
                    <MenuItem value={row.value}>{row.name}</MenuItem>
                  )) ?? null}
                </Select>
              </Grid>
              <Grid item xs={3} style={{ paddingLeft: 35, paddingBottom: 20 }}>
                <Button
                  fullWidth
                  variant="contained"
                  className="btn-primary"
                  style={{ marginTop: 25 }}
                  onClick={CodaPayFilter}
                >
                  <Search />
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {load === null && <ShowNull />}
              {load === true && (
                <div style={{ textAlign: "center" }}>
                  <LoadingTable md={true} />
                </div>
              )}
              {load === false && <ShowData />}
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
