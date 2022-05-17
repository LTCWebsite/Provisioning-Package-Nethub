import React from "react";
// import LoadingLottie from "../../Components/LoadingLottie";
import MyTable from "../Table/Table";
// import Axios from "../../Components/Axios";
import GetPhoneNumber from "../../Components/GetPhoneNumber";
import moment from "moment";
import { Grid } from "@material-ui/core";
import DebugGameDialog from "./DebugGameDialog";
// import cookie from "js-cookie";
import axios from "axios";
import { LoadingTable } from '../../../Loading/TableLoading'

function DebugGame({ email }) {
  const [stop, setStop] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [name, setName] = React.useState("CodaPay");
  React.useEffect(() => {
    var phone = GetPhoneNumber();
    axios
      .post(
        "http://172.28.26.49:9200/tbl_deduct_log*/_search?filter_path=hits.hits._source",
        {
          query: {
            bool: {
              must: [
                {
                  match: {
                    msisdn: phone,
                  },
                },
                {
                  match: {
                    username: email,
                  },
                },
              ],
            },
          },
          sort: [{ deductDate: { order: "desc" } }],
        },
        {
          auth: {
            username: "elastic",
            password: "#Ltc1qaz2wsx@es",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          var datas = [];
          for (let i = 0; i < res?.data?.hits?.hits?.length; i++) {
            datas.push(res.data.hits.hits[i]._source);
          }
          var num = 0;
          var update = datas.map((row) => {
            row.id_idx = num + 1;
            row.deductDate = moment(row.deductDate).format(
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
        }
      })
      .catch((err) => {
        setStop(true);
      });
  }, [email]);
  const columns = [
    { title: "No", field: "id_idx", maxWidth: 50 },
    { title: "TranID", field: "transactionID" },
    { title: "ເວລາຕັດເງິນ", field: "deductDate", minWidth: 200 },
    { title: "ປະເພດ", field: "cardType", minWidth: 180 },
    { title: "ຊື່ເກມ", field: "gameName",maxWidth:100 },
    {
      title: "ມູນຄ່າ",
      field: "amount",
      type: "numeric",
      render: (row) =>
        row.amount > 0 ? row.amount.toLocaleString() : row.amount,
    },
    {
      title: "ມູນຄ່າກ່ອນຊື້",
      field: "oldBalance",
      type: "numeric",
      render: (row) =>
        row.oldBalance > 0 ? row.oldBalance.toLocaleString() : row.oldBalance,
    },
    {
      title: "ມູນຄ່າຫຼັງຊື້",
      field: "newBalance",
      type: "numeric",
      render: (row) =>
        row.newBalance > 0 ? row.newBalance.toLocaleString() : row.newBalance,
    },
    {
      title: "ສະຖານະ",
      field: "smsStatus",
      render: (row) => (
        <u className={row.all_status && "dis_active"}>{row.smsStatus}</u>
      ),
    },
  ];
  React.useEffect(() => {
    if (email == "product@codapayments.com") {
      setName("CodaPay");
    } else if (email == "ryan.hong@linkit360.com") {
      setName("LinkIT360");
    } else {
      setName("AirPay");
    }
  }, [email]);
  function ShowData() {
    return (
      <>
        <MyTable tTitle={name} tData={data} tColumns={columns} />

        <Grid container>
          <Grid item xs={12} className="more">
            <DebugGameDialog email={email} />
          </Grid>
        </Grid>
      </>
    );
  }
  return (
    <>
      {!stop ? (
        <LoadingTable />
      ) : (
        <ShowData />
      )}
    </>
  );
}

export default DebugGame;
