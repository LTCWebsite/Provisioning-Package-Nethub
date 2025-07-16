import React, { useEffect, useState } from "react";
import MyTable from "../../../../../../Components/MyTable";
import { LoadingTable } from "../../../../../../Components/TableLoading";
import { AxiosReq2, AxiosSubscriber } from "../../../../../../Components/Axios";
import cookie from "js-cookie";
import TableMember from "../Model/TableMember";

function Members() {
  const [stop, setStop] = useState(false);
  const [data, setData] = useState([]);
  const [name, setName] = useState("Detail Members");

  useEffect(() => {
    const phone = localStorage.getItem("ONE_PHONE");

    if (!phone) {
      setStop(true);
      return;
    }

    AxiosSubscriber.post(
      `/SubscriberGame?msisdn=${phone}`,
      {},
      {
        headers: { Authorization: `Bearer ${cookie.get("ONE_TOKEN")}` },
      }
    )
      .then((res) => {
        if (res.status === 200) {
          setData(res?.data);
        }
      })
      .catch((er) => {
        // setTimeout(() => {
        //     setLoading({ ...loading, btn: false })
        //     toast_error({ text: "API Error" })
        // }, 1000)
      });
  }, []);

  const columns = [
    { title: "", field: "", maxWidth: 50 },
    { title: "ເບີໂທ", field: "msisdn", minWidth: 200 },
    { title: "ລະຫັດ", field: "transactionId", minWidth: 200 },
    { title: "ວັນທີ", field: "resultDate", minWidth: 180 },
    {
      title: "ມູນຄ່າ",
      field: "paidAmount",
      type: "numeric",
    },
    { title: "Operator", field: "operator" },
    { title: "ServiceType", field: "serviceType" },
    { title: "ລາຍລະອຽດ", field: "resultDesc" },
  ];

  // function showData() {
  //     return data.length > 0 ? (
  //         <MyTable tTitle={name} tData={data} tColumns={columns} />
  //     ) : (
  //         <div style={{ textAlign: "center", padding: "20px", color: "gray" }}>
  //             No data available.
  //         </div>
  //     );
  // }

  // return (
  //     <>
  //         {!stop ? <LoadingTable /> : showData()}
  //     </>
  // );

  return <TableMember tData={data} />;
}

export default Members;
