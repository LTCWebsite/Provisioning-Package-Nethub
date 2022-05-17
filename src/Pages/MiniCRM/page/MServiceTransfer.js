import React from "react";
// import LoadingLottie from "../../Components/LoadingLottie";
import MyTable from "../Table/Table";
import Axios from "../../Components/Axios";
import GetPhoneNumber from "../../Components/GetPhoneNumber";
import moment from "moment";
import { Grid, MenuItem, Select, Button } from "@material-ui/core";
import MServiceTransferDialog from "./MServiceTransferDialog";
import cookie from "js-cookie";
import { Search } from "@material-ui/icons";
import { LoadingTable } from '../../../Loading/TableLoading'

function MServiceTransfer() {
  const [stop, setStop] = React.useState(false);
  const [data, setData] = React.useState([]);
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

  const selectMe = () => {
    setStop(false);
    var phone = GetPhoneNumber();
    Axios.get("MServicesTransfer?msisdn=" + phone + "&status=" + select, {
      headers: { Authorization: "Bearer " + cookie.get("one_session") },
    })
      .then((res) => {
        console.log(res?.data);
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
            setStop(true);
          }, 200);
          // console.log(update)
        }
      })
      .catch((err) => {
        setStop(true);
      });
  };
  React.useEffect(() => {
    var phone = GetPhoneNumber();
    Axios.get("MServicesTransfer?msisdn=" + phone + "&status=" + select, {
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
            num = num + 1;
            return row;
          });
          setData(update);
          setTimeout(() => {
            setStop(true);
          }, 200);
          // console.log(update)
        }
      })
      .catch((err) => {
        setStop(true);
      });
  }, []);
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
          tTitle={"M-Service Transfer"}
          tData={data}
          tColumns={columns}
        />

        <Grid container>
          <Grid item xs={12} className="more">
            <MServiceTransferDialog />
          </Grid>
        </Grid>
      </>
    );
  }
  return (
    <>
      <Grid container item xs={12} style={{ marginTop: 30, marginBottom: 10 }}>
        <Grid item lg={3}></Grid>
        <Grid container item xs={12} lg={6} spacing={2}>
          <Grid item xs={8}>
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
          <Grid item xs={4}>
            <Button fullWidth variant="contained" className="btn-primary" onClick={selectMe}><Search /></Button>
          </Grid>
        </Grid>
      </Grid>
      {!stop ? (
        <LoadingTable md={true} />
      ) : (
        <ShowData />
      )}
    </>
  );
}

export default MServiceTransfer;
