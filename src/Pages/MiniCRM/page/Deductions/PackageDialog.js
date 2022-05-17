import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { Grid } from "@material-ui/core";
import Crypt from "../../../Components/Crypt";
import moment from "moment";
import LoadingLottie from "../../../Components/LoadingLottie";
import MyTable from "../../Table/Table";

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PackageDialog({
  isOpen = false,
  handleClose,
  dataPackage,
}) {
  console.log("dataRBT", dataPackage);
  const classes = useStyles();

  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  // const [load, setLoad] = React.useState(null);
  const [phone, setPhone] = React.useState("");
  const [data, setData] = React.useState([]);
  // const [dataResult, setDataRBT] = React.useState([]);

  React.useEffect(() => {
    // console.log("---", dataRBT);
    var num = 0;
    var update = dataPackage.map((row) => {
      var dataMap = row._source;
      // console.log(dataMap.CUST_LOCAL_END_DATE);
      dataMap.id_idx = num + 1;
      dataMap.startDate =
        dataMap.CUST_LOCAL_START_DATE.substr(6, 2) +
        "-" +
        dataMap.CUST_LOCAL_START_DATE.substr(4, 2) +
        "-" +
        dataMap.CUST_LOCAL_START_DATE.substr(3, 4) +
        " " +
        dataMap.CUST_LOCAL_START_DATE.substr(8, 2) +
        ":" +
        dataMap.CUST_LOCAL_START_DATE.substr(10, 2) +
        ":" +
        dataMap.CUST_LOCAL_START_DATE.substr(12, 2);
      dataMap.debitAmount = dataMap.DEBIT_AMOUNT;
      dataMap.msisdn = dataMap.PRI_IDENTITY;
      dataMap.currentAmount = dataMap.TOTAL_CURRENT_AMOUNT;
      dataMap.endDate =
        dataMap.CUST_LOCAL_END_DATE.substr(6, 2) +
        "-" +
        dataMap.CUST_LOCAL_END_DATE.substr(4, 2) +
        "-" +
        dataMap.CUST_LOCAL_END_DATE.substr(3, 4) +
        " " +
        dataMap.CUST_LOCAL_END_DATE.substr(8, 2) +
        ":" +
        dataMap.CUST_LOCAL_END_DATE.substr(10, 2) +
        ":" +
        dataMap.CUST_LOCAL_END_DATE.substr(12, 2);
      num = num + 1;
      return dataMap;
    });
    console.log(update);
    setData(update);

    var newPhone = Crypt({
      type: "decrypt",
      value: localStorage.getItem("input-phone"),
    });
    newPhone = newPhone.text;
    setPhone(newPhone);
  }, [dataPackage]);

  function ShowNull() {
    return (
      <>
        <Grid item xs={12}>
          <h1 className="dialog-center">ກະລຸນາກົດຄົ້ນຫາ</h1>
        </Grid>
      </>
    );
  }


  const columns = [
    { title: "No", field: "id_idx" },
    { title: "ເບີຕົ້ນທາງ", field: "msisdn" },
    {
      title: "DEBIT",
      field: "debitAmount",
      render: (row) =>
        row.debitAmount > 0
          ? parseInt(row.debitAmount).toLocaleString()
          : row.debitAmount,
    },
    { title: "ວັນທີເລີ່ມ", field: "startDate", minWidth: 200 },
    { title: "ວັນທີສິ້ນສຸດ", field: "endDate" },
    {
      title: "ຍອດເງິນປະຈຸບັນ",
      field: "currentAmount",
      render: (row) =>
        row.currentAmount > 0
          ? parseInt(row.currentAmount).toLocaleString()
          : row.currentAmount,
    },
  ];

  function ShowData() {
    return (
      <>
        <MyTable
          tTitle={
            "RBT Detail "
            // [ " +
            // moment(startDate).format("DD-MM-YYYY") +
            // " - " +
            // moment(endDate).format("DD-MM-YYYY") +
            // " ]"
          }
          tData={data}
          tColumns={columns}
        />
      </>
    );
  }

  return (
    <div>
      <Dialog
        fullScreen
        open={isOpen}
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
              Package Detail ( {phone} )
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container>
          <Grid container item xs={12} className="dialog-body">
            <Grid item xs={12} lg={2}></Grid>
            <Grid item xs={12}>
              {/* {load === null && <ShowNull />}
              {load === true && (
                <div style={{ height: 500, textAlign: "center" }}>
                  <LoadingLottie height={300} isStopped={!load} />
                </div>
              )} */}
              {/* {load === false && <ShowData />} */}
              <ShowData />
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
