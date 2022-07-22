import React from "react";
import MyTable from "../../../../../../Components/MyTable";
import { AxiosReq } from "../../../../../../Components/Axios";
import moment from "moment";
import { Grid, MenuItem, Select, Button } from "@material-ui/core";
import MServiceTopupDialog from "./MServiceTopupDialog";
import { Search } from "@material-ui/icons";
import { LoadingTable } from '../../../../../../Components/TableLoading'

function MServiceTopup({ query }) {
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
    setStop(false)
    var phone = localStorage.getItem("ONE_PHONE")
    AxiosReq.get("MServicesTopup?msisdn=" + phone + "&status=" + select).then((res) => {
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
        setData(update)
        setTimeout(() => {
          setStop(true)
        }, 100)
        // console.log(update)
      }
    }).catch((err) => {
      setStop(true)
    });
  };

  React.useEffect(() => {
    setData(query)
  }, []);

  const columns = [
    { title: "No", field: "id_idx", maxWidth: 50 },
    { title: "ເບີຕົ້ນທາງ", field: "msisdnRequest" },
    { title: "ເບີປາຍທາງ", field: "msisdnSource" },
    {
      title: "ຍີ່ຫໍ້ອຸປະກອນ",
      field: "deviceModel",
      minWidth: 180,
      render: (row) =>
        row.deviceModel === "null"
          ? "ບໍ່ພົບຍີ່ຫໍ້"
          : row.deviceModel
            ? row.deviceModel
            : "-",
    },
    {
      title: "ເວີຊັນ",
      field: "osversion",
      render: (row) =>
        row.osversion === "null"
          ? "ບໍ່ພົບເວີຊັນ"
          : row.osversion
            ? row.osversion
            : "-",
    },
    {
      title: "ມູນຄ່າ",
      field: "amount",
      type: "numeric",
      render: (row) =>
        row.amount > 0 ? row.amount.toLocaleString() : row.amount,
    },
    { title: "ວັນທີເລີ່ມຕັດເງິນ", field: "recodeDate", minWidth: 200 },
    {
      title: "ຄຳອະທິບາຍ",
      field: "resultMessage", render: row => <u className={row.all_status && 'dis_active'}>{row.resultMessage}</u>
    },
  ];
  function ShowData() {
    return (
      <>
        <MyTable tTitle={"M-Service Topup"} tData={data} tColumns={columns} />

        <Grid container>
          <Grid item xs={12} className="more">
            <MServiceTopupDialog />
          </Grid>
        </Grid>
      </>
    );
  }
  return (
    <>
      <Grid container item xs={12} style={{ marginTop: 30, paddingBottom: 10 }}>
        <Grid item lg={3}></Grid>
        <Grid container item lg={6} xs={12} spacing={2}>
          <Grid item xs={8}>
            <Select
              fullWidth
              defaultValue={dataStatus[0].value}
              value={select}
              onChange={(e) => { setSelect(e.target.value) }}
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

export default MServiceTopup;