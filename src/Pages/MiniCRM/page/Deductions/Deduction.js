import React from "react";
import Button from "@material-ui/core/Button";
import { Grid, Card, CardContent } from "@material-ui/core";
import DatePick from "../../../Components/DatePick";
import Search from "@material-ui/icons/Search";
import Crypt from "../../../Components/Crypt";
import moment from "moment";
import { MusicNote } from "@material-ui/icons";
import {Inventory2, Email, MiscellaneousServices, Article, DataSaverOff, SocialDistance, CreditScore} from '@mui/icons-material';
// import LoadingLottie from '../../Components/LoadingLottie'
import RTBDialog from "./RBTDialog";
import cookie from "js-cookie";
import Doing from "../../../Components/Doing";
import { LoadingTable } from "../../../../Loading/TableLoading";
import AxiosElastic from "../../../Components/AxiosElastic";

export default function Deduction() {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [load, setLoad] = React.useState(null);
  const [phone, setPhone] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [totalRBT, setTotalRBT] = React.useState(0);
  const [dataRBT, setDataRBT] = React.useState([]);
  React.useEffect(() => {
    setLoad(true);
    var newPhone = Crypt({
      type: "decrypt",
      value: localStorage.getItem("input-phone"),
    });
    newPhone = newPhone.text;
    setPhone(newPhone);
    AxiosElastic.post(
      "ocs-com-*/_search?size=1000",
      {
        query: {
          bool: {
            must: [
              {
                match: {
                  PRI_IDENTITY: "856" + phone,
                },
              },
              {
                range: {
                  CUST_LOCAL_START_DATE: {
                    gte: moment(new Date()).format("YYYYMMDD") + "000000",
                    lte: moment(new Date()).format("YYYYMMDD") + "235959",
                  },
                },
              },
            ],
          },
        },
      },
      { auth: { username: "elastic", password: "#Ltc1qaz2wsx@es" } }
    )
      .then((res) => {
        setDataRBT(res.data.hits.hits);
        // console.log(res.data.hits.hits);
        var total = res.data.hits.hits
          .map((item) => parseInt(item._source.DEBIT_AMOUNT))
          .reduce((a, b) => a + b, 0);
        setTotalRBT(total);
        if (res.status === 200) {
          if (res.data.length > 0) {
          }
          setTimeout(() => {
            setLoad(false);
          }, 200);
        }
      })
      .catch((err) => {
        setLoad(false);
        console.log(err);
      });
  }, []);

  const CodaPayFilter = () => {
    setLoad(true);
    // var date_start = moment(startDate).format("YYYYMMDD");
    // var date_end = moment(endDate).format("YYYYMMDD");
    AxiosElastic.post(
      "ocs-com-*/_search?size=1000",
      {
        query: {
          bool: {
            must: [
              {
                match: {
                  PRI_IDENTITY: "856" + phone,
                },
              },
              {
                range: {
                  CUST_LOCAL_START_DATE: {
                    gte: moment(startDate).format("YYYYMMDD") + "000000",
                    lte: moment(endDate).format("YYYYMMDD") + "235959",
                  },
                },
              },
            ],
          },
        },
      },
      { auth: { username: "elastic", password: "#Ltc1qaz2wsx@es" } }
    )
      .then((res) => {
        setDataRBT(res.data.hits.hits);
        var total = res.data.hits.hits
          .map((item) => parseInt(item._source.DEBIT_AMOUNT))
          .reduce((a, b) => a + b, 0);
        // console.log(total);
        setTotalRBT(total);
        if (res.status === 200) {
          if (res.data.length > 0) {
          }
          setTimeout(() => {
            setLoad(false);
          }, 200);
        }
      })
      .catch((err) => {
        setLoad(false);
        Doing({
          msisdn: Crypt({
            type: "decrypt",
            value: localStorage.getItem("input-phone"),
          }).text,
          username: Crypt({
            type: "decrypt",
            value: localStorage.getItem("one_info"),
          }).username,
          detail: "check call detail",
          resualt: "error",
        });
      });
  };
  //   const changeSelect = (e) => {
  //     setSelect(e);
  //   };
  function ShowData() {
    return (
      <>
        <Grid container item xs={12}>
          <Grid
            item
            xs={12}
            lg={3}
            onClick={() => setIsOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <Card elevation={0} className="box">
              <CardContent className="content-1">
                <Grid container>
                  <MusicNote className="danger" />
                  &nbsp;&nbsp;ບໍລິການເສີມ RBT
                </Grid>
                <Grid container style={{ marginLeft: 30, color: "green" }}>
                  {totalRBT.toLocaleString()}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Package */}
          <Grid
            item
            xs={12}
            lg={3}
            onClick={() => setIsOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <Card elevation={0} className="box">
              <CardContent className="content-1">
                <Grid container>
                  <Inventory2 className="danger" />
                  &nbsp;&nbsp;ສະໝັກ Package
                </Grid>
                <Grid container style={{ marginLeft: 30, color: "green" }}>
                  {totalRBT.toLocaleString()}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* SMS */}
          <Grid
            item
            xs={12}
            lg={3}
            onClick={() => setIsOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <Card elevation={0} className="box">
              <CardContent className="content-1">
                <Grid container>
                  <Email className="danger" />
                  &nbsp;&nbsp;ຂໍ້ຄວາມສັ້ນ SMS
                </Grid>
                <Grid container style={{ marginLeft: 30, color: "green" }}>
                  {totalRBT.toLocaleString()}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* VAS */}
          <Grid
            item
            xs={12}
            lg={3}
            onClick={() => setIsOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <Card elevation={0} className="box">
              <CardContent className="content-1">
                <Grid container>
                  <MiscellaneousServices className="danger" />
                  &nbsp;&nbsp;ບໍລິການເສີມອື່ນໆ
                </Grid>
                <Grid container style={{ marginLeft: 30, color: "green" }}>
                  {totalRBT.toLocaleString()}
                </Grid>
              </CardContent>
            </Card>
          </Grid>


        </Grid>

        {/* Column 2 */}

        <Grid container item xs={12}>
          <Grid
            item
            xs={12}
            lg={3}
            onClick={() => setIsOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <Card elevation={0} className="box">
              <CardContent className="content-1">
                <Grid container>
                  <Article className="danger" />
                  &nbsp;&nbsp;ລາຍລະອຽດການໂທ
                </Grid>
                <Grid container style={{ marginLeft: 30, color: "green" }}>
                  {totalRBT.toLocaleString()}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid
            item
            xs={12}
            lg={3}
            onClick={() => setIsOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <Card elevation={0} className="box">
              <CardContent className="content-1">
                <Grid container>
                  <CreditScore className="danger" />
                  &nbsp;&nbsp;ການເຕີມເງິນ
                </Grid>
                <Grid container style={{ marginLeft: 30, color: "green" }}>
                  {totalRBT.toLocaleString()}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid
            item
            xs={12}
            lg={3}
            onClick={() => setIsOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <Card elevation={0} className="box">
              <CardContent className="content-1">
                <Grid container>
                  <DataSaverOff className="danger" />
                  &nbsp;&nbsp;ດາຕ້າເງິນສົດ
                </Grid>
                <Grid container style={{ marginLeft: 30, color: "green" }}>
                  {totalRBT.toLocaleString()}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid
            item
            xs={12}
            lg={3}
            onClick={() => setIsOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <Card elevation={0} className="box">
              <CardContent className="content-1">
                <Grid container>
                  <SocialDistance className="danger" />
                  &nbsp;&nbsp;ໂອນເງິນ
                </Grid>
                <Grid container style={{ marginLeft: 30, color: "green" }}>
                  {totalRBT.toLocaleString()}
                </Grid>
              </CardContent>
            </Card>
          </Grid>


        </Grid>


      </>
    );
  }

  return (
    <Grid container style={{ paddingBottom: 30 }}>
      <Grid container item xs={12}>
        <Grid item xs={12} lg={1}></Grid>
        <Grid container item xs={12} lg={10} spacing={2} style={{margin: '0 auto'}}>
          <Grid item xs={4}>
            <DatePick
              title="ວັນທີ່ເລີ່ມຕົ້ນ"
              date={startDate}
              onChange={setStartDate}
            />
          </Grid>
          <Grid item xs={4}>
            <DatePick
              title="ວັນທີ່ສິ້ນສຸດ"
              date={endDate}
              onChange={setEndDate}
            />
          </Grid>
          <Grid item xs={2}>
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
        <Grid item xs={12} style={{ width: 1200 }}>
          {load === true && <LoadingTable />}
          {load === false && <ShowData />}
        </Grid>
      </Grid>
      <RTBDialog isOpen={isOpen} handleClose={()=>setIsOpen(false)} dataRBT = {dataRBT}/>
    </Grid>
  );
}
